document.addEventListener("DOMContentLoaded", function () {
	const roleImages = document.querySelectorAll(".role-img");
	const roleDescriptions = document.querySelectorAll(".role-description");
	const roleAgents = document.querySelectorAll(".agent-role-img");

	roleImages.forEach((img) => {
		img.addEventListener("click", function () {
			roleImages.forEach((el) => el.classList.remove("active"));
			roleDescriptions.forEach((desc) => desc.classList.remove("active"));
			roleAgents.forEach((img) => img.classList.remove("active"));

			this.classList.add("active");

			const classes = this.classList;
			let roleClass = "";
			let agentClass = "";
			classes.forEach((e) => {
				if (e.startsWith("img-")) {
					roleClass = e.replace("img-", "role-description-");
					agentClass = e.replace("img-", "agent-");
				}
			});
			const descElement = document.querySelector(`.${roleClass}`);
			if (descElement) {
				descElement.classList.add("active");
			}
			const agentElement = document.querySelector(`.${agentClass}`);
			if (agentElement) {
				agentElement.classList.add("active");
			}
		});
	});
});
