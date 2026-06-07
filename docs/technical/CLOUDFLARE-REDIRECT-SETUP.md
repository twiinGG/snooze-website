# Cloudflare Redirect Setup - joinsnooze.com → joinsnooze.com

**Date:** December 07, 2025  
**Status:** ✅ **Implemented and Active**  
**Purpose:** Replace slow Namecheap URL redirect with fast Cloudflare redirect

## Current Status

- **Implementation Date:** December 07, 2025
- **Status:** ✅ **Active and Working**
- **Method:** Cloudflare Redirect Rules (Static redirect)
- **Performance:** Significant improvement over previous Namecheap URL redirect

### Configuration

- **Source Domains:** `joinsnooze.com`, `www.joinsnooze.com`
- **Destination:** `https://joinsnooze.com`
- **Redirect Type:** 301 (Permanent)
- **Query String Preservation:** Enabled
- **Rule Name:** `Redirect joinsnooze.com to joinsnooze.com`

## Previous Issue (Resolved)

- **Problem:** Namecheap URL redirect from `joinsnooze.com` to `joinsnooze.com` was slow (500-2000ms) and blocking users
- **Solution:** Migrated to Cloudflare redirect for faster performance (50-150ms)

## Implementation Checklist

### ✅ Step 1: Add to Cloudflare
- [x] Log in to Cloudflare
- [x] Click "Add a Site"
- [x] Enter `joinsnooze.com`
- [x] Select Free plan

### ✅ Step 2: Update Nameservers
- [x] Note Cloudflare nameserver addresses
- [x] Go to Namecheap (or domain registrar)
- [x] Update nameservers for `joinsnooze.com`
- [x] Save changes

### ✅ Step 3: Configure DNS (after propagation)
- [x] Go to Cloudflare DNS → Records
- [x] Add A record: `@` → `192.0.2.1` (Proxied ✓)
- [x] Add A record: `www` → `192.0.2.1` (Proxied ✓)
- [x] Verify both have orange cloud icon

### ✅ Step 4: Create Redirect Rule
- [x] Go to Rules → Redirect Rules
- [x] Create rule:
  - **If:** `http.host eq "joinsnooze.com" or http.host eq "www.joinsnooze.com"`
  - **Then:** Static redirect to `https://joinsnooze.com`
  - **Status:** `301`
  - **Preserve query string:** ✓
- [x] Deploy rule

### ✅ Step 5: Test
- [x] Wait for DNS propagation
- [x] Test: `curl -I https://joinsnooze.com`
- [x] Test in browser (incognito)
- [x] Verify redirect speed (< 200ms)
- [x] **Confirmed working:** December 07, 2025

## Prerequisites

1. Cloudflare account (free plan works)
2. Access to `joinsnooze.com` domain DNS settings
3. Ability to change nameservers or DNS records

## Setup Instructions

### Step 1: Add Domain to Cloudflare

1. Sign in to your Cloudflare account at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **"Add a Site"** button
3. Enter `joinsnooze.com` and click **"Add site"**
4. Select a plan (Free plan is sufficient for redirects)
5. Cloudflare will scan your existing DNS records

### Step 2: Update Nameservers

1. Cloudflare will provide two nameserver addresses (e.g., `alice.ns.cloudflare.com` and `bob.ns.cloudflare.com`)
2. **Go to your domain registrar** (likely Namecheap) where `joinsnooze.com` is registered
3. Navigate to DNS/Nameserver settings for `joinsnooze.com`
4. Replace existing nameservers with Cloudflare's nameserver addresses
5. Save changes

**Note:** DNS propagation can take 24-48 hours, but often completes within 1-2 hours

### Step 3: Configure DNS Records in Cloudflare

1. In Cloudflare dashboard, go to **DNS** → **Records** for `joinsnooze.com`
2. Add/verify the following records:

| Type | Name | Content | Proxy Status |
|------|------|---------|--------------|
| A | @ | `192.0.2.1` | Proxied (orange cloud) |
| A | www | `192.0.2.1` | Proxied (orange cloud) |

**Important:** 
- Use dummy IP `192.0.2.1` (this is fine for redirects)
- **Both records MUST be Proxied** (orange cloud icon enabled)
- If records already exist, ensure proxy is enabled

### Step 4: Create Redirect Rule

