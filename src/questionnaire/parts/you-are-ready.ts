const youAreReady = {
  name: "you-are-ready",
  elements: [
    {
      maxWidth: "900px",
      type: "html",
      html: `
    <b>Sie sind jetzt bereit!</b>
    <p>
    Sie haben eine Einführung in die bevorstehende Aufgabe zur Bewertung der Glaubwürdigkeit erhalten. Bitte gehen Sie zum nächsten Teil über, lesen Sie die Nachrichten aufmerksam durch und bewerten Sie den Wahrheitsgehalt vor und nach dem Betrachten der Visualisierungen der politischen Standpunkte. Falls die Aufgabe nicht klar ist, klicken Sie bitte auf Zurück, um die Aufgabenbeschreibung noch einmal zu sehen.
    </p>
  `,
    },
    {
      title:
        "Ich verstehe alle Bestandteile der anstehenden Aufgabe und möchte mit der Glaubwürdigkeitsbewertung von Nachrichten beginnen.",
      type: "boolean",
      renderAs: "radio",
      valueTrue: "Ja",
      valueFalse: "Nein",
      isRequired: true,
      name: "understand-task",
      hideNumber: true,
      maxWidth: "900px",
    },
  ],
};

export default youAreReady;
