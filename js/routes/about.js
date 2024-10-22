import { createElement, createButton } from "../utils.js";
import { HEADERS, PROFILE_DATA } from "../mocks.js";

export const createAboutContent = (mainSection, updateNavigationState) => {
  const aboutContentWrapper = createElement("div", {
    id: "home-content-wrapper",
  });
  const infoWrapper = createElement("div", {
    className: "info-wrapper about-me-wrapper",
  });
  const contactMeButton = createButton(
    "img-button",
    "../images/arrow_right_icon.png",
    "Contact me",
    (e) => updateNavigationState(e, "CONTACT")
  );

  HEADERS.aboutMe.forEach((header) => {
    const keyName = header === "My background" ? "myBackground" : "hobbies";
    const div = createElement("div");
    const h2 = createElement("h2", { innerText: header });
    const p = createElement("p", { innerText: PROFILE_DATA.info[keyName] });

    div.append(h2, p);
    infoWrapper.append(div);
  });

  aboutContentWrapper.append(infoWrapper, contactMeButton);
  mainSection.append(aboutContentWrapper);
};
