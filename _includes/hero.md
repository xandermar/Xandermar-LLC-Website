{% assign hero_image_class = 'page-hero-image' %}
{% if page.hero_image_class %}
	{% assign hero_image_class = hero_image_class | append: ' ' | append: page.hero_image_class %}
{% endif %}

{% include responsive-picture.html
	src=page.hero_image
	alt=page.hero_image_alt
	class=hero_image_class
	width=site.hero_defaults.width
	height=site.hero_defaults.height
	loading=site.hero_defaults.loading
	fetchpriority="high"
	decoding=site.hero_defaults.decoding
	widths=site.responsive_image_defaults.widths
	sizes=site.responsive_image_defaults.sizes
%}