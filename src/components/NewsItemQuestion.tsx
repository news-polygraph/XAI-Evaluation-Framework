import NewsItem from "@/model/news-item";
import React from "react";
import { Question, Serializer, ElementFactory } from "survey-core";
import { SurveyElementBase, ReactQuestionFactory } from "survey-react-ui";
import NewsItemComponent from "./NewsItemComponent";

type Paths = {
  leaning: string,
  parties: string,
  ideology: string
};

const QUESTION_TYPE = "newsitem";

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
  }
> {
  constructor(props: any) {
    super(props);
  }

  get value() {
    return this.question.value;
  }

  get question() {
    return this.props.question;
  }

  // const classNames: Paths = getRandomClassNames();
  render() {
    if (!this.question) return null;
    return (
      <NewsItemComponent
        newsItem={this.question.newsitem}
        xaiFeatures={this.question.xaiFeatures}
        isInput={this.question.isInput}
        onRatingChange={(score) => {
          this.question.value = score;
        }}
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
