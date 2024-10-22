export const PROFILE_DATA = {
  firstName: "jan",
  lastName: "kowalski",
  info: {
    introduce:
      "Hello! I'm Jan Kowalski, a person passionate about continuous growth and exploring new paths. My background is diverse, and my approach to life is rooted in acquiring knowledge and achieving goals with full dedication. Feel free to discover more about my professional journey and interests!",
    myBackground:
      "I have a diverse background that enriches both my professional and personal life. I am passionate about continuous development, always striving for excellence in every endeavor. My career path has equipped me with a wide range of skills and knowledge, enabling me to tackle challenges with confidence and creativity.",
    hobbies:
      "In my free time, I enjoy exploring new interests and hobbies. Whether it's engaging in creative projects, staying active in various sports, or continuously learning new things, I find joy in activities that broaden my horizons and enrich my life.",
  },
  skills: [
    { name: "html", experience: 5 },
    { name: "css", experience: 5 },
    { name: "javascript", experience: 3 },
    { name: "git", experience: 3 },
    { name: "figma", experience: 2 },
    { name: "chrome", experience: 3 },
    { name: "vscode", experience: 5 },
    { name: "github", experience: 3 },
  ],
  projects: [
    {
      title: "Calculator",
      technologies: ["html"],
    },
    {
      title: "Non-governmental organization",
      technologies: ["html", "css"],
    },
    {
      title: "Calculator program",
      technologies: ["javascript"],
    },
    {
      title: "Todo list",
      technologies: ["html", "css", "javascript"],
    },
    {
      title: "Arrays and objects manipulator",
      technologies: ["javascript"],
    },
  ],
  messages: [
    {
      name: "Karol",
      email: "karol@gmail.com",
      message:
        "Hello, I've reviewed your impressive portfolio and am interested in discussing a potential collaboration. Please call me at 712-218-123 to talk further",
    },
    {
      name: "Ernest",
      email: "ernest@email.com",
      message: "Hello, Please call me at 351-152-555 to talk further",
    },
    {
      name: "Jan",
      email: "jan@gmail.com",
      message: "Welcome Jan. You created really nice project",
    },
  ],
  sections: {
    home: {
      title: "JAN KOWALSKI",
      subtitle: "WEB-DESIGNER",
    },
    about: {
      title: "MY PROJECTS",
      subtitle: "MADE WITH LOVE",
    },
    projects: {
      title: "ABOUT ME",
      subtitle: "IT’S A-ME, JAN!",
    },
    contact: {
      title: "CONTACT ME",
      subtitle: "SAY HELLO TO ME",
    },
    messages: {
      title: "MESSAGES",
      subtitle: "MESSAGE FROM THE INTERESTED PERSON",
    },
  },
};

export const HEADERS = {
  home: ["About me", "My Skills"],
  aboutMe: ["My background", "My hobbies and interests"],
};

export const CONTACT_FORM_DATA = [
  {
    inputName: "Name",
    placeholder: "Your Name",
    id: "input-name",
  },
  {
    inputName: "Email",
    placeholder: "email@example.com",
    id: "input-email",
  },
  {
    inputName: "Message",
    placeholder: "Hello, my name is ...",
    id: "input-message",
  },
];

export const PROJECT_FORM_DATA = [
  {
    inputName: "Project title",
    placeholder: "Project title",
    id: "input-project-title",
  },
  {
    inputName: "Technologies",
    placeholder: "html, css, javascript",
    id: "input-technologies",
  },
];
