---
layout: post
title: "Upgrade from Drupal 10 to Drupal 11"
date: 2025-06-16
categories: [drupal, web-development, programming]
post_description: "This article provides a step-by-step guide and automation script for upgrading a Drupal 10 website to Drupal 11. It covers system requirements, module compatibility checks, composer updates, database updates, and includes a Bash script to streamline the upgrade process."
---

![Image](/assets/images/upgrade-drupal.jpg){: .img-fluid content-image-large }


## Upgrading from **Drupal 10 to Drupal 11** requires several important steps to ensure compatibility and stability. Here's a **step-by-step guide** to help you upgrade smoothly.

---

### <span class="xi-shield-check xi-24 xi-green xi-inline" aria-hidden="true"></span>1. **Backup Your Site**

Before doing anything:

* Backup your codebase
* Backup your database
* Backup your `files/` directory

---

### <span class="xi-shield-check xi-24 xi-green xi-inline" aria-hidden="true"></span>2. **Check System Requirements**

Ensure your environment meets the Drupal 11 requirements:

* **PHP 8.2 or 8.3** (Drupal 11 **requires PHP 8.2+**)
* **Composer 2.4+**
* **MySQL 8.0.17+**, **MariaDB 10.4+**, or **PostgreSQL 12+**

---

### <span class="xi-shield-check xi-24 xi-green xi-inline" aria-hidden="true"></span>3. **Update Contributed Modules and Themes**

Run:

```bash
composer outdated "drupal/*"
```

Then update everything to the latest Drupal 10-compatible versions:

```bash
composer update drupal/core-recommended drupal/core-composer-scaffold drupal/core-project-message drupal/* --with-dependencies
```

Ensure all modules are Drupal 11-ready. Use:

```bash
drush pm:list --status=enabled --type=module --no-core
```

And consult the module pages or issue queues to confirm Drupal 11 compatibility.

---

### <span class="xi-shield-check xi-24 xi-green xi-inline" aria-hidden="true"></span>4. **Check for Deprecated Code**

Use the **Upgrade Status** module:

```bash
composer require 'drupal/upgrade_status:^4.0'
drush en upgrade_status -y
```

Then visit `/admin/reports/upgrade-status` to scan for deprecated APIs used by your site.

Also consider using:

```bash
composer require mglaman/phpstan-drupal
vendor/bin/phpstan analyse
```

---

### <span class="xi-shield-check xi-24 xi-green xi-inline" aria-hidden="true"></span>5. **Update `composer.json` for Drupal 11**

Edit your `composer.json` to allow Drupal 11:

```json
"require": {
  "drupal/core-recommended": "^11",
  "drupal/core-composer-scaffold": "^11",
  "drupal/core-project-message": "^11"
}
```

Or run:

```bash
composer require drupal/core-recommended:^11 drupal/core-composer-scaffold:^11 drupal/core-project-message:^11 --update-with-dependencies
```

---

### <span class="xi-shield-check xi-24 xi-green xi-inline" aria-hidden="true"></span>6. **Run Database Updates**

```bash
drush updb -y
```

---

### <span class="xi-shield-check xi-24 xi-green xi-inline" aria-hidden="true"></span>7. **Export Configuration**

```bash
drush cex -y
```

---

### <span class="xi-shield-check xi-24 xi-green xi-inline" aria-hidden="true"></span>8. **Clear Cache and Rebuild**

```bash
drush cr
```

---

### <span class="xi-shield-check xi-24 xi-green xi-inline" aria-hidden="true"></span>9. **Test Your Site**

* Test all functionality
* Review theme compatibility
* Confirm contributed and custom module behavior

---

### <span class="xi-shield-check xi-24 xi-green xi-inline" aria-hidden="true"></span>10. **Commit & Deploy**

Once tested locally or in staging:

* Commit changes
* Deploy to production carefully

---

### Optional: Use `drupal/core-dev` for Better Dev Tools

```bash
composer require --dev drupal/core-dev:^11
```

## Here’s a **Bash script** to automate most of the Drupal 10 → 11 upgrade process, assuming you're using Composer and Drush in a typical Drupal 10 project.

---

### <span class="xi-gear xi-24 xi-blue xi-inline" aria-hidden="true"></span>`upgrade-to-drupal11.sh`

```bash
#!/bin/bash

set -e

echo "=== [xi-cloud-upload] Backing up current site ==="
NOW=$(date +"%Y%m%d_%H%M%S")
tar czf backup_code_$NOW.tar.gz .
drush sql-dump --ordered-dump --gzip --result-file=db_backup_$NOW.sql.gz

echo "=== [xi-automation] Clearing caches ==="
drush cr

echo "=== [xi-cpu] Updating contrib modules ==="
composer update drupal/* --with-dependencies

echo "=== [xi-target] Checking for deprecated code ==="
composer require --dev mglaman/phpstan-drupal
vendor/bin/phpstan analyse > phpstan-output.txt || true
echo "Check 'phpstan-output.txt' for deprecated code issues."

echo "=== [xi-file-edit] Updating composer.json to allow Drupal 11 ==="
composer require \
  drupal/core-recommended:^11 \
  drupal/core-composer-scaffold:^11 \
  drupal/core-project-message:^11 \
  --update-with-dependencies

echo "=== [xi-cloud-upload] Running database updates ==="
drush updb -y

echo "=== [xi-cloud-upload] Exporting config ==="
drush cex -y

echo "=== [xi-automation] Rebuilding cache ==="
drush cr

echo "=== [xi-shield-check] Drupal 11 upgrade script completed ==="
```

---

### <span class="xi-chart xi-24 xi-blue xi-inline" aria-hidden="true"></span>How to Use

1. Save as `upgrade-to-drupal11.sh`
2. Make executable:

   ```bash
   chmod +x upgrade-to-drupal11.sh
   ```
3. Run it from your Drupal root:

   ```bash
   ./upgrade-to-drupal11.sh
   ```

---

### <span class="xi-lock xi-24 xi-charcoal xi-inline" aria-hidden="true"></span>Notes

* This script **does not verify module compatibility**. You should run `drush pm:list` or use the **Upgrade Status** module manually to confirm.
* Your hosting environment **must support PHP 8.2+**.
