const bonusInfo = {
  //Not updated for visualization survey yet.
  elements: [
    {
      visibleIf: `{correctAnswers} >= 5`,
      maxWidth: "900px",
      type: "html",
      html: `
      <div>
      <p>
      Herzlichen Glückwunsch, Sie haben mindestens <b>10/15 Nachrichten</b> richtig bewertet und erhalten in den nächsten Tagen <b>einen Bonus von 3€</b>.
      </p>
      </br>
      <p>
      Bitte klicken Sie auf <i>Vollständig</i>.
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
      Leider haben Sie mindestens <b>10/15 Nachrichten</b> nicht richtig bewertet und erhalten <b>keinen Bonus</b>.
      </p>
      </br>
      <p>
      Bitte klicken Sie auf <i>Vollständig</i>.
      </p>
      </div>
  `,
    },
  ],
};

export default bonusInfo;
