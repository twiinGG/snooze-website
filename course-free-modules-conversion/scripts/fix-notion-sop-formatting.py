#!/usr/bin/env python3
"""
Fix Notion SOP formatting - Convert markdown to proper Notion rich text

Purpose: Replace existing page content with properly formatted Notion blocks
Page ID: 2ef33898-b6c2-81cd-9641-fe5a7872817d
"""

import os
import re
import requests
from typing import List, Dict, Any, Tuple

PAGE_ID = "2ef33898-b6c2-81cd-9641-fe5a7872817d"

def get_notion_token() -> str:
    """Get Notion API token from environment."""
    token = os.getenv("NOTION_API_TOKEN")
    if not token:
        raise ValueError("NOTION_API_TOKEN environment variable not set.")
    return token

def parse_markdown_text(text: str) -> List[Dict[str, Any]]:
    """Parse markdown text into Notion rich text with annotations."""
    rich_text = []
    i = 0
    
    while i < len(text):
        # Check for bold **text**
        if text[i:i+2] == "**" and i+2 < len(text):
            end = text.find("**", i+2)
            if end != -1:
                bold_text = text[i+2:end]
                rich_text.append({
                    "type": "text",
                    "text": {"content": bold_text},
                    "annotations": {"bold": True}
                })
                i = end + 2
                continue
        
        # Check for italic *text* (but not **)
        if text[i] == "*" and (i+1 >= len(text) or text[i+1] != "*"):
            end = text.find("*", i+1)
            if end != -1:
                italic_text = text[i+1:end]
                rich_text.append({
                    "type": "text",
                    "text": {"content": italic_text},
                    "annotations": {"italic": True}
                })
                i = end + 1
                continue
        
        # Check for code `text`
        if text[i] == "`" and i+1 < len(text):
            end = text.find("`", i+1)
            if end != -1:
                code_text = text[i+1:end]
                rich_text.append({
                    "type": "text",
                    "text": {"content": code_text},
                    "annotations": {"code": True}
                })
                i = end + 1
                continue
        
        # Regular text - find next special character
        next_special = len(text)
        for special in ["**", "*", "`"]:
            pos = text.find(special, i)
            if pos != -1 and pos < next_special:
                next_special = pos
        
        if next_special > i:
            plain_text = text[i:next_special]
            if plain_text:
                rich_text.append({
                    "type": "text",
                    "text": {"content": plain_text}
                })
            i = next_special
        else:
            # Last character
            rich_text.append({
                "type": "text",
                "text": {"content": text[i]}
            })
            i += 1
    
    return rich_text if rich_text else [{"type": "text", "text": {"content": text}}]

def convert_markdown_to_notion_blocks(content: str) -> List[Dict[str, Any]]:
    """Convert markdown to Notion blocks with proper formatting."""
    blocks = []
    lines = content.split("\n")
    
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        
        # Skip empty lines (but add spacing between sections)
        if not line:
            i += 1
            continue
        
        # Headers
        if line.startswith("# "):
            text = line[2:].strip()
            rich_text = parse_markdown_text(text)
            blocks.append({
                "object": "block",
                "type": "heading_1",
                "heading_1": {"rich_text": rich_text}
            })
        elif line.startswith("## "):
            text = line[3:].strip()
            rich_text = parse_markdown_text(text)
            blocks.append({
                "object": "block",
                "type": "heading_2",
                "heading_2": {"rich_text": rich_text}
            })
        elif line.startswith("### "):
            text = line[4:].strip()
            rich_text = parse_markdown_text(text)
            blocks.append({
                "object": "block",
                "type": "heading_3",
                "heading_3": {"rich_text": rich_text}
            })
        # Horizontal rule
        elif line.startswith("---") and len(line.strip()) >= 3:
            blocks.append({
                "object": "block",
                "type": "divider",
                "divider": {}
            })
        # Bullet lists
        elif line.startswith("- ") or line.startswith("* "):
            content_text = line[2:].strip()
            # Handle checkboxes [ ] or [x]
            if content_text.startswith("[ ]") or content_text.startswith("[x]"):
                checked = content_text.startswith("[x")
                text = content_text[3:].strip()
                rich_text = parse_markdown_text(text)
                blocks.append({
                    "object": "block",
                    "type": "to_do",
                    "to_do": {
                        "rich_text": rich_text,
                        "checked": checked
                    }
                })
            else:
                rich_text = parse_markdown_text(content_text)
                blocks.append({
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {"rich_text": rich_text}
                })
        # Numbered lists
        elif re.match(r"^\d+\.\s", line):
            content_text = re.sub(r"^\d+\.\s", "", line)
            rich_text = parse_markdown_text(content_text)
            blocks.append({
                "object": "block",
                "type": "numbered_list_item",
                "numbered_list_item": {"rich_text": rich_text}
            })
        # Code blocks
        elif line.startswith("```"):
            language = line[3:].strip() or "plain text"
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith("```"):
                code_lines.append(lines[i])
                i += 1
            
            blocks.append({
                "object": "block",
                "type": "code",
                "code": {
                    "rich_text": [{"type": "text", "text": {"content": "\n".join(code_lines)}}],
                    "language": language
                }
            })
        # Tables (simple markdown table)
        elif "|" in line and line.count("|") >= 2:
            # Skip separator lines
            if re.match(r"^\|[\s\-:]+\|", line):
                i += 1
                continue
            
            # Parse table row
            cells = [cell.strip() for cell in line.split("|")[1:-1]]
            if cells:
                # Create a simple paragraph for now (Notion tables need special handling)
                table_text = " | ".join(cells)
                rich_text = parse_markdown_text(table_text)
                blocks.append({
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {"rich_text": rich_text}
                })
        # Blockquotes
        elif line.startswith(">"):
            text = line[1:].strip()
            rich_text = parse_markdown_text(text)
            blocks.append({
                "object": "block",
                "type": "quote",
                "quote": {"rich_text": rich_text}
            })
        # Regular paragraphs
        else:
            rich_text = parse_markdown_text(line)
            blocks.append({
                "object": "block",
                "type": "paragraph",
                "paragraph": {"rich_text": rich_text}
            })
        
        i += 1
    
    return blocks

