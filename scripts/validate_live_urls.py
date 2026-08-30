#!/usr/bin/env python3
"""Validate live Snooze URLs for HTTP status, internal links and JSON-LD."""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from typing import Any


DEFAULT_URL_FILE = Path(__file__).with_name("live-urls-phase5.txt")
DEFAULT_SITEMAP_URL = "https://www.joinsnooze.com/sitemap.xml"
TIMEOUT_SECONDS = 20
RETRIES = 2
DEFAULT_LOGIN_GATED_PREFIXES = (
    "/offers/",
    "/products/communities/",
    "/login",
)
DESKTOP_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/125.0.0.0 Safari/537.36"
)
FORMER_REGISTERED_NURSE_RE = re.compile(
    r"(?<!\bformer\s)registered\s+nurse", re.IGNORECASE
)


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=False)
        self.links: list[str] = []
        self.jsonld_blocks: list[str] = []
        self._in_jsonld = False
        self._script_chunks: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = {name.lower(): value for name, value in attrs}
        if tag.lower() == "a":
            href = attr_map.get("href")
            if href:
                self.links.append(href)
        if tag.lower() == "script":
            script_type = attr_map.get("type") or ""
            if script_type.lower().split(";")[0].strip() == "application/ld+json":
                self._in_jsonld = True
                self._script_chunks = []

    def handle_data(self, data: str) -> None:
        if self._in_jsonld:
            self._script_chunks.append(data)

    def handle_entityref(self, name: str) -> None:
        if self._in_jsonld:
            self._script_chunks.append(f"&{name};")

    def handle_charref(self, name: str) -> None:
        if self._in_jsonld:
            self._script_chunks.append(f"&#{name};")

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "script" and self._in_jsonld:
            self.jsonld_blocks.append("".join(self._script_chunks).strip())
            self._in_jsonld = False
            self._script_chunks = []


class Fetcher:
    def __init__(
        self,
        timeout: int = TIMEOUT_SECONDS,
        retries: int = RETRIES,
        rate_limit: bool = True,
        fixtures: dict[str, tuple[int, str, str]] | None = None,
    ) -> None:
        self.timeout = timeout
        self.retries = retries
        self.rate_limit = rate_limit
        self.fixtures = fixtures or {}
        self.cache: dict[tuple[str, str], dict[str, Any]] = {}
        self._last_request_at = 0.0

    def get(self, url: str) -> dict[str, Any]:
        return self._fetch("GET", url)

    def head_or_get(self, url: str) -> dict[str, Any]:
        result = self._fetch("HEAD", url)
        # Kajabi can return 404 to HEAD for a route that serves 200 to GET.
        # A failing HEAD is therefore not authoritative for link validity.
        if result["error"] or result["status"] >= 400:
            return self._fetch("GET", url)
        return result

    def _fetch(self, method: str, url: str) -> dict[str, Any]:
        key = (method, url)
        if key in self.cache:
            return self.cache[key]
        if self.fixtures:
            result = self._fetch_fixture(method, url)
            self.cache[key] = result
            return result

        result: dict[str, Any] = {
            "url": url,
            "final_url": url,
            "status": 0,
            "body": "",
            "error": "",
        }
        for attempt in range(self.retries + 1):
            self._wait_for_rate_limit()
            request = urllib.request.Request(url, method=method)
            request.add_header("User-Agent", DESKTOP_UA)
            try:
                with urllib.request.urlopen(request, timeout=self.timeout) as response:
                    status = getattr(response, "status", response.getcode())
                    body = ""
                    if method == "GET":
                        body_bytes = response.read()
                        charset = response.headers.get_content_charset() or "utf-8"
                        body = body_bytes.decode(charset, errors="replace")
                    result = {
                        "url": url,
                        "final_url": response.geturl(),
                        "status": int(status),
                        "body": body,
                        "error": "",
                    }
                    break
            except urllib.error.HTTPError as exc:
                body = ""
                if method == "GET":
                    try:
                        body = exc.read().decode("utf-8", errors="replace")
                    except Exception:
                        body = ""
                result = {
                    "url": url,
                    "final_url": exc.geturl() or url,
                    "status": int(exc.code),
                    "body": body,
                    "error": f"HTTP {exc.code}",
                }
                break
            except urllib.error.URLError as exc:
                result["error"] = str(exc.reason)
            except TimeoutError:
                result["error"] = "request timed out"
            if attempt < self.retries:
                time.sleep(1)
        self.cache[key] = result
        return result

    def _wait_for_rate_limit(self) -> None:
        if not self.rate_limit:
            return
        elapsed = time.monotonic() - self._last_request_at
        if self._last_request_at and elapsed < 1:
            time.sleep(1 - elapsed)
        self._last_request_at = time.monotonic()

    def _fetch_fixture(self, method: str, url: str) -> dict[str, Any]:
        normalized = strip_fragment(url)
        if normalized not in self.fixtures:
            return {
                "url": url,
                "final_url": url,
                "status": 404,
                "body": "",
                "error": "fixture not found",
            }
        status, final_url, body = self.fixtures[normalized]
        return {
            "url": url,
            "final_url": final_url,
            "status": status,
            "body": body if method == "GET" else "",
            "error": "" if status < 400 else f"HTTP {status}",
        }


