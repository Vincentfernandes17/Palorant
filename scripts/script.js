const navbar = document.getElementById("navbar");
const navbarMobile = document.getElementById("nav-mobile");

const media = window.matchMedia("(width < 878px)");

media.addEventListener("change", (e) => updateNavbar(e));

function updateNavbar(e) {
	const mobileDevice = e.matches;
	// console.log(mobileDevice);
	if (mobileDevice) {
		navbar.setAttribute("inert", "");
	} else {
		navbar.removeAttribute("inert");
	}
}

function openSideBar() {
	navbar.classList.add("show");
	navbar.removeAttribute("inert");
}

function closeSideBar() {
	navbar.classList.remove("show");
	navbar.setAttribute("inert", "");
}

let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
	if (window.scrollY === 0) {
		navbar.classList.remove("nav-scrolled");
		navbarMobile.classList.remove("nav-scrolled");
	} else {
		navbar.classList.add("nav-scrolled");
		navbarMobile.classList.add("nav-scrolled");
	}

	lastScrollY = window.scrollY;
});
