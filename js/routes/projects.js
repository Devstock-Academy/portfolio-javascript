import {
  createElement,
  createButton,
  clearValidationErrors,
  validateProjectTitle,
  validateTechnologies,
} from "../utils.js";
import { PROFILE_DATA, PROJECT_FORM_DATA } from "../mocks.js";

const body = document.querySelector("body");
const appWrapper = document.getElementById("app-wrapper");
const mainSection = document.querySelector("main");

export const createProjectsContent = () => {
  const buttonWrapper = createElement("div", { className: "button-wrapper" });
  const projectSectionWrapper = createElement("div", {
    className: "project-section-wrapper",
  });
  const carouselWrapper = createElement("div", {
    className: "carousel-wrapper",
  });
  const addProjectButton = createButton(
    "img-button",
    "../images/plus_icon.png",
    "Add project",
    toggleProjectModal
  );
  if (PROFILE_DATA.projects.length === 0) {
    const h2 = createElement("h2", {
      innerText: "There are no projects to display",
    });
    carouselWrapper.append(h2);
  } else {
    PROFILE_DATA.projects.forEach((project) => {
      createProjectCard(project, carouselWrapper, true);
    });
  }

  addProjectButton.addEventListener("click", toggleProjectModal);

  buttonWrapper.append(addProjectButton);
  projectSectionWrapper.append(carouselWrapper);
  mainSection.append(buttonWrapper, projectSectionWrapper);
};

export const createProjectCard = (
  { title, technologies },
  wrapper,
  isProjectRoute
) => {
  const cardWrapper = createElement("div", { className: "card-wrapper" });
  const projectName = createElement("span", { innerText: title });
  const technologiesList = createElement("ul");

  technologies.forEach((technology) => {
    const technologyListElement = createElement("li", {
      innerText: technology.toUpperCase(),
    });
    technologiesList.append(technologyListElement);
  });

  if (isProjectRoute) {
    const removeButton = createButton(
      "",
      "../images/remove_icon.png",
      "",
      (e) => removeProject(e)
    );
    cardWrapper.append(removeButton);
  }
  cardWrapper.append(projectName, technologiesList);
  wrapper.append(cardWrapper);
};

const toggleProjectModal = () => {
  const formWrapper = document.querySelector("#add-project-form-wrapper");

  if (formWrapper) {
    formWrapper.parentNode.removeChild(formWrapper);
    appWrapper.style.filter = "";
    body.style.overflow = "auto";
    return;
  }

  createAddProjectForm();
};

const removeProject = (e) => {
  e.stopPropagation();

  const mainSection = document.querySelector("main");
  const cardWrapper = e.currentTarget.closest(".card-wrapper");
  const projectTitle = cardWrapper
    .querySelector("span")
    .innerText.toLowerCase();

  PROFILE_DATA.projects = PROFILE_DATA.projects.filter(
    ({ title }) => title.toLowerCase() !== projectTitle
  );
  mainSection.innerHTML = "";
  createProjectsContent(mainSection);
};

const createAddProjectForm = () => {
  const body = document.querySelector("body");
  const appWrapper = document.getElementById("app-wrapper");
  const formWrapper = createElement("div", { id: "add-project-form-wrapper" });
  const addProjectButton = createButton(
    "img-button",
    "../images/plus_icon.png",
    "Add project"
  );
  const form = createElement("form", { id: "add-project-form" });
  const closeIcon = createElement("img", {
    src: "../images/close_icon.png",
    alt: "close icon",
  });

  appWrapper.style.filter = "blur(10px)";
  body.style.overflow = "hidden";

  PROJECT_FORM_DATA.forEach(({ inputName, placeholder, id }) => {
    const inputWrapper = createElement("div", { className: "input-wrapper" });
    const inputLabel = createElement("label", {
      htmlFor: id,
      innerText: inputName,
    });
    const input = createElement("input", {
      id,
      name: inputName.toLowerCase(),
      placeholder,
    });

    inputWrapper.append(inputLabel, input);
    form.append(inputWrapper);
  });

  closeIcon.addEventListener("click", toggleProjectModal);
  form.addEventListener("submit", handleFormSubmit);

  body.append(formWrapper);
  form.append(addProjectButton, closeIcon);
  formWrapper.append(form);
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  clearValidationErrors();

  const form = e.target;
  const formData = new FormData(form);
  const fieldNamesWithValues = Array.from(formData.entries());
  const inputsWrappers = document.querySelectorAll(".input-wrapper");
  const projectObject = {};

  let correctFields = 0;

  fieldNamesWithValues.forEach(([name, value]) => {
    if (name === "project title") {
      const isValid = validateProjectTitle(
        value,
        inputsWrappers[0],
        projectObject
      );
      if (isValid) correctFields++;
    }

    if (name === "technologies") {
      const isValid = validateTechnologies(
        value,
        inputsWrappers[1],
        projectObject
      );
      if (isValid) correctFields++;
    }
  });

  if (correctFields === fieldNamesWithValues.length) {
    PROFILE_DATA.projects.push(projectObject);
    form.reset();
    mainSection.innerHTML = "";
    createProjectsContent();
  }
};
