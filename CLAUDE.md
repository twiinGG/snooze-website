# CLAUDE.md - Claude Code Configuration

See @AGENTS.md for behavioral rules specific to this app.

## MCP Configuration

When working in this app, use root MCP servers:
- **Supabase** for RAG queries (970 videos, 5,268 Q&As)
- **n8n-sheets** for Kajabi registry access
- **PAL** for Google Sheets registry queries
- **Snooze Repository** for cross-workspace file access

For full monorepo MCP configuration details, see root CLAUDE.md.

## Kajabi Registry System

**Source of truth:** Google Sheet (workbook ID `1-pDIlV7CFQ_RlI0e9uFBAwdZwZaaQaLKaKpUhZNmzjg`)

**Read from:**
- Google Sheet via PAL MCP
- Synced copy in root `docs/operations/KAJABI-*-REGISTRY.md`
- Parser: `markdown_registry_parser.py`

**Never hardcode offer/product codes.**

## Key Workflows

### Creating Website Pages
1. Query tone of voice from `snooze-strategy-ops` via MCP
2. Build HTML using unified theme classes
3. Add System Initialization block to CSS (see AGENTS.md)
4. Validate responsive breakpoints
5. Run validation scripts before deployment

### Course Content Creation
1. Query RAG for relevant content
2. Use inline styles with `!important` (see AGENTS.md)
3. Follow flat structure pattern
4. Reference Sleep Schedule Bible for schedule content

## Environment

Uses root `.env` file. Climb parent directories to find it using `dotenv` with path resolution.

---

**Last Updated:** February 6, 2026 (Phase 3, Plan 01)
