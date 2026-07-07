$(document).ready(function () {
  $("table").addClass("table table-striped table-bordered");
});

document.querySelectorAll('a[href="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
});