def strip_fragment(url: str) -> str:
    parts = urllib.parse.urlsplit(url)
    return urllib.parse.urlunsplit((parts.scheme, parts.netloc, parts.path, parts.query, ""))


def load_urls(path: Path) -> list[str]:
    urls: list[str] = []
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue
        if " #" in line:
            line = line.split(" #", 1)[0].strip()
        urls.append(line)
    return urls


def parse_sitemap_urls(xml_text: str) -> list[str]:
    root = ET.fromstring(xml_text)
    namespace = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
    return sorted(
        {
            strip_fragment((node.text or "").strip())
            for node in root.findall(f"{namespace}url/{namespace}loc")
            if (node.text or "").strip()
        }
    )


def load_sitemap_urls(url: str, fetcher: Fetcher) -> list[str]:
    result = fetcher.get(url)
    if result["status"] != 200:
        raise RuntimeError(f"sitemap returned HTTP {result['status']}: {url}")
    urls = parse_sitemap_urls(result["body"])
    if not urls:
        raise RuntimeError(f"sitemap contains no URL entries: {url}")
    return urls


def is_same_host_link(base_url: str, href: str) -> str | None:
    href = href.strip()
    if not href or href.startswith(("#", "mailto:", "tel:", "sms:", "javascript:")):
        return None
    resolved = urllib.parse.urljoin(base_url, href)
    resolved_parts = urllib.parse.urlsplit(resolved)
    base_parts = urllib.parse.urlsplit(base_url)
    if resolved_parts.scheme not in ("http", "https"):
        return None
    if resolved_parts.netloc.lower() != base_parts.netloc.lower():
        return None
    if resolved_parts.path == "/cdn-cgi/l/email-protection":
        return None
    return strip_fragment(resolved)


def final_path_has_double_slash(final_url: str) -> bool:
    return "//" in urllib.parse.urlsplit(final_url).path


def is_login_gated_path(url: str, prefixes: tuple[str, ...]) -> bool:
    path = urllib.parse.urlsplit(url).path
    return any(path.startswith(prefix) for prefix in prefixes)


def iter_jsonld_nodes(value: Any) -> list[dict[str, Any]]:
    nodes: list[dict[str, Any]] = []
    if isinstance(value, list):
        for item in value:
            nodes.extend(iter_jsonld_nodes(item))
    elif isinstance(value, dict):
        nodes.append(value)
        graph = value.get("@graph")
        if isinstance(graph, list):
            for item in graph:
                nodes.extend(iter_jsonld_nodes(item))
    return nodes


def type_matches(value: Any, expected: str) -> bool:
    if isinstance(value, str):
        return value == expected
    if isinstance(value, list):
        return expected in value
    return False


