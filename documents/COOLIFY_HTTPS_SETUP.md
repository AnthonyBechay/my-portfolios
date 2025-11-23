# Coolify HTTPS Configuration Guide

## Problem
Coolify is generating HTTP URLs instead of HTTPS URLs. This happens when:
1. SSL/TLS is not enabled in Coolify
2. Environment variables are set with HTTP instead of HTTPS
3. The reverse proxy headers are not being read correctly

## Solution

### Step 1: Enable SSL/TLS in Coolify

1. **Go to your Coolify Dashboard**
   - Navigate to your service/resource
   - Click on the service (web or backend)

2. **Enable SSL/TLS**
   - Look for "SSL/TLS" or "HTTPS" settings
   - Enable "Force HTTPS" or "Redirect HTTP to HTTPS"
   - If using a custom domain, add your SSL certificate
   - If using sslip.io, Coolify should auto-generate SSL

3. **Verify SSL is Active**
   - Check that your service URL shows `https://` in the browser
   - The padlock icon should appear in the browser

### Step 2: Update Environment Variables in Coolify

In your Coolify service settings, set these environment variables with **HTTPS** URLs:

```bash
# Frontend/Web Service
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-backend-domain.com

# Backend Service
FRONTEND_URL=https://your-domain.com
```

**Important Notes:**
- Replace `your-domain.com` with your actual domain (or sslip.io domain)
- **Always use `https://` not `http://`**
- If using sslip.io, it should be: `https://xxxxx.37.27.181.201.sslip.io`

### Step 3: Update Docker Compose (if needed)

The `docker-compose.yml` already uses environment variables correctly. Make sure Coolify is passing HTTPS URLs:

```yaml
environment:
  FRONTEND_URL: ${NEXT_PUBLIC_SITE_URL:-}  # Should be HTTPS
```

### Step 4: Verify Request Headers

Coolify's reverse proxy should send these headers:
- `X-Forwarded-Proto: https`
- `X-Forwarded-Host: your-domain.com`

The backend code should detect these automatically (see code updates below).

## Code Updates

The backend has been updated to:
1. Detect HTTPS from `X-Forwarded-Proto` header
2. Use `FRONTEND_URL` environment variable (should be HTTPS)
3. Fall back to request headers if environment variable is not set

## Troubleshooting

### Check if HTTPS is working:
```bash
# Test your frontend
curl -I https://your-domain.com

# Should return:
# HTTP/2 200
# (not HTTP/1.1)
```

### Check environment variables in Coolify:
1. Go to your service → Environment Variables
2. Verify all URLs start with `https://`
3. If any start with `http://`, change them to `https://`

### Check Coolify logs:
```bash
# In Coolify dashboard, check:
# - Service logs
# - Build logs
# - Look for any SSL/TLS errors
```

### Force HTTPS redirect in Coolify:
1. Go to your service settings
2. Enable "Force HTTPS" or "HTTPS Redirect"
3. Save and redeploy

## Common Issues

### Issue 1: Mixed Content Warnings
**Problem:** Some resources load over HTTP while page is HTTPS
**Solution:** Ensure all environment variables use HTTPS URLs

### Issue 2: Cookies Not Working
**Problem:** Secure cookies require HTTPS
**Solution:** The backend automatically uses secure cookies when `FRONTEND_URL` starts with `https://`

### Issue 3: CORS Errors
**Problem:** Backend rejects requests from HTTPS frontend
**Solution:** Backend CORS is configured to accept both HTTP and HTTPS origins

## Verification Checklist

- [ ] SSL/TLS is enabled in Coolify
- [ ] Service URL shows `https://` in browser
- [ ] `NEXT_PUBLIC_SITE_URL` is set to HTTPS URL
- [ ] `NEXT_PUBLIC_API_URL` is set to HTTPS URL
- [ ] `FRONTEND_URL` (backend) is set to HTTPS URL
- [ ] No mixed content warnings in browser console
- [ ] Cookies are working (check browser DevTools → Application → Cookies)

## After Making Changes

1. **Redeploy your services** in Coolify
2. **Clear browser cache** and cookies
3. **Test the URLs** - they should all be HTTPS
4. **Check browser console** for any mixed content warnings

