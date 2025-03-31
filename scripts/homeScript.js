class Carousel {
	constructor(container, items, prefix) {
		this.carouselContainer = container;
		this.carouselItems = [...items];
		this.currentIndex = 0;
		this.carouselPrefix = prefix;
	}

	updateCarousel() {
		this.carouselItems.forEach((item, index) => {
			item.classList.remove(`${this.carouselPrefix}-item-1`, `${this.carouselPrefix}-item-2`, `${this.carouselPrefix}-item-3`, `${this.carouselPrefix}-item-4`, `${this.carouselPrefix}-item-5`);

			item.classList.add(`${this.carouselPrefix}-item-${index + 1}`);
		});
	}

	navigate(direction) {
		if (direction === "previous") {
			this.carouselItems.unshift(this.carouselItems.pop());
		} else {
			this.carouselItems.push(this.carouselItems.shift());
		}
		this.updateCarousel();
	}

	initializeControls() {
		const prevButton = document.querySelector(`.${this.carouselPrefix}-controll-previous`);
		const nextButton = document.querySelector(`.${this.carouselPrefix}-controll-next`);

		prevButton.addEventListener("click", (e) => {
			e.preventDefault();
			this.navigate("previous");
		});

		nextButton.addEventListener("click", (e) => {
			e.preventDefault();
			this.navigate("next");
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const mapContainer = document.querySelector(".carousel-map-container");
	const mapItems = document.querySelectorAll(".carousel-map-item");
	const carouselMap = new Carousel(mapContainer, mapItems, "carousel-map");
	carouselMap.initializeControls();

	const agentContainer = document.querySelector(".carousel-agent-container");
	const agentItems = document.querySelectorAll(".carousel-agent-item");
	const carouselAgents = new Carousel(agentContainer, agentItems, "carousel-agent");
	carouselAgents.initializeControls();
});