def credential_text(value: Any) -> str:
    if isinstance(value, str):
        return value
    if isinstance(value, dict):
        return " ".join(credential_text(item) for item in value.values())
    if isinstance(value, list):
        return " ".join(credential_text(item) for item in value)
    return ""


def validate_jsonld_block(
    block: str,
    index: int,
    fetcher: Fetcher,
) -> list[str]:
    errors: list[str] = []
    if not block:
        return [f"JSON-LD block {index} is empty"]
    try:
        parsed = json.loads(block)
    except json.JSONDecodeError as exc:
        return [f"JSON-LD block {index} invalid JSON: {exc}"]

    for node in iter_jsonld_nodes(parsed):
        node_type = node.get("@type")
        if type_matches(node_type, "Organization"):
            for field in ("@id", "name", "url"):
                if not node.get(field):
                    errors.append(f"JSON-LD block {index} Organization missing {field}")
        if type_matches(node_type, "Person"):
            if not node.get("name"):
                errors.append(f"JSON-LD block {index} Person missing name")
            if "hasCredential" in node:
                text = credential_text(node.get("hasCredential"))
                if FORMER_REGISTERED_NURSE_RE.search(text):
                    errors.append(
                        f"JSON-LD block {index} Person hasCredential uses registered nurse without former"
                    )
        if type_matches(node_type, "BreadcrumbList"):
            elements = node.get("itemListElement")
            if not isinstance(elements, list) or not elements:
                errors.append(
                    f"JSON-LD block {index} BreadcrumbList itemListElement must be a non-empty array"
                )
            else:
                for expected_position, item in enumerate(elements, start=1):
                    if not isinstance(item, dict):
                        errors.append(
                            f"JSON-LD block {index} BreadcrumbList item {expected_position} is not an object"
                        )
                        continue
                    if item.get("position") != expected_position:
                        errors.append(
                            f"JSON-LD block {index} BreadcrumbList position {item.get('position')} should be {expected_position}"
                        )
                    item_url = item.get("item")
                    if isinstance(item_url, dict):
                        item_url = item_url.get("@id") or item_url.get("url")
                    if isinstance(item_url, str) and item_url:
                        result = fetcher.head_or_get(strip_fragment(item_url))
                        if result["status"] != 200:
                            errors.append(
                                f"JSON-LD block {index} BreadcrumbList item URL {item_url} returned {result['status']}"
                            )
                    else:
                        errors.append(
                            f"JSON-LD block {index} BreadcrumbList item {expected_position} missing item URL"
                        )
        if type_matches(node_type, "FAQPage"):
            entities = node.get("mainEntity")
            if not isinstance(entities, list):
                entities = [entities] if isinstance(entities, dict) else []
            if not entities:
                errors.append(f"JSON-LD block {index} FAQPage mainEntity is empty")
            for entity_number, entity in enumerate(entities, start=1):
                if not isinstance(entity, dict):
                    errors.append(
                        f"JSON-LD block {index} FAQPage mainEntity {entity_number} is not an object"
                    )
                    continue
                answer = entity.get("acceptedAnswer")
                answer_text = answer.get("text") if isinstance(answer, dict) else None
                if not isinstance(answer_text, str) or not answer_text.strip():
                    errors.append(
                        f"JSON-LD block {index} FAQPage answer {entity_number} text is empty"
                    )
    return errors


