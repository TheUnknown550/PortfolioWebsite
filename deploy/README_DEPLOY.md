Deployment guide for mattcosh.com and mcxstudios24.com

Overview
- These instructions redeploy static builds behind Nginx with Cloudflare as proxy.
- Keeps your Game API on http://45.154.24.169:8080 untouched.

Prereqs on the server
- Nginx installed and enabled.
- rsync and ssh access from your workstation.
- TLS via Certbot (Let’s Encrypt) or Cloudflare Origin Certs.

Step 1 — Build locally
- Run on your workstation in repo root:
  - npm ci
  - npm run build

Step 2 — Upload static files
- Use the provided deploy script:
  - For mattcosh.com
    - HOST=YOUR_SERVER_IP USER=YOUR_USER DEST=/var/www/mattcosh.com ./deploy/deploy.sh
  - For mcxstudios24.com (replace DIST path/content as needed)
    - HOST=YOUR_SERVER_IP USER=YOUR_USER DEST=/var/www/mcxstudios24.com DIST=dist ./deploy/deploy.sh

Step 3 — Nginx server blocks
- Copy templates to the server and enable:
  - sudo mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled
  - sudo tee /etc/nginx/sites-available/mattcosh.com < deploy/nginx/mattcosh.com.conf
  - sudo tee /etc/nginx/sites-available/mcxstudios24.com < deploy/nginx/mcxstudios24.com.conf
  - sudo ln -sf /etc/nginx/sites-available/mattcosh.com /etc/nginx/sites-enabled/
  - sudo ln -sf /etc/nginx/sites-available/mcxstudios24.com /etc/nginx/sites-enabled/
  - sudo nginx -t && sudo systemctl reload nginx

Step 4 — TLS certificates
- Let’s Encrypt (recommended):
  - Temporarily set DNS (in Cloudflare) to DNS only (gray cloud) for both domains.
  - sudo certbot --nginx -d mattcosh.com -d www.mattcosh.com
  - sudo certbot --nginx -d mcxstudios24.com -d www.mcxstudios24.com
  - Re-enable proxy (orange cloud). Set Cloudflare SSL Mode: Full (strict).

Cloudflare DNS sanity
- Apex A records for both domains → your server IPv4 only (remove AAAA unless you serve IPv6 on 443).
- www CNAME → apex for each domain. Proxy ON.
- Do NOT point apex to the API port. API remains on :8080 or a subdomain.

Troubleshooting 522
- Ensure Nginx is listening on 80/443: sudo ss -tulpen | grep -E ':80|:443'
- Check Nginx config: sudo nginx -t; sudo nginx -T | grep server_name
- Origin reachability: curl -I http://YOUR_IP -H 'Host: mattcosh.com'
- Firewalls: sudo ufw allow 80,443/tcp

