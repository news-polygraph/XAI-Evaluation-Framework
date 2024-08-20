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
          The experiment is conducted by the <b>***</b> to gain some understanding of what information helps humans to detect fake news. In this study you will be asked to read news items and decide if they are fake or true with the help of Political Viewpoint visualizations.
          </p>
          </br>
          <p>
          The Job is divided into two parts:
          </p>
          </br>
          <p>
          <b>1. Qualification job:</b> Please read three news items carefully and accurately rate their truthfulness to get access to the main job. You will also be asked to answer a short questionnaire. (7-9min).
          </p>
          </br>
          <p>
          <b>2. Main job:</b> You will be asked to rate <b>6 news items</b> if they are true or fake (3 €). If you correctly rate each news item as true or fake, you will receive a <b>bonus of 3 € (overall 6 €)</b>. Please read the news items carefully (15-20min).
          </p>
          </br>
          <p>
          <b>Privacy Statement:</b> You will be asked to create your personal code in the beginning based on several questions. In case you want to have your responses deleted, you have 1 month to request deletion by contacting *** (<a href="">***</a>) and sending your personal code.
          </p>
          </br>
          <p style="text-align: center;">
          <b>Thank you for supporting our research and helping to investigate fake news!</b>
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
