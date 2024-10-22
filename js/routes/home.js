import { createElement, createButton } from "../utils.js";
import { HEADERS, PROFILE_DATA } from "../mocks.js";
import { createProjectCard } from "./projects.js";

let currentProjectIndex = 0;

const { skills, info } = PROFILE_DATA;

export const createHomeContent = (mainSection) => {
  const homeContentWrapper = createElement("div", {
    id: "home-content-wrapper",
  });
  const profileImage = createElement("div", { id: "profile-image" });
  const infoWrapper = createElement("div", { className: "info-wrapper" });

  HEADERS.home.forEach((header, index) => {
    const div = createElement("div");
    const h2 = createElement("h2", { innerText: header });
    div.append(h2);

    if (index === 0) {
      const p = createElement("p", {
        innerText: info.introduce,
      });

      div.append(p);
    } else {
      createSkillsSection(div);
    }

    infoWrapper.append(div);
    homeContentWrapper.append(profileImage, infoWrapper);
  });

  mainSection.append(homeContentWrapper);

  createProjectsSection(homeContentWrapper);
};

const createSkillsSection = (targetDiv) => {
  const skillsWrapper = createElement("div", { id: "skills-wrapper" });

  skills.forEach(({ name, experience }) => {
    const skillWrapper = createElement("div", { className: "skill-wrapper" });
    const img = createElement("img", { src: `../images/${name}_icon.png` });
    const descriptionWrapper = createElement("div", {
      className: "description-wrapper",
    });
    const nameSpan = createElement("span", { innerText: name.toUpperCase() });
    const dotsWrapper = createElement("div", { className: "dots-wrapper" });
    const experienceSpan = createElement("span", {
      innerText: `${experience} years`,
      className: "experience-span",
    });

    Array(5)
      .fill()
      .forEach((_, index) => {
        const dot = createElement("div", {
          className: index < experience ? "filled" : "empty",
        });
        dotsWrapper.append(dot);
      });

    descriptionWrapper.append(nameSpan, dotsWrapper, experienceSpan);
    skillWrapper.append(img, descriptionWrapper);
    skillsWrapper.append(skillWrapper);
  });

  targetDiv.append(skillsWrapper);
};

const createProjectsSection = (homeContentWrapper) => {
  const projectsSectionWrapper = createElement("div", {
    id: "projects-section-wrapper",
  });
  const carouselWrapper = createElement("div", {
    className: "carousel-wrapper",
  });
  const projects = PROFILE_DATA.projects;

  if (projects.length > 3) {
    const buttonsWrapper = createElement("div");
    const prevButton = createCarouselButton(
      "../images/arrow_left_icon.png",
      "prev",
      carouselWrapper
    );
    const nextButton = createCarouselButton(
      "../images/arrow_left_icon.png",
      "next",
      carouselWrapper
    );
    buttonsWrapper.append(prevButton, nextButton);
    projectsSectionWrapper.append(carouselWrapper, buttonsWrapper);
  } else {
    projectsSectionWrapper.append(carouselWrapper);
  }

  homeContentWrapper.append(projectsSectionWrapper);

  if (projects.length > 0) {
    const projectsToDisplay = projects.slice(0, 3);
    projectsToDisplay.forEach((project) => {
      createProjectCard(project, carouselWrapper);
    });
  }
};

const createCarouselButton = (imgSrc, direction, carouselWrapper) => {
  const button = createButton("carousel-button", imgSrc, "", () =>
    handleCarouselButton(direction, carouselWrapper)
  );
  return button;
};

const handleCarouselButton = (direction, caruselWrapper) => {
  const numProjects = PROFILE_DATA.projects.length;
  const visibleProjects = [];

  if (direction === "prev") {
    if (currentProjectIndex === 0) {
      currentProjectIndex = numProjects - 1;
    } else {
      currentProjectIndex -= 1;
    }
  } else {
    if (currentProjectIndex === numProjects - 1) {
      currentProjectIndex = 0;
    } else {
      currentProjectIndex += 1;
    }
  }

  for (let i = 0; i < 3; i++) {
    const index = (currentProjectIndex + i) % numProjects;
    visibleProjects.push(PROFILE_DATA.projects[index]);
  }
  caruselWrapper.innerHTML = "";
  visibleProjects.forEach((project) => {
    createProjectCard(project, caruselWrapper);
  });
};