1. In Cloudflare dashboard, navigate to **Rules** → **Redirect Rules**
2. Click **"Create rule"**
3. Configure the rule:

   **Rule Name:** `Redirect joinsnooze.com to joinsnooze.com`

   **When incoming requests match:**
   - If: `Custom filter expression`
   - Expression: `(http.host eq "joinsnooze.com" or http.host eq "www.joinsnooze.com")`
   - OR use simpler: Select "All incoming requests" if you want everything redirected

   **Then the settings are:**
   - **Action:** Static
   - **Status code:** `301` (Permanent Redirect) or `302` (Temporary Redirect)
   - **Destination URL:** `https://joinsnooze.com`
   - **Preserve query string:** Enabled (recommended)
   - **Preserve path:** Enabled (if you want `/page` to go to `joinsnooze.com/page`)

4. Click **"Deploy"** to activate

### Alternative: Using Cloudflare Workers (Advanced, Fastest)

For even faster redirects with more control, you can use Cloudflare Workers:

1. Go to **Workers & Pages** → **Create application** → **Create Worker**
2. Use the following code:

```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Redirect joinsnooze.com to joinsnooze.com
    if (url.hostname === 'joinsnooze.com' || url.hostname === 'www.joinsnooze.com') {
      // Preserve path and query string
      const redirectUrl = `https://joinsnooze.com${url.pathname}${url.search}`;
      
      return Response.redirect(redirectUrl, 301);
    }
    
    return new Response('Not found', { status: 404 });
  }
}
```

3. Deploy the worker
4. Go to **Routes** and add:
   - Pattern: `joinsnooze.com/*`
   - Worker: [your worker name]

## Testing

After setup (allow 1-2 hours for DNS propagation):

1. Test the redirect:
   ```bash
   curl -I https://joinsnooze.com
   ```

   Expected output:
   ```
   HTTP/2 301
   location: https://joinsnooze.com
   ```

2. Test in browser:
   - Visit `https://joinsnooze.com`
   - Should automatically redirect to `https://joinsnooze.com`
   - Check browser console for redirect time (should be < 100ms)

3. Test query string preservation:
   - Visit `https://joinsnooze.com/page?param=value`
   - Should redirect to `https://joinsnooze.com/page?param=value`

## Performance Comparison

| Method | Average Redirect Time |
|--------|---------------------|
| Namecheap URL Redirect | 500-2000ms |
| Cloudflare Redirect Rules | 50-150ms |
| Cloudflare Workers | 20-80ms |

## Troubleshooting

### Redirect not working

1. **Check DNS propagation:**
   ```bash
   dig joinsnooze.com NS
   ```
   Should show Cloudflare nameservers

2. **Verify records are proxied:**
   - In Cloudflare DNS, ensure orange cloud icon is enabled
   - Non-proxied records won't trigger redirect rules

3. **Check redirect rule order:**
   - Cloudflare processes rules in order
   - Ensure redirect rule isn't blocked by other rules

4. **Clear browser cache:**
   - Redirects are often cached by browsers
   - Test in incognito/private window

### SSL/TLS Issues

1. Ensure **SSL/TLS** mode is set to **"Full"** or **"Full (strict)"**
   - Go to **SSL/TLS** → **Overview**
   - Select appropriate encryption mode

2. Cloudflare will automatically provision SSL certificates for proxied domains

## Maintenance

### To disable redirect (temporary):
- In Redirect Rules, disable the rule (don't delete)
- Or remove the route if using Workers

### To change redirect destination:
- Edit the Redirect Rule and update destination URL
- Changes take effect immediately

### To remove redirect completely:
1. Delete the Redirect Rule
2. Update DNS records to point to actual server (not dummy IP)
3. Or change nameservers back to original provider

## Rollback Plan

If you need to revert to Namecheap redirect:

1. In Namecheap, change nameservers back to Namecheap defaults
2. Set up URL redirect in Namecheap dashboard
3. Remove redirect rule from Cloudflare
4. Wait for DNS propagation (24-48 hours)

## Status Code Reference

- **301** = Permanent redirect (SEO-friendly, use for permanent moves)
- **302** = Temporary redirect (use if this is temporary)

## Notes

- **301 vs 302:** Use `301` (Permanent) for SEO benefits and to signal permanent move
- **Query string preservation:** Recommended to maintain any tracking parameters or UTM codes
- **Path preservation:** Enable if you have specific pages that should redirect to corresponding pages
- **www redirect:** Consider redirecting `www.joinsnooze.com` to `joinsnooze.com` first, then to destination

## References

- [Cloudflare Redirect Rules Documentation](https://developers.cloudflare.com/rules/redirect-rules/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Redirect Domain Guide](https://developers.cloudflare.com/fundamentals/setup/manage-domains/redirect-domain/)

---

**Last Updated:** December 07, 2025  
**Implementation Status:** ✅ Complete and verified working

