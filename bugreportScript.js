// document.addEventListener("DOMContentLoaded", function () {
// 	const bugReportForm = document.getElementById("reportBugForm");

// 	const inputUsername = document.getElementById("inputUsername");
// 	const inputEmail = document.getElementById("inputEmail");
// 	const inputServer = document.getElementById("inputServer");
// 	const inputDescription = document.getElementById("inputDescription");
// 	const inputCheckBox = document.getElementById("inputCheck");

// 	bugReportForm.addEventListener("submit", function (e) {
// 		e.preventDefault();

// 		let valid = true;

// 		const username = inputUsername.value;
// 		const email = inputEmail.value;
// 		const server = inputServer.value;
// 		const description = inputDescription.value;
// 		const checkBox = inputCheckBox.value;

// 		if (username == "") {
// 			valid = false;
// 		} else {
// 			if (username.length < 3 || username.length > 20) {
// 				valid = false;
// 			}
// 			if (username.includes(" ")) {
// 				valid = false;
// 			}
// 		}
// 		if (email == "") {
// 			valid = false;
// 		} else {
// 			let indexAt = email.indexOf("@");
// 			if (indexAt == 0 || indexAt == -1) {
// 				valid = false;
// 			}
// 			if (!email.endsWith(".com")) {
// 				valid = false;
// 			}
// 		}
// 		if (server == "") {
// 			valid = false;
// 		} else {
// 			let separator = server.split("-");
// 			if (separator.length != 2 || separator[0].length != 2 || isNaN(separator[1])) {
// 				valid = false;
// 			}
// 		}
// 		if (description == "") {
// 			valid = false;
// 		} else {
// 			if (description.length < 20 || description.length > 300) {
// 				valid = false;
// 			}
// 		}
// 		if (checkBox == false) {
// 			valid = false;
// 		}

// 		if (valid) {
// 		} else {
// 		}
// 	});

// 	document.querySelectorAll(".input-effect").forEach((input) => {
// 		input.addEventListener("input", function () {
// 			if (this.value.trim() !== "") {
// 				this.classList.add("has-content");
// 			} else {
// 				this.classList.remove("has-content");
// 			}
// 		});
// 	});
// });

document.addEventListener("DOMContentLoaded", function () {
	// Get form element
	const form = document.getElementById("reportBugForm");

	// Get input elements using individual variables
	const usernameInput = document.getElementById("inputUsername");
	const emailInput = document.getElementById("inputEmail");
	const serverInput = document.getElementById("inputServer");
	const descriptionInput = document.getElementById("inputDescription");
	const checkboxInput = document.getElementById("inputCheck");

	// Error display function
	function showError(input, message) {
		const errorElement = document.createElement("div");
		errorElement.className = "error-message";
		errorElement.textContent = message;
		input.parentNode.insertAdjacentElement("afterend", errorElement);
	}

	// Clear existing errors
	function clearErrors() {
		document.querySelectorAll(".error-message").forEach((error) => error.remove());
	}

	form.addEventListener("submit", function (e) {
		e.preventDefault();
		clearErrors();
		let isValid = true;

		// Get trimmed values from inputs
		const username = usernameInput.value;
		const email = emailInput.value;
		const server = serverInput.value;
		const description = descriptionInput.value;
		const isChecked = checkboxInput.checked;

		// Store validation errors
		const errors = [];

		// Validation checks
		// 1. Required fields
		if (!username) {
			errors.push({ field: usernameInput, msg: "Username is required!" });
			isValid = false;
		}
		if (!email) {
			errors.push({ field: emailInput, msg: "Email is required!" });
			isValid = false;
		}
		if (!server) {
			errors.push({ field: serverInput, msg: "Server is required!" });
			isValid = false;
		}
		if (!description) {
			errors.push({ field: descriptionInput, msg: "Description is required!" });
			isValid = false;
		}

		// 2. Username validation
		if (username) {
			if (username.length < 3 || username.length > 20) {
				errors.push({ field: usernameInput, msg: "Username must be 3-20 characters" });
				isValid = false;
			}
			if (username.includes(" ")) {
				errors.push({ field: usernameInput, msg: "Username cannot contain spaces" });
				isValid = false;
			}
		}

		// 3. Email validation
		if (email) {
			const atIndex = email.indexOf("@");
			if (atIndex === -1 || atIndex === 0) {
				errors.push({ field: emailInput, msg: "Invalid email format" });
				isValid = false;
			} else {
				const domain = email.slice(atIndex + 1);
				if (!domain.endsWith(".com")) {
					errors.push({ field: emailInput, msg: "Email must end with .com" });
					isValid = false;
				}
				if (email.includes(" ")) {
					errors.push({ field: emailInput, msg: "Email cannot contain spaces" });
					isValid = false;
				}
			}
		}

		// 4. Server validation
		if (server) {
			const parts = server.split("-");
			if (parts.length !== 2 || parts[0].length !== 2 || isNaN(parts[1]) || parts[1].length === 0) {
				errors.push({ field: serverInput, msg: "Server format: Region-Number (e.g., NA-1)" });
				isValid = false;
			}
		}

		// 5. Description validation
		if (description) {
			if (description.length < 20 || description.length > 500) {
				errors.push({ field: descriptionInput, msg: "Description must be 20-500 characters" });
				isValid = false;
			}
		}

		// Checkbox validation
		if (!isChecked) {
			errors.push({ field: checkboxInput, msg: "You must agree to receive updates!" });
			isValid = false;
		}

		// Handle validation results
		if (!isValid) {
			errors.forEach((error) => showError(error.field, error.msg));
			errors[0].field.focus();
		} else {
			console.log("submitted");
			form.reset();
			alert("Thank you for your bug report!");
		}
	});

	// Clear errors on input
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
