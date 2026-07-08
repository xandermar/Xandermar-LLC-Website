# Production Cache Header Checklist

Use these header policies on your production host/CDN to address Lighthouse cache lifetime findings.

## Static assets (long cache)
Apply to versioned or fingerprint-safe files such as CSS, JS, images, fonts, and SVG:

- Cache-Control: public, max-age=31536000, immutable

Recommended path groups:
- /assets/css/*
- /assets/js/*
- /assets/images/*
- /assets/favicon/*

## HTML pages (short cache)
Apply to page routes and HTML output:

- Cache-Control: public, max-age=0, must-revalidate

## XML/feeds (short cache)
Apply to dynamic-ish generated documents:

- Cache-Control: public, max-age=300, must-revalidate

Recommended path groups:
- /sitemap.xml
- /feed.xml

## Compression
Enable gzip or brotli for:
- text/html
- text/css
- application/javascript
- application/json
- image/svg+xml

## Optional edge settings
- Enable stale-while-revalidate for HTML if your host supports it.
- Purge CDN cache on deploy.
- Keep immutable caching only for assets that change file names when content changes.

## Example (Nginx)

```nginx
location ~* \.(css|js|jpg|jpeg|png|webp|svg|ico|woff|woff2)$ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}

location ~* \.(html)$ {
  add_header Cache-Control "public, max-age=0, must-revalidate";
}

location = /sitemap.xml {
  add_header Cache-Control "public, max-age=300, must-revalidate";
}

location = /feed.xml {
  add_header Cache-Control "public, max-age=300, must-revalidate";
}
```

## Example (Apache)

```apache
<IfModule mod_expires.c>
  ExpiresActive On

  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"

  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType application/xml "access plus 5 minutes"
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\.(css|js|jpg|jpeg|png|webp|svg|ico|woff|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>

  <FilesMatch "\.(html)$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>
```
