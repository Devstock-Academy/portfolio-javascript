import { createElement, validateForm } from "../utils.js";
import { CONTACT_FORM_DATA, PROFILE_DATA } from "../mocks.js";

let isFormSubmitted = false;

export const createContactContent = (mainSection) => {
  const h2 = createElement("h2", {
    innerText: "Contact me",
    id: "contact-me-header",
  });
  const form = createElement("form");
  const buttonWrapper = createElement("div");
  const submitButton = createElement("button", { innerText: "Send message" });
  const inputUserDataWrapper = createElement("div", {
    id: "input-user-data-wrapper",
  });

  CONTACT_FORM_DATA.forEach(({ inputName, placeholder, id }, index) => {
    const inputWrapper = createElement("div", { className: "input-wrapper" });
    const inputLabel = createElement("label", {
      htmlFor: id,
      innerText: inputName,
    });
    const input = createElement("input", {
      id,
      name: inputName.toLowerCase(),
      placeholder,
      autocomplete: "off",
    });

    inputWrapper.append(inputLabel, input);

    if (index < 2) {
      inputUserDataWrapper.append(inputWrapper);
      if (index === 1) {
        form.append(inputUserDataWrapper);
        return;
      }
      return;
    }
    form.append(inputWrapper);
  });

  form.addEventListener("submit", handleFormSubmit);
  buttonWrapper.append(submitButton);
  form.append(buttonWrapper);
  mainSection.append(h2, form);
};

const handleFormSubmit = (e) => {
  const { isValid, fieldNamesWithValues, form } = validateForm(
    e,
    isFormSubmitted
  );

  if (isValid) {
    const messageObject = {};

    fieldNamesWithValues.forEach(([name, value]) => {
      messageObject[name] = value;
    });

    PROFILE_DATA.messages.push(messageObject);
    form.reset();
  }
};
