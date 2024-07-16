import { createHomeContent } from "./routes/home.js";
import { createProjectsContent } from "./routes/projects.js";
import { createAboutContent } from "./routes/about.js";
import { createMessagesContent } from "./routes/messages.js";
import { createContactContent } from "./routes/contact.js";
import { PROFILE_DATA } from "./mocks.js";

const navItems = document.querySelectorAll("nav li");
const navBar = document.querySelector("nav ul");
const mainSection = document.querySelector("main");
const hamburgerMenu = document.getElementById("hamburger-menu-wrapper");

let isHamburgerMenuOpen = false;

const fillMainSection = (clickedElementName) => {
  const normalizedClickedName = clickedElementName.toLowerCase();

  mainSection.innerHTML = "";

  switch (normalizedClickedName) {
    case "home":
      createHomeContent(mainSection);
      break;
    case "projects":
      createProjectsContent();
      break;
    case "about":
      createAboutContent(mainSection, updateNavigationState);
      break;
    case "contact":
      createContactContent(mainSection);
      break;
    case "messages":
      createMessagesContent(mainSection);
      break;
    default:
      createHomeContent(mainSection);
  }
  updateNavigationMotto(normalizedClickedName);
};

const toggleMenu = () => {
  const extendedMenu = document.querySelector("nav ul");
  const hamburgerMenuIcon = document.querySelector(
    "#hamburger-menu-wrapper img"
  );

  isHamburgerMenuOpen = !isHamburgerMenuOpen;
  extendedMenu.style.display = isHamburgerMenuOpen ? "flex" : "none";
  hamburgerMenuIcon.src = isHamburgerMenuOpen
    ? "../images/hamburger_menu_gold.png"
    : "../images/hamburger_menu_white.png";
};

const updateNavigationState = (event, additionalKey) => {
  const clickedElementText = event.target.innerText;
  const activeElements = document.querySelectorAll(".nav-active");

  activeElements.forEach((element) => (element.className = ""));

  navItems.forEach((element) => {
    if (
      element.innerText === clickedElementText ||
      element.innerText === additionalKey
    ) {
      element.className = "nav-active";
    }
  });

  fillMainSection(additionalKey || clickedElementText);
};

const updateNavigationMotto = (normalizedClickedName) => {
  const heroDivs = document.querySelectorAll("#hero-content div");
  const { title, subtitle } = PROFILE_DATA.sections[normalizedClickedName];

  heroDivs.forEach((div, index) => {
    const dataToDisplay = index === 0 ? title : subtitle;
    div.innerText = dataToDisplay;
  });
};

const checkWindowSize = () => {
  const computedStyle = window.getComputedStyle(navBar);
  const isDisplayed = computedStyle.display === "flex";

  if (window.innerWidth > 768 && !isDisplayed) {
    navBar.style.display = "flex";
  } else if (window.innerWidth < 768 && !isHamburgerMenuOpen && isDisplayed) {
    navBar.style.display = "none";
  }
};

window.addEventListener("resize", checkWindowSize);

navItems.forEach((element) => {
  element.addEventListener("click", updateNavigationState);
});

hamburgerMenu.addEventListener("click", toggleMenu);

createHomeContent(mainSection);
