---
layout: default-no-post-list
title: Articles
permalink: /articles
nav_order: 4.1
hero_image: /assets/articles.jpg
hero_image_alt: Articles and Case Studies
---

{% include hero.md %}

<h1>All Articles</h1>

<div class="mb-3">
  <label for="articleSearch" class="form-label fw-semibold">Search Articles</label>
  <input
    type="search"
    id="articleSearch"
    class="form-control"
    placeholder="Start typing to filter articles..."
    aria-label="Search articles"
  >
</div>

<p id="articleSearchEmpty" class="text-muted">No articles match your search.</p>

<ol class="list-group">
  {% for post in site.posts %}
    <li
      class="list-group-item d-flex flex-column flex-lg-row align-items-lg-start article-search-item"
      data-title="{{ post.title | downcase | strip_html | strip_newlines | escape }}"
      data-description="{{ post.post_description | downcase | strip_html | strip_newlines | escape }}"
    >

      <div class="ms-lg-2 me-lg-auto">
        <div class="fw-bold">
          <a href="{{ post.url | relative_url }}">
            {{ post.title }}
          </a>
        </div>

        <p class="card-text">
          <small>
            Posted: {{ post.date | date: "%B %d, %Y" }}
          </small>
        </p>

        <p class="card-text mb-0">
          {{ post.post_description }}
        </p>
      </div>

      {% if post.categories and post.categories.size > 0 %}
        <div class="d-flex flex-wrap flex-lg-nowrap gap-1 mt-3 mt-lg-0 ms-lg-3">
          {% for category in post.categories %}
            {% assign category_slug = category | slugify %}

            <a
              href="{{ '/category/' | append: category_slug | append: '/' | relative_url }}"
              class="badge text-bg-primary rounded-pill text-decoration-none text-nowrap"
            >
              {{ category }}
            </a>
          {% endfor %}
        </div>
      {% endif %}

    </li>
  {% endfor %}
</ol>



<div class="mt-3 mb-3">See <a href="/categories">Post Categories</a></div>
