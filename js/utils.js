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

export const validateEmail = (value) => {
  const emailRegexpValidation =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (emailRegexpValidation.test(value)) return false;

  const errorMessage = "Please enter a valid email address";
  return errorMessage;
};

export const validateTechnologies = (value) => {
  if (value.length === 0) {
    const errorMessage = "Please add some technologies";
    return errorMessage;
  } else return false;
};

export const validateMessage = (value) => {
  let errorMessage = "";

  if (value.length === 0) {
    errorMessage = "The message cannot be empty";
    return errorMessage;
  } else if (value.length > 100) {
    errorMessage = "The message must not exceed 100 characters.";
    return errorMessage;
  } else return false;
};

export const validateName = (value) => {
  let errorMessage = "";

  if (value.length < 3) {
    errorMessage = "The name must be at least 3 characters long.";
    return errorMessage;
  } else if (value.length > 20) {
    errorMessage = "The name must not exceed 20 characters.";
    return errorMessage;
  } else return false;
};

export const validateProjectTitle = (value) => {
  let errorMessage = "";

  if (value.length < 3) {
    errorMessage = "The title must be at least 3 characters long";
    return errorMessage;
  } else if (value.length > 20) {
    errorMessage = "The title must not exceed 30 characters.";
    return errorMessage;
  } else return false;
};

export const validateForm = (e, isFormSubmitted) => {
  e.preventDefault();

  let correctFields = 0;
  const form = e.target;
  const formData = new FormData(form);
  const fieldNamesWithValues = Array.from(formData.entries());
  const inputsWrappers = document.querySelectorAll(".input-wrapper");

  if (!isFormSubmitted) {
    isFormSubmitted = true;

    inputsWrappers.forEach((wrapper) => {
      const input = wrapper.querySelector("input");
      input.addEventListener("input", handleErrorMessage);
    });
  }

  fieldNamesWithValues.forEach(([name, value], index) => {
    const inputWrapper = inputsWrappers[index];
    const input = inputWrapper.querySelector("input");
    const errorMessage = getErrorMessage(input.name, input.value);

    if (errorMessage) {
      if (!inputWrapper.querySelector(".validation-error-message")) {
        displayValidationError(inputWrapper, errorMessage);
      }
    } else {
      correctFields++;
    }
  });

  const isValid = correctFields === inputsWrappers.length;

  return {
    isValid,
    fieldNamesWithValues,
    form,
  };
};

const handleErrorMessage = (e) => {
  const target = e.target;
  const inputValue = target.value;
  const targetName = target.name;
  const exsistingValidationMessageElement = e.target.nextSibling;
  const errorMessage = getErrorMessage(targetName, inputValue);

  if (!errorMessage && exsistingValidationMessageElement) {
    target.classList.remove("input-error");
    exsistingValidationMessageElement.remove();
  } else if (!exsistingValidationMessageElement && errorMessage) {
    const wrapper = target.parentNode;
    displayValidationError(wrapper, errorMessage);
  }
};

const getErrorMessage = (name, inputValue) => {
  let errorMessage;

  if (name === "name") {
    errorMessage = validateName(inputValue);
  } else if (name === "email") {
    errorMessage = validateEmail(inputValue);
  } else if (name === "project title") {
    errorMessage = validateProjectTitle(inputValue);
  } else if (name === "technologies") {
    errorMessage = validateTechnologies(inputValue);
  } else errorMessage = validateMessage(inputValue);

  return errorMessage;
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
