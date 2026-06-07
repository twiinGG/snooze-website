#!/usr/bin/env python3
"""
Query Notion TSC Library Database Structure

Purpose: Get the database schema before creating SOP pages
Database ID: fbfa224339594e1d8efeb8a070f8c772

Usage:
    python query-notion-database.py

Requirements:
    - Notion API token in environment variable NOTION_TOKEN
    - requests library: pip install requests
"""

import os
import json
import requests
from typing import Dict, Any

# Database ID for TSC Library
DATABASE_ID = "fbfa224339594e1d8efeb8a070f8c772"

def get_notion_token() -> str:
    """Get Notion API token from environment."""
    token = os.getenv("NOTION_TOKEN")
    if not token:
        raise ValueError(
            "NOTION_TOKEN environment variable not set. "
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

def print_database_structure(database: Dict[str, Any]):
    """Print database structure in readable format."""
    print("=" * 60)
    print("NOTION TSC LIBRARY DATABASE STRUCTURE")
    print("=" * 60)
    print()
    
    # Database info
    print(f"Database Title: {database.get('title', [{}])[0].get('plain_text', 'N/A')}")
    print(f"Database ID: {database.get('id', 'N/A')}")
    print()
    
    # Properties
    properties = database.get("properties", {})
    print(f"Properties ({len(properties)} total):")
    print("-" * 60)
    
    for prop_name, prop_info in properties.items():
        prop_type = prop_info.get("type", "unknown")
        print(f"\n{prop_name}")
        print(f"  Type: {prop_type}")
        
        # Type-specific details
        if prop_type == "select":
            options = prop_info.get("select", {}).get("options", [])
            if options:
                print(f"  Options:")
                for opt in options:
                    print(f"    - {opt.get('name', 'N/A')} (id: {opt.get('id', 'N/A')})")
        
        elif prop_type == "multi_select":
            options = prop_info.get("multi_select", {}).get("options", [])
            if options:
                print(f"  Options:")
                for opt in options:
                    print(f"    - {opt.get('name', 'N/A')}")
        
        elif prop_type == "number":
            number_format = prop_info.get("number", {}).get("format", "number")
            print(f"  Format: {number_format}")
        
        elif prop_type == "date":
            print(f"  Date format: {prop_info.get('date', {}).get('format', 'default')}")
        
        elif prop_type == "relation":
            relation_db = prop_info.get("relation", {}).get("database_id", "N/A")
            print(f"  Related Database ID: {relation_db}")
        
        # Check if required
        # Note: Notion API doesn't directly show "required" status
        # This would need to be checked in UI or inferred from usage
    
    print()
    print("=" * 60)
    print("END OF STRUCTURE")
    print("=" * 60)

def save_structure_to_file(database: Dict[str, Any], filename: str = "notion-database-structure.json"):
    """Save database structure to JSON file."""
    with open(filename, "w") as f:
        json.dump(database, f, indent=2)
    print(f"\nStructure saved to: {filename}")

def main():
    """Main execution."""
    try:
        # Get token
        token = get_notion_token()
        
        # Query database
        print("Querying Notion database...")
        database = query_database_structure(DATABASE_ID, token)
        
        # Print structure
        print_database_structure(database)
        
        # Save to file
        save_structure_to_file(database)
        
        print("\n✅ Success! Use this structure to create SOP pages.")
        print("\nNext steps:")
        print("1. Review the property structure above")
        print("2. Map VA-SOP-TEMPLATE.md fields to these properties")
        print("3. Update NOTION-DATABASE-SETUP.md with actual property names")
        print("4. Create first SOP page (LMCR04) matching this structure")
        
    except requests.exceptions.HTTPError as e:
        print(f"❌ Error querying database: {e}")
        if e.response.status_code == 401:
            print("   Check your NOTION_TOKEN is valid")
        elif e.response.status_code == 404:
            print(f"   Database {DATABASE_ID} not found or not accessible")
        else:
            print(f"   Response: {e.response.text}")
    except ValueError as e:
        print(f"❌ Error: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    main()
