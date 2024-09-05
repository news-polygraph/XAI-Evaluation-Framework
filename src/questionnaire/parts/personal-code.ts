const personalCode = {
  elements: [
    {
      maxWidth: "900px",
      type: "html",
      html: `
        <div>
          <p>
          Bitte folgen Sie den nachstehenden Anweisungen, um Ihren <b>persönlichen Code</b> zu erstellen:
          </p>
          </br>
          <p>
          (Wenn die Angaben nicht bekannt sind, bitte ein X einfügen).
          </p>
          </br>
          <p>
            1. Der erste Buchstabe des Vornamens Ihrer Mutter:
          </p>
          <p>
            2. Der erste Buchstabe des Vornamens deines Vaters:
          </p>
          <p>
            3. Der erste Buchstabe Ihres Geburtsortes:
          </p>
          <p>
            4. Die letzte Ziffer Ihres Geburtsjahrs:
          </p>
          <p>
            5. Die letzte Ziffer Ihres Geburtstages:
          </p>
          </br>
        </div>
    `,
    },
    {
      maxWidth: "900px",
      type: "text",
      name: "personal-code",
      title: "Bitte geben Sie Ihren persönlichen Code ein:",
      hideNumber: true,
      placeHolder: "e.g. MLT93",
    },
  ],
};

export default personalCode;
