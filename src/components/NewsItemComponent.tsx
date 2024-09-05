import NewsItem from "@/model/news-item";
import { TutorialTooltipStep } from "@/model/tutorial-tooltip-step";
import { XAIFeatureLevel } from "@/model/xai-feature-level";
import { useState, useEffect } from "react";
import ThuthfulnessSlider from "./TruthfulnessSlider";
import TutorialTooltip from "./TutorialTooltip";
// import images from "./Visualizations.module.css";

const NewsItemComponent = ({
  newsItem,
  xaiFeatures,
  isInput = false,
  onRatingChange = () => {},
  isTutorialMode = false,
  tutorialTooltip = null,
  defaultRatingValue = undefined,
  showError = false,
  randomizedImages,
  //correctAnswer
}: {
  newsItem: NewsItem;
  xaiFeatures: XAIFeatureLevel;
  isInput: boolean;
  onRatingChange: (value: number) => void;
  isTutorialMode: boolean;
  tutorialTooltip: TutorialTooltipStep | null;
  defaultRatingValue: number | undefined;
  showError: boolean;
  randomizedImages?: any;
  //correctAnswer: string
}) => {
  const [ratingValue, setRatingValue] = useState<number | undefined>(
    defaultRatingValue
  );
  // console.log(randomizedImages)

  return (
    <section
      css={{
        fontFamily: "Inter, sans-serif",
        color: "#1D1D1F",
        whiteSpace: "normal",

        display: "grid",
        gridTemplateColumns: "minmax(58%, 1fr) minmax(380px, 1fr)",
        gap: "32px",

        "@media (max-width: 1100px)": {
          gridTemplateColumns: "1fr",
        },

        ".container": {
          backgroundColor: "#FBFBFB",
          borderRadius: "8px",
          padding: "20px",
          minWidth: "500px",

          h1: {
            fontSize: "18px",
            fontWeight: 600,
          },

          h2: {
            fontSize: "14px",
            color: "#4F4F4F",
            fontWeight: 600,
            marginBottom: "8px",
          },

          ".line": {
            width: "100%",
            height: "1px",
            backgroundColor: "#E5E5E5",
            margin: "20px 0",
          },
        },
      }}
    >
      {tutorialTooltip === "overview" && (
        <TutorialTooltip>
          <b>Nachrichten Dashboard:</b> In Folgenden werden wir Sie durch die
          verschiedenen Teile des <b>Nachrichten Dashboard:</b> und führen Sie in die verschiedenen
          verschiedenen Schritte Ihrer Aufgabe. Bitte klicken Sie auf "Next".
        </TutorialTooltip>
      )}
      <article
        css={{
          position: "relative",
          h1: {
            fontSize: "30px",
            marginBottom: "8px",
          },
          h2: {
            fontSize: "18px",
            color: "#4F4F4F",
            fontWeight: 500,
            marginBottom: "24px",
          },
          h3: {
            fontSize: "14px",
            fontWeight: 500,
            marginBottom: "24px",
          },
          p: {
            fontSize: "16px",
            lineHeight: "24px",
          }
        }}
      >
        {tutorialTooltip === "article" && (
          <TutorialTooltip>
            <b>Schritt 1 - Lesen:</b> Während Schritt 1 (<b>Lesen</b>) werden Sie
            Sie werden gebeten, die Nachricht aufmerksam zu lesen. Sie sehen hier, wie die Nachricht
            Nachricht mit dem Titel und der Domäne präsentiert wird (hier {" "}
            {newsItem.category}). Bitte klicken Sie auf "Next".
          </TutorialTooltip>
        )}
        <div
          css={{
            fontSize: "14px",
            marginBottom: "12px",
            fontWeight: 700,
            color: "#0055F6",
          }}
          >
          {newsItem.category}
        </div>
        <h1>{newsItem.title}</h1>
        
        {isInput && (
          <div
            css={{
              marginTop: "16px", // Space between the title and the rating box
              backgroundColor: "#FBFBFB",
              borderRadius: "8px",
              padding: "20px",
              border: !showError ? "1px solid #19B394" : "1px solid #E60A3E",
            }}
          >
            {tutorialTooltip === "your-rating" && (
              <TutorialTooltip>
                <b>Schritt 2 - Bewerten:</b> Während Schritt 2 (<b>Bewerten</b>) Sie werden
                Sie werden gebeten, den Wahrheitsgehalt der Nachricht selbst zu
                Nachricht. Um Ihre Bewertung vorzunehmen, können Sie den Schieberegler unten
                zwischen 0 und 100% des Wahrheitsgehalts verändern. Bitte nehmen Sie Ihre Bewertung vor und
                klicken Sie auf "Next".
              </TutorialTooltip>
            )}
            {tutorialTooltip === "redo-your-rating" && (
              <TutorialTooltip>
                <b>Schritt 3 - Wiederholung der Bewertung:</b> Sie werden aufgefordert, Ihre
                Wahrheitsgehalt erneut zu bewerten, indem Sie die{" "}
                <b>zusätzlichen Informationen</b> auf der rechten Seite zu berücksichtigen.
                Es steht Ihnen frei, Ihre ursprüngliche Bewertung entsprechend den neuen
                Erkenntnissen, die Sie aus den zusätzlich bereitgestellten Informationen gewonnen haben. Bitte klicken Sie
                "next".``
              </TutorialTooltip>
            )}
            <h1
              css={{
                fontSize: "19px !important", // Adjust the font size for "Your rating"
                fontWeight: 600,
              }}
            >Ihre Bewertung</h1>
            <div
              css={{
                width: "100%",
                height: "1px",
                backgroundColor: "#E5E5E5",
                margin: "20px 0",
              }}
            ></div>
            <div
              css={{
                display: "flex",
                // flexDirection: "column",
                gap: "8px",
              }}
            >
              <h2
              css ={{
                fontSize: "14px !important",
                fontWeight: 800,
              }}
              > Wahrheitsliebe</h2>
              <ThuthfulnessSlider
                initialScore={ratingValue}
                interactive
                onChange={(score) => {
                  console.log("Score changed to: ", score);
                  setRatingValue(score);
                  onRatingChange(score);
                  newsItem.value = score;
                  console.log("NewsItem.xaiFeatures.truthfulness: ", newsItem.xaiFeatures.truthfulness);
                  if (score > 50 && newsItem.xaiFeatures.truthfulness > 50) {
                    newsItem.correctAnswer = 1;
                    console.log("CorrectAnswer set to 1");
                  } else if (score < 50 && newsItem.xaiFeatures.truthfulness < 50) {
                    newsItem.correctAnswer = 1;
                    console.log("CorrectAnswer set to 1");
                  } else {
                    newsItem.correctAnswer = 0;
                    console.log("CorrectAnswer set to 0");
                  }
                  console.log("NewsItem.correctAnswer: ", newsItem.correctAnswer);
                }}
              />
            </div>
          </div>
        )}
      </article>
      <aside
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {xaiFeatures === "visualizations" && (
          <section
            className="container"
            css={{
              height: "100%",
              border: "1px solid #E5E5E5",
              background: "transparent",
            }}
          >
            <h1>Politischer Gesichtspunkt der Nachricht</h1>
            <div className="line"></div>
            <div
              css={{
                display: "flex",
                gap: "4px",
                position: "relative",
              }}
            >
              {/* {tutorialTooltip === "visualizations" && (
                <TutorialTooltip>
                  <b>Step 3 - Inform:</b> During step 3, you see three different 
                  visualizations representing the political viewpoint of the news item.
                  Please read the{" "} <b>Political Viewpoint</b> visualizations 
                  carefully and click next.
                </TutorialTooltip>
              )} */}
            </div>
            <div className={randomizedImages?.leaning}></div>
            <div className="line"></div>
            <div className={randomizedImages?.ideology}></div>
            <div className="line"></div>
            <div className={randomizedImages?.parties}></div>
            <div className="line"></div>
          </section>
        )}
      </aside>
    </section>
  );
};

export default NewsItemComponent;

