export const createElement = (type, attributes) => {
  const element = document.createElement(type);
  if (attributes) {
    for (const key in attributes) {
      element[key] = attributes[key];
    }
  }
  return element;
};

export const createButton = (buttonClass, imgSrc, text, clickHandler) => {
  const button = createElement("button", { className: buttonClass });

  if (imgSrc) {
    const img = createElement("img", { src: imgSrc });
    button.append(img);
  }
  if (text) {
    const span = createElement("span", { innerText: text });
    button.append(span);
  }
  if (clickHandler) {
    button.addEventListener("click", clickHandler);
  }

  return button;
};

export const clearValidationErrors = () => {
  const errorMessages = document.querySelectorAll(".validation-error-message");
  const elementsWithInputError = document.querySelectorAll(".input-error");

  errorMessages.forEach((message) => {
    message.parentNode.removeChild(message);
  });

  elementsWithInputError.forEach((element) => {
    element.classList.remove("input-error");
  });
};

export const validateEmail = (value, wrapper, messageObject) => {
  const emailRegexpValidation =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (emailRegexpValidation.test(value)) {
    messageObject.email = value;
    return true;
  }

  displayValidationError(wrapper, "Please enter a valid email address");
};

export const validateTechnologies = (value, wrapper, projectObject) => {
  if (value.length === 0) {
    const errorMessage = "Please add some technologies";

    displayValidationError(wrapper, errorMessage);
  } else {
    const technologiesArray = value.trim().split(",");
    projectObject.technologies = technologiesArray;
    return true;
  }
};

export const validateMessage = (value, wrapper, messageObject) => {
  let errorMessage = "";

  if (value.length === 0) {
    errorMessage = "The message cannot be empty";
  } else if (value.length > 100) {
    errorMessage = "The message must not exceed 100 characters.";
  } else {
    messageObject.message = value;
    return true;
  }

  displayValidationError(wrapper, errorMessage);
};

export const validateName = (value, wrapper, messageObject) => {
  let errorMessage = "";

  if (value.length < 3) {
    errorMessage = "The name must be at least 3 characters long.";
  } else if (value.length > 20) {
    errorMessage = "The name must not exceed 20 characters.";
  } else {
    messageObject.name = value;
    return true;
  }

  displayValidationError(wrapper, errorMessage);
};

export const validateProjectTitle = (value, wrapper, projectObject) => {
  let errorMessage = "";

  if (value.length < 3) {
    errorMessage = "The title must be at least 3 characters long";
  } else if (value.length > 20) {
    errorMessage = "The title must not exceed 30 characters.";
  } else {
    projectObject.title = `${value[0].toUpperCase()}${value
      .slice(1)
      .toLowerCase()}`;
    return true;
  }

  displayValidationError(wrapper, errorMessage);
};

const displayValidationError = (wrapper, errorMessage) => {
  const input = wrapper.children[1];
  const span = createElement("span", {
    className: "validation-error-message",
    innerText: errorMessage,
  });

  input.className = "input-error";
  wrapper.append(span);
};
