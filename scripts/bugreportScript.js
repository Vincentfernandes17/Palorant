document.addEventListener("DOMContentLoaded", function () {
	// Modal elements
	const modal = document.getElementById("successModal");
	const closeModal = document.querySelector(".close-modal");
	let timeoutId;

	// Modal functions
	function showModal() {
		modal.style.display = "block";
		timeoutId = setTimeout(() => {
			modal.style.display = "none";
		}, 5000);
	}

	closeModal.onclick = function () {
		modal.style.display = "none";
		clearTimeout(timeoutId);
	};

	window.onclick = function (event) {
		if (event.target === modal) {
			modal.style.display = "none";
			clearTimeout(timeoutId);
		}
	};

	// Form elements and validation
	const form = document.getElementById("reportBugForm");
	const usernameInput = document.getElementById("inputUsername");
	const emailInput = document.getElementById("inputEmail");
	const serverInput = document.getElementById("inputServer");
	const descriptionInput = document.getElementById("inputDescription");
	const checkboxInput = document.getElementById("inputCheck");

	// Validation functions
	function validateUsername(username) {
		const errors = [];
		if (username === "") {
			errors.push("Username is required!");
			return errors;
		}
		if (username.length < 3 || username.length > 20) errors.push("Username must be 3-20 characters");
		if (username.includes(" ")) errors.push("Username cannot contain spaces");
		return errors;
	}

	function validateEmail(email) {
		const errors = [];
		if (email === "") {
			errors.push("Email is required!");
			return errors;
		}
		const atIndex = email.indexOf("@");
		if (atIndex === -1 || atIndex === 0) {
			errors.push("Invalid email format");
		} else {
			const domain = email.slice(atIndex + 1);
			if (!domain.endsWith(".com")) errors.push("Email must end with .com");
			if (email.includes(" ")) errors.push("Email cannot contain spaces");
		}
		return errors;
	}

	function validateServer(server) {
		const errors = [];
		if (server === "") {
			errors.push("Server is required!");
			return errors;
		}
		const parts = server.split("-");
		if (parts.length !== 2 || parts[0].length !== 2 || isNaN(parts[1]) || parts[1].length === 0) {
			errors.push("Server format: Region-Number (e.g., NA-1)");
		}
		return errors;
	}

	function validateDescription(description) {
		const errors = [];
		if (description === "") {
			errors.push("Description is required!");
			return errors;
		}
		if (description.length < 20 || description.length > 500) {
			errors.push("Description must be 20-500 characters");
		}
		return errors;
	}

	function validateCheckbox(checked) {
		return checked ? [] : ["You must agree to receive updates!"];
	}

	function showError(input, messages) {
		let errorElement = input.parentNode.nextElementSibling;
		if (!errorElement || !errorElement.classList.contains("error-message")) {
			errorElement = document.createElement("div");
			errorElement.className = "error-message";
			input.parentNode.parentNode.insertBefore(errorElement, input.parentNode.nextSibling);
		}
		errorElement.textContent = messages.join(", ");
	}

	function clearErrorsFor(input) {
		const errorElement = input.parentNode.nextElementSibling;
		if (errorElement && errorElement.classList.contains("error-message")) {
			errorElement.remove();
		}
	}

	function clearAllErrors() {
		document.querySelectorAll(".error-message").forEach((error) => error.remove());
	}

	usernameInput.addEventListener("input", () => {
		clearErrorsFor(usernameInput);
		const errors = validateUsername(usernameInput.value);
		if (errors.length > 0) showError(usernameInput, errors);
	});

	emailInput.addEventListener("input", () => {
		clearErrorsFor(emailInput);
		const errors = validateEmail(emailInput.value);
		if (errors.length > 0) showError(emailInput, errors);
	});

	serverInput.addEventListener("input", () => {
		clearErrorsFor(serverInput);
		const errors = validateServer(serverInput.value);
		if (errors.length > 0) showError(serverInput, errors);
	});

	descriptionInput.addEventListener("input", () => {
		clearErrorsFor(descriptionInput);
		const errors = validateDescription(descriptionInput.value);
		if (errors.length > 0) showError(descriptionInput, errors);
	});

	checkboxInput.addEventListener("change", () => {
		const errorElement = document.querySelector(".checkbox-container ~ .error-message");
		const errors = validateCheckbox(checkboxInput.checked);

		if (errors.length > 0) {
			if (!errorElement) {
				const newError = document.createElement("div");
				newError.className = "error-message";
				checkboxInput.parentNode.insertAdjacentElement("afterend", newError);
			}
			errorElement.textContent = errors.join(", ");
		} else if (errorElement) {
			errorElement.remove();
		}
	});

	form.addEventListener("submit", function (e) {
		e.preventDefault();
		clearAllErrors();

		const errors = [
			...validateUsername(usernameInput.value).map((msg) => ({ field: usernameInput, msg })),
			...validateEmail(emailInput.value).map((msg) => ({ field: emailInput, msg })),
			...validateServer(serverInput.value).map((msg) => ({ field: serverInput, msg })),
			...validateDescription(descriptionInput.value).map((msg) => ({ field: descriptionInput, msg })),
			...validateCheckbox(checkboxInput.checked).map((msg) => ({ field: checkboxInput, msg })),
		];

		if (errors.length > 0) {
			errors.forEach((error) => showError(error.field, [error.msg]));
			errors[0].field.focus();
			// console.log("Erorr detected!");
		} else {
			form.reset();
			showModal();
			// console.log("submitted")
			document.querySelectorAll(".input-effect").forEach((input) => {
				input.classList.remove("has-content");
			});
		}
	});

	const allInputs = [usernameInput, emailInput, serverInput, descriptionInput, checkboxInput];
	allInputs.forEach((input) => {
		input.addEventListener("input", function () {
			if (this.type !== "checkbox" && this.value.trim() !== "") {
				this.classList.add("has-content");
			} else {
				this.classList.remove("has-content");
			}
		});
	});
});
