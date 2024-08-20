const bonusInfo = {
  elements: [
    {
      visibleIf: `{correctAnswers} >= 5`,
      maxWidth: "900px",
      type: "html",
      html: `
      <div>
      <p>
      Congratulations, you have answered <b>{correctAnswers} out of 6 control questions correctly</b> and you will receive a <b>bonus of 5€ within the next days</b>.
      </p>
      </br>
      <p>
      Please click <i>Complete</i>.
      </p>
      </div>
  `,
    },
    {
      visibleIf: `{correctAnswers} < 5`,
      maxWidth: "900px",
      type: "html",
      html: `
      <div>
      <p>
      Unfortunately, you have not paid enough attention to the control questions and you will <b>not receive a bonus</b>.
      </p>
      </br>
      <p>
      Please click <i>Complete</i>.
      </p>
      </div>
  `,
    },
  ],
};

export default bonusInfo;
