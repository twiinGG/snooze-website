# Google Analytics MCP Setup Guide

## Status
✅ **Installed:** `analytics-mcp` package via pipx  
✅ **Configured:** MCP server added to `~/.cursor/mcp.json`  
⏳ **Pending:** Google Cloud credentials setup

## Next Steps: Google Cloud Credentials Setup

### Option 1: Using gcloud CLI (Recommended)

1. **Install Google Cloud SDK:**
   ```bash
   brew install --cask google-cloud-sdk
   ```

2. **Authenticate and set up credentials:**
   ```bash
   gcloud auth login
   gcloud auth application-default login \
     --scopes https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform
   ```

3. **Enable required APIs in your Google Cloud project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project (or create a new one)
   - Enable these APIs:
     - Google Analytics Admin API
     - Google Analytics Data API

4. **Set environment variables:**
   
   After running `gcloud auth application-default login`, it will print the path to credentials:
   ```
   Credentials saved to file: [PATH_TO_CREDENTIALS_JSON]
   ```
   
   Then set these in your shell profile (`~/.zshrc` or `~/.bash_profile`):
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/credentials.json"
   export GOOGLE_PROJECT_ID="your-project-id"
   ```
   
   Or update the MCP config file directly with the actual paths.

### Option 2: Using Service Account (For Production)

1. **Create a service account:**
   - Go to [Google Cloud Console > IAM & Admin > Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
   - Create a new service account
   - Grant it the "Viewer" role for Google Analytics

2. **Create and download a key:**
   - Click on the service account
   - Go to "Keys" tab
   - Create a new JSON key
   - Download the JSON file

3. **Update MCP configuration:**
   Edit `~/.cursor/mcp.json` and replace the environment variable placeholders:
   ```json
   "env": {
     "GOOGLE_APPLICATION_CREDENTIALS": "/full/path/to/service-account-key.json",
     "GOOGLE_PROJECT_ID": "your-project-id"
   }
   ```

## Verify Setup

After setting up credentials, restart Cursor and test the MCP server:

1. In Cursor, type `/mcp` to see available MCP servers
2. You should see `analytics-mcp` in the list
3. Try asking: "What can the analytics-mcp server do?"

## Available Tools

Once connected, you can use these tools:

- `get_account_summaries` - Get your GA accounts and properties
- `get_property_details` - Get details about a specific property
- `run_report` - Run custom Analytics reports
- `run_realtime_report` - Get real-time data
- `get_custom_dimensions_and_metrics` - View custom dimensions/metrics
- `list_google_ads_links` - See Google Ads integrations

## Troubleshooting

**Issue: "Credentials not found"**
- Verify `GOOGLE_APPLICATION_CREDENTIALS` path is correct
- Check file permissions (should be readable)

**Issue: "API not enabled"**
- Ensure both Analytics Admin API and Analytics Data API are enabled
- Wait a few minutes after enabling for propagation

**Issue: "Permission denied"**
- Verify the account has access to your Google Analytics properties
- Check that the service account (if used) has proper IAM roles

## References

- [Google Analytics MCP GitHub](https://github.com/googleanalytics/google-analytics-mcp)
- [Google Cloud SDK Installation](https://cloud.google.com/sdk/docs/install)
- [Analytics Admin API](https://developers.google.com/analytics/devguides/config/admin/v1)
- [Analytics Data API](https://developers.google.com/analytics/devguides/reporting/data/v1)

