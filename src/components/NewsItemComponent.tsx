/**
 * The NewsItemComponent displays a single news item.
 *
 * The component takes the following props:
 * - newsItem: The news item to be displayed.
 * - xaiFeatures: The XAI features to be enabled or disabled
 * - isInput: A boolean indicating whether the component should display an input form or not.
 * - onRatingChange: A callback function that is called when the user changes their rating.
 * - onCorrectAnswerUpdate: A callback function that is called when the user's correct answer (1 or 0) is updated.
 * - isTutorialMode: A boolean indicating whether the component is in tutorial mode or not.
 * - tutorialTooltip: The tutorial tooltip text to be displayed.
 * - defaultRatingValue: The default rating value to be displayed.
 * - showError: A boolean indicating whether the component should display an error message or not.
 * - randomizedImages: An object containing the randomized images for the different XAI features.
 */

import NewsItem from "@/model/news-item";
import { TutorialTooltipStep } from "@/model/tutorial-tooltip-step";
import { XAIFeatureLevel } from "@/model/xai-feature-level";
import { useState, useEffect } from "react";
import ThuthfulnessSlider from "./TruthfulnessSlider";
import TutorialTooltip from "./TutorialTooltip";

const NewsItemComponent = ({
  newsItem,
  xaiFeatures,
  isInput = false,
  onRatingChange = () => {},
  onCorrectAnswerUpdate = () => {}, // Added the callback prop
  isTutorialMode = false,
  tutorialTooltip = null,
  defaultRatingValue = undefined,
  showError = false,
  randomizedImages,
}: {
  newsItem: NewsItem;
  xaiFeatures: XAIFeatureLevel;
  isInput: boolean;
  onRatingChange: (value: number) => void;
  onCorrectAnswerUpdate: (correctAnswer: number) => void; // Accept correctAnswer callback
  isTutorialMode: boolean;
  tutorialTooltip: TutorialTooltipStep | null;
  defaultRatingValue: number | undefined;
  showError: boolean;
  randomizedImages?: any;
}) => {
  const [ratingValue, setRatingValue] = useState<number | undefined>(
    defaultRatingValue
  );
  // console.log(randomizedImages)

  const handleSliderChange = (score: number) => {
    setRatingValue(score);
    onRatingChange(score);

    // Calculate correctAnswer based on the user's truthfulness score and the item's true truthfulness (newsitem.xaiFeatures.truthfulness)
    const newCorrectAnswer =
      score > 50 && newsItem.xaiFeatures.truthfulness > 50
        ? 1
        : score < 50 && newsItem.xaiFeatures.truthfulness < 50
        ? 1
        : 0;

    // Call the parent callback with the new correctAnswer
    onCorrectAnswerUpdate(newCorrectAnswer);
  };

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
      {/* 
        A tutorial tooltip that only appears when the tutorial is at the "overview" step.
        It's a brief introduction to the NewsItemComponent and the role it plays in the
        larger experiment. It's only shown when the user is in the tutorial mode and on the
        first step of the tutorial. There are 3 other tutorial tooltips that appear afterwards.
      */}
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
              > Wahrheit</h2>
              {/*
                This is a slider component that is used to display the user's rating of the news item's
                truthfulness. The user can interact with the slider to change their rating. The
                `initialScore` prop is set to the current value of the `ratingValue` state variable,
                which is the user's current rating. The `onChange` prop is set to the `handleSliderChange`
                function, which will be called whenever the user changes their rating.
              */}
              <ThuthfulnessSlider
                initialScore={ratingValue}
                interactive
                onChange={handleSliderChange}
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
            {/* 
              The divs below are used to display the visualizations for the
              political leaning, ideology, and parties of the news item.

              The classNames are randomly selected from the styles object
              and are used to style the divs. The styles object is defined
              in the getRandomClassNames function in the get-randomized-classnames.ts
              file.

              The "line" class is used to add a line between the divs.
            */}
            <div className={randomizedImages?.leaning} /* Political Leaning */></div>
            <div className="line"></div>
            <div className={randomizedImages?.ideology} /* Ideology */></div>
            <div className="line"></div>
            <div className={randomizedImages?.parties} /* Parties */></div>
            <div className="line"></div>
          </section>
        )}
      </aside>
    </section>
  );
};

export default NewsItemComponent;



