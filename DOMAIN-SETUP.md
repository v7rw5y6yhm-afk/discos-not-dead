# Connecting discosnotdead.com

Status: domain confirmed AVAILABLE (checked July 12, 2026). Not yet purchased.

## Step 1 — Buy the domain (you do this part, ~5 minutes)

Any registrar works. Two good options:

- **Porkbun** (simplest checkout, free WHOIS privacy): <https://porkbun.com> —
  search `discosnotdead.com`, add to cart, create account, pay. A `.com` runs
  roughly $11/year.
- **Cloudflare Registrar** (at-cost pricing, ~$10/yr, requires a free Cloudflare
  account first): <https://www.cloudflare.com/products/registrar/>

Skip every upsell (email, hosting, SSL, "premium DNS") — the site is hosted free
on GitHub Pages and HTTPS is free too.

## Step 2 — Add DNS records at the registrar

In the registrar's DNS settings for discosnotdead.com, add exactly these:

| Type  | Host/Name | Value                        |
|-------|-----------|------------------------------|
| A     | @         | 185.199.108.153              |
| A     | @         | 185.199.109.153              |
| A     | @         | 185.199.110.153              |
| A     | @         | 185.199.111.153              |
| CNAME | www       | v7rw5y6yhm-afk.github.io     |

(Those four A records are GitHub Pages' anycast IPs.)

## Step 3 — Tell GitHub Pages about the domain (Claude can run this)

```sh
gh api --method PUT repos/v7rw5y6yhm-afk/discos-not-dead/pages -f cname=discosnotdead.com
```

Then wait for DNS to propagate (minutes to a few hours) and enforce HTTPS:

```sh
gh api --method PUT repos/v7rw5y6yhm-afk/discos-not-dead/pages -F https_enforced=true
```

After that, https://discosnotdead.com serves the site, https://www.discosnotdead.com
redirects to it, and the QR codes in `qr/` go live.

## Current URLs

- Live now: <https://v7rw5y6yhm-afk.github.io/discos-not-dead/>
- After domain: <https://discosnotdead.com>
- Repo: <https://github.com/v7rw5y6yhm-afk/discos-not-dead>

## QR codes (in `qr/`)

- `qr-discosnotdead.png` / `.svg` — points to https://discosnotdead.com (black, print-safe)
- `qr-discosnotdead-purple.png` / `.svg` — same URL, disco-purple
- `qr-github-interim.png` / `.svg` — points to the github.io URL, scannable TODAY

All generated at error-correction level H (survives stickers, crumpled paper,
and mysterious 1979 static).
