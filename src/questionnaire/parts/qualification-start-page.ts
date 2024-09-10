const qualificationStartPage = {
  elements: [
    {
      maxWidth: "900px",
      type: "html",
      html: `
        <div>
          <p style="text-align: center;">Willkommen zum Experiment <b>"Bewertung der politischen Visualisierungn"</b> </p>
          </br>
          <p>
          Ziel dieser Studie ist es, ein Verständnis dafür zu erlangen, welche Informationen Menschen helfen, Fake News zu erkennen. In dieser Studie werden Sie gebeten, Nachrichten zu lesen und zu entscheiden, ob sie mit Hilfe der Visualisierungen von Political Viewpoint gefälscht oder wahr sind.
          </p>
          </br>
          <p>
          Die Arbeit ist in zwei Teile gegliedert:
          </p>
          </br>
          <p>
          <b>1. Qualifikationsstelle:</b> Bitte lesen Sie drei Nachrichten sorgfältig und bewerten Sie deren Wahrheitsgehalt, um Zugang zum Hauptauftrag (0,5 €) zu erhalten. Sie werden auch gebeten, einen kurzen Fragebogen zu beantworten. (7-9min).
          </p>
          </br>
          <p>
          <b>2. Hauptaufgabe:</b> Sie werden gebeten, <b>15 Nachrichten</b> zu bewerten, ob sie wahr oder gefälscht sind (3 €). Wenn Sie <b>10 der Nachrichten</b> richtig als wahr oder gefälscht einstufen, erhalten Sie einen Bonus von <b>3 € (insgesamt 6 €)</b>. Bitte lesen Sie die Nachrichten sorgfältig durch (15-20 Minuten).
          </p>
          </br>
          <p>
          <b>Erklärung zum Datenschutz:</b> Zu Beginn werden Sie aufgefordert, anhand mehrerer Fragen Ihren persönlichen Code zu erstellen. Falls Sie Ihre Antworten löschen lassen möchten, haben Sie einen Monat Zeit, die Löschung zu beantragen, indem Sie sich an c.jakob@tu-berlin.de wenden und Ihren persönlichen Code übermitteln.
          </p>
          </br>
          <p style="text-align: center;">
          <b>Vielen Dank, dass Sie unsere Forschung unterstützen und helfen, Fake News zu untersuchen!</b>
          </p>
        </div>
    `,
    },
    {
      maxWidth: "900px",
      type: "checkbox",
      name: "confirm",
      title:
        "Ich habe die oben genannten Informationen gelesen und verstanden und bin bereit, an der Studie teilzunehmen.",
      isRequired: true,
      colCount: 0,
      choices: ["Ja"],
      hideNumber: true,
    },
  ],
};

export default qualificationStartPage;