def validate_url(
    url: str,
    fetcher: Fetcher,
    login_gated_prefixes: tuple[str, ...] = DEFAULT_LOGIN_GATED_PREFIXES,
) -> dict[str, Any]:
    reasons: list[str] = []
    warnings: list[str] = []
    page_result = fetcher.get(url)
    if page_result["status"] != 200:
        reasons.append(f"page returned HTTP {page_result['status']}")
    if final_path_has_double_slash(page_result["final_url"]):
        reasons.append(f"final URL path contains double slash: {page_result['final_url']}")

    internal_links: list[dict[str, Any]] = []
    jsonld_errors: list[str] = []
    if page_result["status"] == 200:
        parser = PageParser()
        parser.feed(page_result["body"])
        unique_internal_links = sorted(
            {
                link
                for href in parser.links
                for link in [is_same_host_link(page_result["final_url"], href)]
                if link
            }
        )
        for link in unique_internal_links:
            result = fetcher.head_or_get(link)
            internal_links.append(
                {
                    "url": link,
                    "status": result["status"],
                    "final_url": result["final_url"],
                    "error": result["error"],
                }
            )
            if (
                result["status"] in (403, 404)
                and is_login_gated_path(link, login_gated_prefixes)
            ):
                warnings.append(
                    "bot-blocked or login-gated, browser-verify: "
                    f"{link} ({result['status']})"
                )
            elif result["status"] < 200 or result["status"] >= 300:
                reasons.append(
                    f"internal link returned {result['status']}: {link}"
                )
        for index, block in enumerate(parser.jsonld_blocks, start=1):
            jsonld_errors.extend(validate_jsonld_block(block, index, fetcher))
        reasons.extend(jsonld_errors)

    return {
        "url": url,
        "status": page_result["status"],
        "final_url": page_result["final_url"],
        "passed": not reasons,
        "reasons": reasons,
        "warnings": warnings,
        "internal_links": internal_links,
        "jsonld_errors": jsonld_errors,
    }


def print_report(results: list[dict[str, Any]]) -> None:
    for result in results:
        state = "PASS" if result["passed"] else "FAIL"
        print(f"{state} {result['url']}")
        print(f"  status: {result['status']}")
        print(f"  final: {result['final_url']}")
        if result["reasons"]:
            for reason in result["reasons"]:
                print(f"  - {reason}")
        else:
            print("  - no issues found")
        if result.get("warnings"):
            for warning in result["warnings"]:
                print(f"  WARN {warning}")


def write_json_report(path: Path, results: list[dict[str, Any]]) -> None:
    payload = {
        "passed": all(result["passed"] for result in results),
        "results": results,
    }
    path.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def run_validation(
    urls: list[str],
    fetcher: Fetcher,
    login_gated_prefixes: tuple[str, ...] = DEFAULT_LOGIN_GATED_PREFIXES,
) -> list[dict[str, Any]]:
    return [
        validate_url(url, fetcher, login_gated_prefixes=login_gated_prefixes)
        for url in urls
    ]


