const youAreReady = {
  name: "you-are-ready",
  elements: [
    {
      maxWidth: "900px",
      type: "html",
      html: `
    <b>You are ready now!</b>
    <p>
    You have been introduced to the upcoming task. Please move on to the next part, read the questions alongside their acompanied information carefully and answer them to the best of your ability while indicating the level of confidence you have in your answers. In some instances, you will have to provide answers before and after seeing the AI-generated explainability features. In case the task is not clear, please click on <b><i>Previous</i></b> to see the task description again.
    </p>
  `,
    },
    {
      title:
        "I understand all components of the upcoming task and would like to start the survey!",
      type: "boolean",
      renderAs: "radio",
      valueTrue: "Yes",
      valueFalse: "No",
      isRequired: true,
      name: "understand-task",
      hideNumber: true,
      maxWidth: "900px",
    },
  ],
};

export default youAreReady;
