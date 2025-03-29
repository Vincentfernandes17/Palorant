document.addEventListener("DOMContentLoaded", function () {
	const slides = document.querySelectorAll(".gallery-item");
	const thumbnails = document.querySelectorAll(".gallery-row-image");
	const prevButton = document.querySelector(".gallery-control-prev");
	const nextButton = document.querySelector(".gallery-control-next");
	let currentSlide = 0;

	slides[currentSlide].classList.add("active");
	thumbnails[currentSlide].classList.add("active");

	function showSlide(n) {
		slides.forEach((e) => e.classList.remove("active"));
		thumbnails.forEach((e) => e.classList.remove("active"));

		currentSlide = (n + slides.length) % slides.length;

		slides[currentSlide].classList.add("active");
		thumbnails[currentSlide].classList.add("active");
	}

	function nextSlide() {
		showSlide(currentSlide + 1);
	}

	function prevSlide() {
		showSlide(currentSlide - 1);
	}

	nextButton.addEventListener("click", nextSlide);
	prevButton.addEventListener("click", prevSlide);

	thumbnails.forEach((thumb, index) => {
		thumb.addEventListener("click", () => showSlide(index));
	});
});
