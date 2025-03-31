document.addEventListener("DOMContentLoaded", function () {
	const button = document.getElementById("showMoreBtn");
	const grid = document.querySelector(".news-grid");

	button.addEventListener("click", function () {
		grid.classList.toggle("show-all");
		button.textContent = grid.classList.contains("show-all") ? "Show Less -" : "Show More +";

		void grid.offsetHeight;
	});
});
