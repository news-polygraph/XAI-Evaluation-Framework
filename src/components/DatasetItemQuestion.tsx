import DatasetItem from "@/model/dataset-item";
import React from "react";
import { Question, Serializer, ElementFactory } from "survey-core";
import { SurveyElementBase, ReactQuestionFactory } from "survey-react-ui";
import DatasetItemComponent from "./DatasetItemComponent";

const QUESTION_TYPE = "datasetitem";

export const registerMyQuestion = () => {
  ElementFactory.Instance.registerElement(QUESTION_TYPE, (name) => {
    return new DatasetItemQuestionModel(name);
  });
};

export class DatasetItemQuestionModel extends Question {
  getType() {
    return QUESTION_TYPE;
  }

  get text() {
    return this.getPropertyValue("text", "");
  }
  set text(newValue) {
    this.setPropertyValue("text", newValue);
  }
}

export class DatasetItemQuestion extends SurveyElementBase<
  {
    question: {
      datasetitem: DatasetItem;
      xaiFeatures: "none" | "basic";
      isInput: boolean;
      isTutorialMode: boolean;
      tutorialTooltip: string;
      value?: number | boolean;
      hasVisibleErrors: boolean;
    };
  },
  {
    value?: number | boolean;
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

  render() {
    if (!this.question) return null;
    return (
      <div style={{ userSelect: "none", WebkitUserSelect: "none" }}>
      <DatasetItemComponent
        datasetItem={this.question.datasetitem}
        xaiFeatures={this.question.xaiFeatures}
        isInput={this.question.isInput}
        onRatingChange={(value) => {
          this.question.value = value;
        }}
        isTutorialMode={this.question.isTutorialMode}
        tutorialTooltip={this.question.tutorialTooltip as any}
        defaultRatingValue={this.question.value}
        showError={this.question.hasVisibleErrors}
      />
      </div>
    );
  }
}

Serializer.addClass(
  QUESTION_TYPE,
  [
    "datasetitem:object",
    "xaiFeatures:string",
    "isInput:boolean",
    "isTutorialMode:boolean",
    "tutorialTooltip:string",
  ],
  () => new DatasetItemQuestionModel(""),
  "question"
);

ReactQuestionFactory.Instance.registerQuestion(QUESTION_TYPE, (props) => {
  return React.createElement(DatasetItemQuestion, props);
});
