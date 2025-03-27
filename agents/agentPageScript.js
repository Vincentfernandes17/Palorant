document.addEventListener("DOMContentLoaded", function () {
	const abilityContainer = document.querySelectorAll(".ability-container");
	const abilityShowcase = document.querySelectorAll(".ability-showcase-wrap");

	abilityContainer.forEach((ability) => {
		ability.addEventListener("click", function () {
			abilityContainer.forEach((e) => e.classList.remove("active"));
			abilityShowcase.forEach((e) => e.classList.remove("active"));

			this.classList.add("active");

			const classes = this.classList;
			let showcase = "";
			classes.forEach((e) => {
				if (e.endsWith("-ability")) {
					showcase = e.replace("-ability", "-showcase");
					// console.log(showcase);
				}
			});
			const showcaseElement = document.querySelector(`.${showcase}`);
			if (showcaseElement) {
				showcaseElement.classList.add("active");
			}
		});
	});
});
