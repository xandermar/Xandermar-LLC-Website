#!/usr/bin/env bash
set -euo pipefail

# Generates responsive fallback and WebP variants under each image folder's optimized/ subfolder.
# Example output for /assets/images/ai01.jpg:
# /assets/images/optimized/ai01-768.jpg
# /assets/images/optimized/ai01-768.webp
# /assets/images/optimized/ai01-1200.jpg
# /assets/images/optimized/ai01-1200.webp

WIDTHS="${IMG_WIDTHS:-768 1200 1600}"
WEBP_QUALITY="${WEBP_QUALITY:-82}"

DEFAULT_IMAGES=(
  "assets/splash.jpg"
  "assets/about-header.png"
  "assets/articles.jpg"
  "assets/portfolio.jpg"
  "assets/services.jpg"
  "assets/images/contact.png"
  "assets/images/ai-assistant.png"
  "assets/images/devops.jpg"
  "assets/images/drupal.jpg"
  "assets/images/web-design.jpg"
  "assets/images/signage.jpg"
  "assets/images/youtube.jpg"
  "assets/images/ai01.jpg"
  "assets/images/ai06.jpg"
  "assets/images/ai10.jpg"
  "assets/images/ai16.jpg"
  "assets/images/ai22.jpg"
)

if ! command -v sips >/dev/null 2>&1; then
  echo "Error: sips is required but not found."
  exit 1
fi

if ! command -v cwebp >/dev/null 2>&1; then
  echo "Error: cwebp is required but not found. Install with: brew install webp"
  exit 1
fi

if [[ "$#" -gt 0 ]]; then
  IMAGES=("$@")
else
  IMAGES=("${DEFAULT_IMAGES[@]}")
fi

image_width() {
  sips -g pixelWidth "$1" 2>/dev/null | awk '/pixelWidth:/ {print $2}'
}

image_height() {
  sips -g pixelHeight "$1" 2>/dev/null | awk '/pixelHeight:/ {print $2}'
}

for src in "${IMAGES[@]}"; do
  if [[ ! -f "$src" ]]; then
    echo "Skipping missing file: $src"
    continue
  fi

  dir="$(dirname "$src")"
  filename="$(basename "$src")"
  stem="${filename%.*}"
  ext="${filename##*.}"
  ext_lc="$(echo "$ext" | tr '[:upper:]' '[:lower:]')"

  if [[ "$ext_lc" != "jpg" && "$ext_lc" != "jpeg" && "$ext_lc" != "png" ]]; then
    echo "Skipping unsupported extension: $src"
    continue
  fi

  orig_w="$(image_width "$src")"
  orig_h="$(image_height "$src")"
  if [[ -z "$orig_w" || -z "$orig_h" ]]; then
    echo "Skipping unreadable image: $src"
    continue
  fi

  out_dir="$dir/optimized"
  mkdir -p "$out_dir"

  echo "Optimizing: $src"

  for w in $WIDTHS; do
    fallback_out="$out_dir/${stem}-${w}.${ext_lc}"
    webp_out="$out_dir/${stem}-${w}.webp"
    tmp_out="/tmp/${stem}-${w}.${ext_lc}"
    h=$(( (orig_h * w + orig_w / 2) / orig_w ))

    sips -z "$h" "$w" "$src" --out "$tmp_out" >/dev/null
    mv "$tmp_out" "$fallback_out"
    cwebp -q "$WEBP_QUALITY" "$fallback_out" -o "$webp_out" >/dev/null

    echo "  -> $fallback_out"
    echo "  -> $webp_out"
  done

done

echo "Done."