def run_self_test() -> int:
    passing_url = "https://www.joinsnooze.com/pass"
    failing_url = "https://www.joinsnooze.com/fail"
    fixtures = {
        passing_url: (
            200,
            passing_url,
            """
            <html><body>
            <a href="/linked">Linked</a>
            <a href="/cdn-cgi/l/email-protection#abc">Protected email</a>
            <a href="/offers/z63s9VaR">Membership</a>
            <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@graph": [
                {"@type": "Organization", "@id": "https://www.joinsnooze.com/#org", "name": "Snooze", "url": "https://www.joinsnooze.com/"},
                {"@type": "Person", "name": "Sally", "hasCredential": "former registered nurse"},
                {"@type": "BreadcrumbList", "itemListElement": [
                  {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.joinsnooze.com/"}
                ]},
                {"@type": "FAQPage", "mainEntity": [
                  {"@type": "Question", "name": "Q", "acceptedAnswer": {"@type": "Answer", "text": "A"}}
                ]}
              ]
            }
            </script>
            </body></html>
            """,
        ),
        "https://www.joinsnooze.com/linked": (200, "https://www.joinsnooze.com/linked", ""),
        "https://www.joinsnooze.com/offers/z63s9VaR": (
            403,
            "https://www.joinsnooze.com/offers/z63s9VaR",
            "",
        ),
        "https://www.joinsnooze.com/account": (
            404,
            "https://www.joinsnooze.com/account",
            "",
        ),
        "https://www.joinsnooze.com/": (200, "https://www.joinsnooze.com/", ""),
        failing_url: (
            200,
            "https://www.joinsnooze.com//fail",
            """
            <html><body>
            <a href="/missing">Missing</a>
            <script type="application/ld+json">
            {"@type": "Person", "hasCredential": "registered nurse"}
            </script>
            <script type="application/ld+json">
            {"@type": "FAQPage", "mainEntity": [{"acceptedAnswer": {"text": ""}}]}
            </script>
            </body></html>
            """,
        ),
        "https://www.joinsnooze.com/missing": (
            404,
            "https://www.joinsnooze.com/missing",
            "",
        ),
    }
    fetcher = Fetcher(rate_limit=False, fixtures=fixtures)
    results = run_validation([passing_url, failing_url], fetcher)
    print_report(results)
    pass_ok = results[0]["passed"]
    warn_ok = len(results[0]["warnings"]) == 1 and all(
        "bot-blocked or login-gated" in warning for warning in results[0]["warnings"]
    )
    fail_ok = not results[1]["passed"] and any(
        "registered nurse" in reason for reason in results[1]["reasons"]
    )
    sitemap_ok = parse_sitemap_urls(
        """<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url><loc>https://www.joinsnooze.com/b</loc></url>
          <url><loc>https://www.joinsnooze.com/a#fragment</loc></url>
        </urlset>"""
    ) == [
        "https://www.joinsnooze.com/a",
        "https://www.joinsnooze.com/b",
    ]
    account_not_gated = not is_login_gated_path(
        "https://www.joinsnooze.com/account", DEFAULT_LOGIN_GATED_PREFIXES
    )
    if pass_ok and warn_ok and fail_ok and sitemap_ok and account_not_gated:
        print("SELF-TEST PASS")
        return 0
    print("SELF-TEST FAIL")
    return 1


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Validate live Snooze URLs for status, internal links and JSON-LD."
    )
    parser.add_argument(
        "url_file",
        nargs="?",
        type=Path,
        default=DEFAULT_URL_FILE,
        help=f"URL list file. Defaults to {DEFAULT_URL_FILE}.",
    )
    parser.add_argument(
        "--json",
        dest="json_path",
        type=Path,
        help="Write a machine-readable JSON report to this path.",
    )
    parser.add_argument(
        "--sitemap-url",
        default=None,
        help=(
            "Validate every URL in a live sitemap instead of the URL file. "
            f"Use {DEFAULT_SITEMAP_URL} for the full Snooze public graph."
        ),
    )
    parser.add_argument(
        "--self-test",
        action="store_true",
        help="Run embedded parser and validator fixtures without live requests.",
    )
    parser.add_argument(
        "--login-gated-prefix",
        dest="login_gated_prefixes",
        action="append",
        help=(
            "Path prefix that may return 403 or 404 for anonymous validators. "
            "Repeat to override the defaults."
        ),
    )
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    if args.self_test:
        return run_self_test()
    fetcher = Fetcher()
    if args.sitemap_url:
        try:
            urls = load_sitemap_urls(args.sitemap_url, fetcher)
        except (RuntimeError, ET.ParseError) as exc:
            print(f"Unable to load sitemap: {exc}", file=sys.stderr)
            return 2
    else:
        if not args.url_file.exists():
            print(f"URL file not found: {args.url_file}", file=sys.stderr)
            return 2
        urls = load_urls(args.url_file)
        if not urls:
            print(f"No URLs found in {args.url_file}", file=sys.stderr)
            return 2
    login_gated_prefixes = (
        tuple(args.login_gated_prefixes)
        if args.login_gated_prefixes
        else DEFAULT_LOGIN_GATED_PREFIXES
    )
    results = run_validation(urls, fetcher, login_gated_prefixes=login_gated_prefixes)
    print_report(results)
    if args.json_path:
        write_json_report(args.json_path, results)
    return 0 if all(result["passed"] for result in results) else 1


if __name__ == "__main__":
    raise SystemExit(main())
