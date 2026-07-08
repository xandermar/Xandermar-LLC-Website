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
  var toggleButton = document.querySelector('[data-nav-toggle="collapse"]');
  if (!toggleButton) {
    return;
  }

  var targetSelector = toggleButton.getAttribute("data-nav-target");
  var menu = targetSelector ? document.querySelector(targetSelector) : null;
  if (!menu) {
    return;
  }

  function setExpanded(isExpanded) {
    toggleButton.setAttribute("aria-expanded", isExpanded ? "true" : "false");
  }

  toggleButton.addEventListener("click", function () {
    var willExpand = !menu.classList.contains("show");
    menu.classList.toggle("show", willExpand);
    setExpanded(willExpand);
  });

  menu.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      if (menu.classList.contains("show")) {
        menu.classList.remove("show");
        setExpanded(false);
      }
    });
  });
})();
