# Evaluation of Political Viewpoint Visualizations in the Fake News Detection Context

## Research question 

This experiment is designed to answer the question: "Which political viewpoint categorization is most helpful from a human perspective in determining the truthfulness of news articles?"

## Experiment set-up

Participants will first enter a qualification phase, where they will fill out a form about their political standing, and their news/information seeking habits. Then, they will be asked to rate the truthfulness of 3 items on a 1-100 scale, with the help of Political Viewpoint visualizations. If they correctly rate the truthfulness of 2/3 items as true (>50), or false (<50), they will move on to the main phase of the experiment. They will earn 0.5€ for completing the qualification phase.

In the main phase, they will be asked to repeat the rating exercise for 15 more news items. They will then fill out a form asking them to evaluate the helpfulness of the visualizations, as well as a demographics form. They will earn 3€ for completing the main phase. If they correctly rate 10/15 items, they will receive a 3€ bonus. 

# Political Viewpoint Visualizations

All Political Viewpoint visualizations used in this experiment are stored in /public/imgs_by_items, organized by item. They were created in R, Powerpoint, and Overleaf. All files can be found in the GitHub repository. 

The visualizations are split into three categories in which to communicate the Political Viewpoint of the item. 
1. Political Leaning - Left/Right Leaning
2. Political Ideology - Progressive/Conservative, Authoritative/Liberal, Capitalistic/Socialistic
3. Political Parties - Which major political party is it associated with? (Die Linke, SPD, Bündis 90/Die Grünen, FDP, CDU/CSU, AfD)

Within each category, there are 2 distinct types of visualization (Type 1 or Type 2). Within each type, there are two different ways to stylistically display that information (Style a or Style b).

## Visualization naming system
For each item, there are 12 visualizations, following the category structure outlined above. Each image follows the same naming system: 
{category}_{type}{style}

For example, an image in the Parties category, that is of Type 1 and Style a, would be names "parties_1a". 
Further explanation of which images are which category, type, and style, is contained in Visualizations.rmd

# TODOs

List of TODOs before survey can be deployed
1. Visualization edits
    - ideology_1a: 
        - Change the titles "Liberalismus" and "Autoritarismus" to their adjective form ("Liberal" and "Autoritär")
        - Delete the "Item" label in the point on the graph (or find a short German word for "Item" to replace it with) 
    - ideology_1b: 
        - Translate axis titles to German
        - Change the titles "Liberalismus" and "Autoritarismus" to their adjective form ("Liberal" and "Autoritär")
    - ideology_2a and ideology_2b: 
        - Change all titles to their adjective form ("Progressiv" and "Konservativ", "Autoritär" and "Liberal", "Kapitalistisch" and "Sozialistisch")
    - leaning_1b: 
        - Change "Weit Links" and "Weit Rechts" to "Extrem Links" and "Extrem Rechts"
    - parties_1b: 
        - Delete the "Item" label in the point on the graph (or find a short German word for "Item" to replace it with) 

2. Questionnaire edits
    - political-information.ts: 
        - For all the questions in the section "Umfrage Teil 1: Spezifische politische Themen", change the question type from "matrix" to "radiogroup"
    - ai-system-evaluation.ts: 
        - Change "Anlehnen" to the proper German word to represent Political Leaning (Left/right)
        - For the question "visualization-evaluation.most-useful-type", find a way to indicate that "ideology" refers to images 1-4 in the question "visualization-evaluation.image-choice", "leaning" refers to images 5-8 in the question "visualization-evaluation.image-choice", and "parties" refers to images 9-12 in the question "visualization-evaluation.image-choice".

4. Point System
    - The number of points a user receives is determined by how many items they correctly rate as either true or false. For every news item they rate correctly, they receive one point. In the qualification phase, they must have at least 2 points to move on to the main phase. In the main phase, they must have at least 10 points to receive the bonus. The points are calculated in XAIQuestionnaire.tsx, and added to the formData with the key POINTS. The current problem is that POINTS is calculated in the "survey.onComplete" function in XAIQuestionnaire, which means the total amount of points the user has is only accessible when the survey is finished. This creates an issue when trying to access POINTS in a page *during* the survey.
    - TODOs:
        - Create the POINTS variable before "survey.onComplete"
        - Edit "completedHtmlOnCondition" section in qualification-questionnaire.ts to display the correct message if POINTS > 2 or POINTS < 2. 
        - Edit bonus-info.ts to display the correct message if POINTS > 10 or POINTS < 10.
        - Update experiment.ts to inform the user when they incorrectly rate a news item. Do so by editing the page with the name "truthfulness-score-warning", and only display the message if newsItemQuestion.correctAnswer has a value of 1.

3. Other
    - Update the experimental_design.png in /documentation/experimental_design.png
    - Take the survey and document how long each section takes, and then update qualification-start-page.ts
    - Read through the experiment and make sure German is correct (I just DeepL'd everything so translations might not be 100% correct)





# Built With

- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev/learn)
- [SurveyJS](https://surveyjs.io/documentation)
- [Material UI](https://mui.com/material-ui/getting-started/overview/)

- ### Citation

If you find this toolkit or its companion paper "Evaluating Human-Centered AI Explanations: Introduction of an XAI Evaluation Framework for Fact-Checking" interesting or useful in your research, use the following Bibtex annotation to cite us:

```
@inproceedings{schmitt_mad,
    author = {Schmitt, Vera and Csomor, Balazs and Meyer, Joachim and Villa-Arenas, Luis-Felipe and Jakob, Charlott and Polzehl, Tim and Möller, Sebastian},
    title = {Evaluating Human-Centered AI Explanations: Introduction of an XAI Evaluation Framework for Fact-Checking},
    year = {2024},
    isbn = {979-8-4007-05526},
    publisher = {Association for Computing Machinery},
    address = {New York, NY, USA},
    url = {https://doi.org/10.1145/3643491.3660283},
    doi = {10.1145/3643491.3660283},
    location = {Phuket, Thailand},
    series = {MAD '24}
    }
```

## Web App implementation

![Overview of implementation](./documentation/architecture.png)

## Metrics

- Performance
- Perceived Usefulness of xAI features
- Perceived Understandability of xAI features
- Trust in the AI system 

## Data Cleaning and Analysis

See the [Data_Cleaning_XAI.ipynb](./data-analysis/Data_Cleaning_XAI.ipynb) notebook for data cleaning and the [Data_Analysis_XAI.ipynb](./data-analysis/Data_Analysis_XAI.ipynb) notebook for data analysis. Raw survey data is available in the [data-analysis/data/raw](./data-analysis/data/raw) folder and news items can be found in the [news-items.csv](./preprocessing/news-items.csv) file.



