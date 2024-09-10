/**
 * This file contains the implementation of the NewsItemQuestion model and component.
 * The NewsItemQuestion is a custom question type that displays a news item and allows the user to rate its truthfulness.
 * The question also displays a tooltip with additional information about the news item during the tutorial.
 */

import NewsItem from "@/model/news-item";
import React from "react";
import { Question, Serializer, ElementFactory } from "survey-core";
import { SurveyElementBase, ReactQuestionFactory } from "survey-react-ui";
import NewsItemComponent from "./NewsItemComponent";


//Stores the paths for the randomized images for the different XAI features.
type Paths = {
  leaning: string,
  parties: string,
  ideology: string
};

const QUESTION_TYPE = "newsitem";

// Registers the NewsItemQuestionModel with the SurveyJS ElementFactory.
export const registerMyQuestion = () => {
  ElementFactory.Instance.registerElement(QUESTION_TYPE, (name) => {
    return new NewsItemQuestionModel(name);
  });
};

export class NewsItemQuestionModel extends Question {
  getType() {
    return QUESTION_TYPE;
  }

  get text() {
    return this.getPropertyValue("text", "");
  }
  set text(newValue) {
    this.setPropertyValue("text", newValue);
  }

  // get correctAnswer() {
  //   return this.getPropertyValue("correctAnswer", "");
  // }
  // set correctAnswer(newValue) {
  //   this.setPropertyValue("correctAnswer", newValue);
  // }
}

export class NewsItemQuestion extends SurveyElementBase<
  {
    question: {
      newsitem: NewsItem;
      xaiFeatures: "none" | "basic";
      isInput: boolean;
      isTutorialMode: boolean;
      tutorialTooltip: string;
      value?: number;
      hasVisibleErrors: boolean;
      correctAnswer?: number;
    };
  },
  {
    value?: number;
    correctAnswer?: number;
  }
> {
  // This component renders a single news item and allows the user to rate its truthfulness.
  // It also displays a tooltip with additional information about the news item during the tutorial.
  constructor(props: any) {
    super(props);

    this.state = {
      value: props.question.value,
      correctAnswer: props.question.correctAnswer,
    };
  }

  get value() {
    return this.question.value;
  }

  get question() {
    return this.props.question;
  }

  //Updates the correct answer in the state and the question model.
  handleCorrectAnswerUpdate = (newCorrectAnswer: number) => {
    this.setState({ correctAnswer: newCorrectAnswer });
    this.question.correctAnswer = newCorrectAnswer; 
  };

  // const classNames: Paths = getRandomClassNames();
  render() {
    if (!this.question) return null;
    return (
      <NewsItemComponent
        newsItem={this.question.newsitem}
        xaiFeatures={this.question.xaiFeatures}
        isInput={this.question.isInput}
        onRatingChange={(score) => {
          this.setState({ value: score }); // Update the state with the new score
          this.question.value = score; // Update the question model with the new value
        }}
        onCorrectAnswerUpdate={this.handleCorrectAnswerUpdate} // Pass the correct answer update handler
        isTutorialMode={this.question.isTutorialMode}
        tutorialTooltip={this.question.tutorialTooltip as any}
        defaultRatingValue={this.question.value}
        showError={this.question.hasVisibleErrors}
        randomizedImages={this.question.newsitem.randomizedImages}
      />
    );
  }
}

Serializer.addClass(
  QUESTION_TYPE,
  [
    "newsitem:object",
    "xaiFeatures:string",
    "isInput:boolean",
    "isTutorialMode:boolean",
    "tutorialTooltip:string",
    // "correctAnswer:number",
  ],
  () => new NewsItemQuestionModel(""),
  "question"
);

ReactQuestionFactory.Instance.registerQuestion(QUESTION_TYPE, (props) => {
  return React.createElement(NewsItemQuestion, props);
});

