import { createElement } from "../utils.js";
import { PROFILE_DATA } from "../mocks.js";

export const createMessagesContent = (mainSection) => {
  PROFILE_DATA.messages.forEach(({ name, email, message }) => {
    const messageWrapper = createElement("div", {
      className: "message-wrapper",
    });
    const nameSpan = createElement("span", { innerText: `Name: ${name}` });
    const emailSpan = createElement("span", { innerText: `Email: ${email}` });
    const messageSpan = createElement("span", {
      innerText: `Message: ${message}`,
    });

    messageWrapper.append(nameSpan, emailSpan, messageSpan);
    mainSection.append(messageWrapper);
  });
};
