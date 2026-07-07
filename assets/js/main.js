document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("table").forEach(function (table) {
    table.classList.add("table", "table-striped", "table-bordered");
  });
});

document.querySelectorAll('a[href="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
});

(function () {
  var initialized = false;

  function initArticleSearch() {
    if (initialized) {
      return;
    }

    var searchInput = document.getElementById("articleSearch");
    var emptyState = document.getElementById("articleSearchEmpty");
    var articleItems = Array.prototype.slice.call(
      document.querySelectorAll(".article-search-item")
    );

    if (!searchInput || !emptyState || articleItems.length === 0) {
      return;
    }

    initialized = true;

    function filterArticles() {
      var query = (searchInput.value || "").toLowerCase().trim();
      var visibleCount = 0;

      articleItems.forEach(function (item) {
        var titleText = (item.getAttribute("data-title") || "").toLowerCase();
        var descriptionText = (item.getAttribute("data-description") || "").toLowerCase();
        var searchableText = (titleText + " " + descriptionText).trim();
        var hasQuery = query.length > 0;
        var isVisible = !hasQuery || searchableText.indexOf(query) !== -1;

        item.classList.toggle("article-search-hidden", !isVisible);

        if (isVisible) {
          visibleCount += 1;
        }
      });

      emptyState.style.display = query.length > 0 && visibleCount === 0 ? "block" : "none";
      emptyState.textContent = "No articles match your search.";
    }

    searchInput.addEventListener("input", filterArticles);
    searchInput.addEventListener("keyup", filterArticles);
    filterArticles();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initArticleSearch);
  } else {
    initArticleSearch();
  }

  window.addEventListener("pageshow", initArticleSearch);
})();