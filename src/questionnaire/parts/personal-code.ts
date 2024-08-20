const personalCode = {
  elements: [
    {
      maxWidth: "900px",
      type: "html",
      html: `
        <div>
          <p>
            Please follow the instructions below to create your <b>personal code</b>:
          </p>
          </br>
          <p>
            (If details are not known, please insert an X).
          </p>
          </br>
          <p>
            1. The first letter of your mother's first name:
          </p>
          <p>
            2. The first letter of your father's first name:
          </p>
          <p>
            3. The first letter of your place of birth:
          </p>
          <p>
            4. The last digit of your year of birth:
          </p>
          <p>
            5. The last digit of your day of birth:
          </p>
          </br>
        </div>
    `,
    },
    {
      maxWidth: "900px",
      type: "text",
      name: "personal-code",
      title: "Please enter your personal code:",
      hideNumber: true,
      placeHolder: "e.g. MLT93",
    },
  ],
};

export default personalCode;
