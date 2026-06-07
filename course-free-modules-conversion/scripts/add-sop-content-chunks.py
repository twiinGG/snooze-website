#!/usr/bin/env python3
"""
Add remaining SOP content to Notion page in chunks

Purpose: Add full SOP content to existing Notion page (handles 100 block limit)
Page ID: 2ef33898-b6c2-81cd-9641-fe5a7872817d

Usage:
    python add-sop-content-chunks.py
"""

import os
import requests
from typing import List, Dict, Any

PAGE_ID = "2ef33898-b6c2-81cd-9641-fe5a7872817d"

def get_notion_token() -> str:
    """Get Notion API token from environment."""
    token = os.getenv("NOTION_API_TOKEN")
    if not token:
        raise ValueError("NOTION_API_TOKEN environment variable not set.")
    return token

def convert_markdown_line_to_block(line: str) -> Dict[str, Any]:
    """Convert a single markdown line to Notion block."""
    line = line.rstrip()
    
    if not line:
        return None
    
    # Headers
    if line.startswith("# "):
        return {
            "object": "block",
            "type": "heading_1",
            "heading_1": {
                "rich_text": [{"type": "text", "text": {"content": line[2:].strip()}}]
            }
        }
    elif line.startswith("## "):
        return {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [{"type": "text", "text": {"content": line[3:].strip()}}]
            }
        }
    elif line.startswith("### "):
        return {
            "object": "block",
            "type": "heading_3",
            "heading_3": {
                "rich_text": [{"type": "text", "text": {"content": line[4:].strip()}}]
            }
        }
    # Bullet lists
    elif line.startswith("- ") or line.startswith("* "):
        content = line[2:].strip()
        # Handle checkboxes
        if content.startswith("[ ]") or content.startswith("[x]"):
            checked = content.startswith("[x")
            text = content[3:].strip()
            return {
                "object": "block",
                "type": "to_do",
                "to_do": {
                    "rich_text": [{"type": "text", "text": {"content": text}}],
                    "checked": checked
                }
            }
        else:
            return {
                "object": "block",
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [{"type": "text", "text": {"content": content}}]
                }
            }
    # Code blocks
    elif line.startswith("```"):
        return None  # Skip code block markers for now
    # Horizontal rule
    elif line.startswith("---") and len(line.strip()) >= 3:
        return {
            "object": "block",
            "type": "divider",
            "divider": {}
        }
    # Regular paragraphs
    else:
        # Handle bold/italic in simple way
        text = line
        return {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [{"type": "text", "text": {"content": text}}]
            }
        }

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
        # Note: Notion API uses PATCH for appending children, but may need POST
        # If this fails, try: response = requests.post(url, headers=headers, json=payload)
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
        
        # Convert to blocks
        print("Converting markdown to Notion blocks...")
        lines = content.split("\n")
        blocks = []
        
        for line in lines:
            block = convert_markdown_line_to_block(line)
            if block:
                blocks.append(block)
        
        print(f"Created {len(blocks)} blocks")
        print(f"Adding to page {PAGE_ID}...")
        
        # Add blocks in chunks
        add_blocks_to_page(PAGE_ID, token, blocks)
        
        print(f"\n✅ Success! Full SOP content added to page.")
        print(f"Page URL: https://www.notion.so/{PAGE_ID.replace('-', '')}")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
