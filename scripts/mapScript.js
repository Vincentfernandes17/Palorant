document.addEventListener("DOMContentLoaded", function () {
	const images = document.querySelectorAll(".bg-image");
	let currentIndex = 0;
	const delayTime = 7500;

	function startSlideshow() {
		images[currentIndex].classList.add("active");

		setInterval(() => {
			images[currentIndex].classList.remove("active");
			currentIndex = (currentIndex + 1) % images.length;
			images[currentIndex].classList.add("active");
		}, delayTime);
	}

	startSlideshow();
});
