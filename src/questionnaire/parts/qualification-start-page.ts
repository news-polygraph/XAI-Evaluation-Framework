const qualificationStartPage = {
  elements: [
    {
      maxWidth: "900px",
      type: "html",
      html: `
        <div>
          <p style="text-align: center;">Welcome to the <b>"XAI Evaluation"</b> Experiment!</p>
          </br>
          <p>
          The experiment is conducted by the <b>***</b> to gain some understanding on the effects of different AI-Explanation methods on the human decision-making process. In this study you will be asked to read some content and a question about the topic, then proceed to find the correct answer with or without the help of the <b>AI System</b>.
          </p>
          </br>
          <p>
          The Job is divided into two parts:
          </p>
          </br>
          <p>
          <b>1. Qualification job:</b> please read two questions carefully and answer the control questions correctly to get access to the main job.
          </p>
          </br>
          <p>
          <b>2. Main job:</b> You will be asked to answer <b>8 questions</b> provided some relevant information. Please pay attention to the control questions and read the questions carefully.
          </p>
          </br>
          <p style="text-align: center;">
          <b>Thank you for supporting our research and help to investigate the explainability of AI systems!</b>
          </p>
        </div>
    `,
    },
    {
      maxWidth: "900px",
      type: "checkbox",
      name: "confirm",
      title:
        "I have read and understood the information provided above, and I am willing to participate in the study.",
      isRequired: true,
      colCount: 0,
      choices: ["Yes"],
      hideNumber: true,
    },
  ],
};

export default qualificationStartPage;
