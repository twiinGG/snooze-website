#!/usr/bin/env python3
"""
Create LMCR04 SOP in Notion TSC Library Database

Purpose: Query database structure and create SOP page
Database ID: fbfa224339594e1d8efeb8a070f8c772

Usage:
    python create-notion-sop.py

Requirements:
    - Notion API token in environment variable NOTION_API_TOKEN
    - requests library: pip install requests
"""

import os
import json
import requests
from typing import Dict, Any, List

# Database ID for TSC Library
DATABASE_ID = "fbfa224339594e1d8efeb8a070f8c772"

def get_notion_token() -> str:
    """Get Notion API token from environment."""
    token = os.getenv("NOTION_API_TOKEN")
    if not token:
        raise ValueError(
            "NOTION_API_TOKEN environment variable not set. "
            "Get your token from: https://www.notion.so/my-integrations"
        )
    return token

def query_database_structure(database_id: str, token: str) -> Dict[str, Any]:
    """Query Notion database structure."""
    url = f"https://api.notion.com/v1/databases/{database_id}"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
    }
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    
    return response.json()

def read_sop_template() -> str:
    """Read the SOP template content."""
    template_path = "/Users/kadegreenland/Documents/Projects/The Sleep Concierge/Platforms/Snooze OS/snooze-product/projects/course-free-modules-conversion/docs/VA-SOP-TEMPLATE.md"
    with open(template_path, "r") as f:
        return f.read()

def convert_markdown_to_notion_blocks(markdown: str) -> List[Dict[str, Any]]:
    """Convert markdown to Notion blocks."""
    blocks = []
    lines = markdown.split("\n")
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # Skip empty lines
        if not line:
            i += 1
            continue
        
        # Headers
        if line.startswith("# "):
            blocks.append({
                "object": "block",
                "type": "heading_1",
                "heading_1": {
                    "rich_text": [{"type": "text", "text": {"content": line[2:].strip()}}]
                }
            })
        elif line.startswith("## "):
            blocks.append({
                "object": "block",
                "type": "heading_2",
                "heading_2": {
                    "rich_text": [{"type": "text", "text": {"content": line[3:].strip()}}]
                }
            })
        elif line.startswith("### "):
            blocks.append({
                "object": "block",
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [{"type": "text", "text": {"content": line[4:].strip()}}]
                }
            })
        # Bullet lists
        elif line.startswith("- ") or line.startswith("* "):
            items = [line[2:].strip()]
            i += 1
            while i < len(lines) and (lines[i].strip().startswith("- ") or lines[i].strip().startswith("* ") or lines[i].strip().startswith("  ")):
                next_line = lines[i].strip()
                if next_line.startswith("- ") or next_line.startswith("* "):
                    items.append(next_line[2:].strip())
                elif next_line.startswith("  "):
                    items[-1] += " " + next_line.strip()
                i += 1
            i -= 1
            
            for item in items:
                blocks.append({
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {
                        "rich_text": [{"type": "text", "text": {"content": item}}]
                    }
                })
        # Code blocks
        elif line.startswith("```"):
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
                    "language": "plain text"
                }
            })
        # Regular paragraphs
        else:
            blocks.append({
                "object": "block",
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [{"type": "text", "text": {"content": line}}]
                }
            })
        
        i += 1
    
    return blocks

def create_notion_page(database_id: str, token: str, properties: Dict[str, Any], content: str) -> Dict[str, Any]:
    """Create a new page in Notion database."""
    url = "https://api.notion.com/v1/pages"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
    }
    
    # Convert markdown to blocks (simplified - just use paragraph blocks for now)
    blocks = convert_markdown_to_notion_blocks(content)
    
    # Limit to 100 blocks per request (Notion API limit)
    if len(blocks) > 100:
        blocks = blocks[:100]
    
    payload = {
        "parent": {"database_id": database_id},
        "properties": properties,
        "children": blocks
    }
    
    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()
    
    return response.json()

def main():
    """Main execution."""
    try:
        # Get token
        token = get_notion_token()
        
        # Query database structure first
        print("Step 1: Querying database structure...")
        database = query_database_structure(DATABASE_ID, token)
        
        properties_schema = database.get("properties", {})
        print(f"\n✅ Found {len(properties_schema)} properties:")
        for prop_name, prop_info in properties_schema.items():
            print(f"  - {prop_name}: {prop_info.get('type')}")
        
        # Read SOP template
        print("\nStep 2: Reading SOP template...")
        sop_content = read_sop_template()
        
        # Customize for LMCR04
        sop_content = sop_content.replace("LMCR##", "LMCR04")
        sop_content = sop_content.replace("[Bundle Code]", "LMCR04")
        sop_content = sop_content.replace("[Variant Name]", "5-12 Month Schedules")
        sop_content = sop_content.replace("[Variant-Name]", "5-12M-Schedules")
        
        # Map properties (try to match common property names)
        page_properties = {}
        
        # Title property (usually first property or named "Name"/"Title")
        title_prop = None
        for prop_name, prop_info in properties_schema.items():
            if prop_info.get("type") == "title":
                title_prop = prop_name
                break
        
        if title_prop:
            page_properties[title_prop] = {
                "title": [{"text": {"content": "LMCR04 - 5-12 Month Schedules Free Module Setup"}}]
            }
        
        # Try to find other common properties
        for prop_name, prop_info in properties_schema.items():
            prop_type = prop_info.get("type")
            
            if prop_type == "select" and "bundle" in prop_name.lower():
                # Try to find bundle code option
                options = prop_info.get("select", {}).get("options", [])
                lmcr04_option = next((opt for opt in options if "LMCR04" in opt.get("name", "")), None)
                if not lmcr04_option:
                    # Use first option or create new
                    page_properties[prop_name] = {"select": {"name": "LMCR04"}}
                else:
                    page_properties[prop_name] = {"select": {"name": lmcr04_option.get("name")}}
            
            elif prop_type == "select" and "status" in prop_name.lower():
                page_properties[prop_name] = {"select": {"name": "Draft"}}
            
            elif prop_type == "select" and "difficulty" in prop_name.lower():
                page_properties[prop_name] = {"select": {"name": "Intermediate"}}
            
            elif prop_type == "number" and ("time" in prop_name.lower() or "min" in prop_name.lower()):
                page_properties[prop_name] = {"number": 60}
            
            elif prop_type == "date" and "updated" in prop_name.lower():
                from datetime import datetime
                page_properties[prop_name] = {
                    "date": {"start": datetime.now().isoformat()}
                }
        
        print("\nStep 3: Creating Notion page...")
        print(f"Properties to set: {list(page_properties.keys())}")
        
        # Create page
        result = create_notion_page(DATABASE_ID, token, page_properties, sop_content)
        
        page_id = result.get("id")
        page_url = result.get("url", f"https://notion.so/{page_id.replace('-', '')}")
        
        print(f"\n✅ Success! SOP page created.")
        print(f"Page ID: {page_id}")
        print(f"Page URL: {page_url}")
        print(f"\nNote: Content may need to be added in chunks if template is very long.")
        print(f"Notion API limits to 100 blocks per request.")
        
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error: {e}")
        if e.response.status_code == 401:
            print("   Check your NOTION_API_TOKEN is valid")
        elif e.response.status_code == 404:
            print(f"   Database {DATABASE_ID} not found or not accessible")
        else:
            print(f"   Response: {e.response.text}")
    except ValueError as e:
        print(f"❌ Error: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