def clear_page_content(page_id: str, token: str):
    """Clear all existing blocks from page."""
    url = f"https://api.notion.com/v1/blocks/{page_id}/children"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
    }
    
    # Get all blocks
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    blocks = response.json().get("results", [])
    
    # Delete each block
    for block in blocks:
        block_id = block.get("id")
        delete_url = f"https://api.notion.com/v1/blocks/{block_id}"
        requests.delete(delete_url, headers=headers)
    
    print(f"Cleared {len(blocks)} existing blocks")

def add_blocks_to_page(page_id: str, token: str, blocks: List[Dict[str, Any]]):
    """Add blocks to existing Notion page."""
    url = f"https://api.notion.com/v1/blocks/{page_id}/children"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
    }
    
    # Notion API allows up to 100 blocks per request
    chunk_size = 100
    for i in range(0, len(blocks), chunk_size):
        chunk = blocks[i:i + chunk_size]
        payload = {"children": chunk}
        
        response = requests.patch(url, headers=headers, json=payload)
        response.raise_for_status()
        print(f"Added {len(chunk)} blocks (total: {min(i + chunk_size, len(blocks))}/{len(blocks)})")

def main():
    """Main execution."""
    try:
        token = get_notion_token()
        
        # Read SOP template
        template_path = "/Users/kadegreenland/Documents/Projects/The Sleep Concierge/Platforms/Snooze OS/snooze-product/projects/course-free-modules-conversion/docs/VA-SOP-TEMPLATE.md"
        with open(template_path, "r") as f:
            content = f.read()
        
        # Customize for LMCR04
        content = content.replace("LMCR##", "LMCR04")
        content = content.replace("[Bundle Code]", "LMCR04")
        content = content.replace("[Variant Name]", "5-12 Month Schedules")
        content = content.replace("[Variant-Name]", "5-12M-Schedules")
        
        # Convert to properly formatted Notion blocks
        print("Converting markdown to Notion blocks with proper formatting...")
        blocks = convert_markdown_to_notion_blocks(content)
        
        print(f"Created {len(blocks)} blocks with proper formatting")
        
        # Clear existing content
        print("Clearing existing page content...")
        clear_page_content(PAGE_ID, token)
        
        # Add new formatted blocks
        print(f"Adding formatted blocks to page {PAGE_ID}...")
        add_blocks_to_page(PAGE_ID, token, blocks)
        
        print(f"\n✅ Success! SOP page reformatted with proper Notion formatting.")
        print(f"Page URL: https://www.notion.so/{PAGE_ID.replace('-', '')}")
        print("\nNote: Bold, italic, and code formatting should now display correctly.")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
