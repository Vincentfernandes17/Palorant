document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("reportBugForm");

	const usernameInput = document.getElementById("inputUsername");
	const emailInput = document.getElementById("inputEmail");
	const serverInput = document.getElementById("inputServer");
	const descriptionInput = document.getElementById("inputDescription");
	const checkboxInput = document.getElementById("inputCheck");

	function showError(input, message) {
		const errorElement = document.createElement("div");
		errorElement.className = "error-message";
		errorElement.textContent = message;
		input.parentNode.insertAdjacentElement("afterend", errorElement);
	}

	function clearErrors() {
		document.querySelectorAll(".error-message").forEach((error) => error.remove());
	}

	form.addEventListener("submit", function (e) {
		e.preventDefault();
		clearErrors();
		let valid = true;

		const username = usernameInput.value;
		const email = emailInput.value;
		const server = serverInput.value;
		const description = descriptionInput.value;
		const checked = checkboxInput.checked;

		const errors = [];

		if (username === "") {
			errors.push({ field: usernameInput, msg: "Username is required!" });
			valid = false;
		} else {
			if (username.length < 3 || username.length > 20) {
				errors.push({ field: usernameInput, msg: "Username must be 3-20 characters" });
				valid = false;
			}
			if (username.includes(" ")) {
				errors.push({ field: usernameInput, msg: "Username cannot contain spaces" });
				valid = false;
			}
		}
		if (email === "") {
			errors.push({ field: emailInput, msg: "Email is required!" });
			valid = false;
		} else {
			const atIndex = email.indexOf("@");
			if (atIndex === -1 || atIndex === 0) {
				errors.push({ field: emailInput, msg: "Invalid email format" });
				valid = false;
			} else {
				const domain = email.slice(atIndex + 1);
				if (!domain.endsWith(".com")) {
					errors.push({ field: emailInput, msg: "Email must end with .com" });
					valid = false;
				}
				if (email.includes(" ")) {
					errors.push({ field: emailInput, msg: "Email cannot contain spaces" });
					valid = false;
				}
			}
		}
		if (server === "") {
			errors.push({ field: serverInput, msg: "Server is required!" });
			valid = false;
		} else {
			const parts = server.split("-");
			if (parts.length !== 2 || parts[0].length !== 2 || isNaN(parts[1]) || parts[1].length === 0) {
				errors.push({ field: serverInput, msg: "Server format: Region-Number (e.g., NA-1)" });
				valid = false;
			}
		}
		if (description === "") {
			errors.push({ field: descriptionInput, msg: "Description is required!" });
			valid = false;
		} else {
			if (description.length < 20 || description.length > 500) {
				errors.push({ field: descriptionInput, msg: "Description must be 20-500 characters" });
				valid = false;
			}
		}

		if (checked === false) {
			errors.push({ field: checkboxInput, msg: "You must agree to receive updates!" });
			valid = false;
		}

		if (valid === false) {
			errors.forEach((error) => showError(error.field, error.msg));
			errors[0].field.focus();
		} else {
			// console.log("submitted");
			form.reset();
			alert("Thank you for your bug report!");

			document.querySelectorAll(".input-effect").forEach((input) => {
				input.classList.remove("has-content");
			});
		}
	});

	const allInputs = [usernameInput, emailInput, serverInput, descriptionInput, checkboxInput];
	allInputs.forEach((input) => {
		input.addEventListener("input", () => {
			if (input.type !== "checkbox") clearErrors();
		});
	});

	document.querySelectorAll(".input-effect").forEach((input) => {
		input.addEventListener("input", function () {
			if (this.value.trim() !== "") {
				this.classList.add("has-content");
			} else {
				this.classList.remove("has-content");
			}
		});
	});
});
