import { XAIFeatureLevel } from "@/model/xai-feature-level";

const tutorialText = (xaiFeatures: XAIFeatureLevel) => {
  return {
    name: "tutorial-text",
    elements: [
      {
        maxWidth: "900px",
        type: "html",
        html: `
        <div>
          <p>
            <b>Erklärungen für die Aufgabe zur Bewertung der Wahrhaftigkeit von Nachrichten</b>
          </p>
          </br>
          <p>
          Im Folgenden erhalten Sie drei Nachrichtenartikel, die Sie nach ihrem Wahrheitsgehalt bewerten sollen. Die Nachrichtenartikel werden im News Dashboard präsentiert. Ihre Aufgabe, die Nachrichtenartikel nach ihrem Wahrheitsgehalt zu bewerten, ist in zwei Schritte unterteilt: 
          </p>
          </br>
          <p>
            <b>Schritt 1 - Lesen und Bewerten:</b> Lesen Sie die Nachricht und bewerten Sie sie
          </p>
          </br>
          <p>
            <b>Schritt 2 - Wiederholung der Bewertung:</b> Es werden zusätzliche Informationen angezeigt, und Sie können Ihre Bewertung unter Berücksichtigung der zusätzlichen Informationen wiederholen.
          </p>
          </br>
          <p>
          Nach diesen beiden Schritten werden Sie aufgefordert, die Visualisierungen zu bewerten und auszuwählen, welche Visualisierung Ihnen bei Ihrer Bewertung am meisten geholfen hat.
          </p>
          </br>
          <p>
          Im Folgenden wird eine Einführung in die Aufgabe gegeben, mit detaillierteren Beschreibungen für jeden Schritt. Bitte lesen Sie diese sorgfältig durch, bevor Sie mit der eigentlichen Aufgabe beginnen.
          </p>
        `,
      },
    ],
  };
};

export default tutorialText;
