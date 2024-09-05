import {
    strengthLikert4,
    frequencyLikert4,
    importanceLikert4,
    satisfactionLikert4,
    agreementLikert3,
    leftRightLikert10,
    weitLikert3,
    gutLikert3,
    migrationLikert2,
    besserLikert2,
  } from "@/helper/likert-scales";
  
  const politicalInformation = [
    {
      title: "Umfrage Teil 1: Ihr allgemeines politisches Verhalten",
      description:
        "In diesem Teil sollten Sie Fragen dazu beantworten, wie Sie mit Politik und politischen Informationen umgehen. Bitte antworten Sie so wahrheitsgemäß wie möglich.",
      elements: [
        {
          title:
            "Wie interessiert und gut informiert sind Sie über allgemeine politische Themen?",
          type: "matrix",
          name: "political-issues",
          hideNumber: true,
          columns: strengthLikert4,
          alternateRows: true,
          isAllRowRequired: true,
          rows: [
            {
              value: "top-source-seriousness",
              text: "Wie stark interessieren Sie sich allgemein für politische Themen?",
            },
            {
                value: "top-source-seriousness",
                text: "Und wie gut fühlen Sie sich allgemein über politische Themen informiert?",
            },
          ],
        },
        {
          title:
            "Wenn Sie an die letzte Woche denken, wie häufig haben Sie sich bei den folgenden Gelegenheiten mit jemandem über politische Themen unterhalten?",
          type: "matrix",
          name: "political-communication",
          hideNumber: true,
          columns: frequencyLikert4,
          alternateRows: true,
          isAllRowRequired: true,
          rows: [
            { value: "work-school", text: "Bei der Arbeit, in der Schule oder an der Uni" },
            { value: "personal-life", text: "In persönlichen Gesprächen mit Freunden, in der Familie" },
            { value: "online", text: "Bei der Nutzung sozialer Netzwerke im Internet" },
            { value: "free-time", text: "In meiner Freizeit/bei Hobbies z. B. im Verein" },
          ],
        },
          {
            title:
              "In der Politik spricht man manchmal von 'links' und 'rechts'. Wo auf der Skala auf Liste 10 würden Sie sich selbst einstufen, wenn 0 für links steht und 10 für rechts?",
            type: "matrix",
            name: "political-scale",
            hideNumber: true,
            columns: leftRightLikert10,
            alternateRows: true,
            isAllRowRequired: true,
            rows: [
              {
                  value: "Links-Rechts Skala",
              },
            ],
          },
          {
            title: "Sind Sie Mitglied in einer politischen Partei? Wenn ja, welcher?",
            type: "text",
            name: "political-party-membership",
            hideNumber: true,
            isRequired: true,
          },
          {
            type: "checkbox",
            name: "political-parties",
            title: "Wenn nächsten Sonntag Bundestagswahl wäre, welche Partei würdest du wählen?",
            hideNumber: true,
            isRequired: true,
            maxSelectedChoices: 1,
          //   validators: [
          //     {
          //       type: "answercount",
          //       text: "Invalid response: please select three sources",
          //       minCount: 3,
          //     },
          //   ],
            choices: [
              { value: "cdu", text: "CDU" },
              { value: "csu", text: "CSU" },
              { value: "spd", text: "SPD" },
              { value: "grune", text: "Bündis 90/Die Grünen" },
              { value: "fdp", text: "FDP" },
              { value: "afd", text: "AfD" },
              { value: "die linke", text: "Die Linke" },
              { value: "other", text: "Andere" },
            ],
          },
      ],
    },
    {
      title: "Umfrage Teil 1: Spezifische politische Themen",
      description:
        "In diesem Teil sollen Sie Fragen zu Ihren Gedanken zu drei politischen Themen beantworten: Corona, Migration und Wirtschaft. Bitte antworten Sie so wahrheitsgemäß wie möglich.",
      elements: [
        {
          title:
            "Corona",
          type: "matrix",
          name: "corona",
          hideNumber: true,
          columns: weitLikert3,
          alternateRows: true,
          isAllRowRequired: true,
          rows: [
            { value: "Wie schätzen Sie die politischen Maßnahmen ein, die veranlasst wurden um das Corona-Virus einzudämmen: Wie waren diese getroffenen Maßnahmen Ihrer Meinung nach?" },
          ],
        },
        {
          title: "Migration",
          type: "matrix",
          name: "migration",
          hideNumber: true,
          columns: gutLikert3,
          alternateRows: true,
          isAllRowRequired: true,
          rows: [
            { value: "Geflüchtete", text: "Wie denken Sie darüber, dass Geflüchtete nach Deutschland kommen?" },
          ],
        },
        {
          title: "Migration",
          type: "matrix",
          name: "migration2",
          hideNumber: true,
          columns: migrationLikert2,
          alternateRows: true,
          isAllRowRequired: true,
          rows: [
            { value: "Abschiebungsstopp", text: "Sollten abgelehnte Asylbewerber aus Afghanistan weiterhin nach Afghanistan abgeschoben werden oder sollte es aufgrund der aktuellen Sicherheitslage in Afghanistan einen Abschiebungsstopp geben?" },
          ],
        },
        {
          title: "Wirtschaft",
          type: "matrix",
          name: "wirtschaft",
          hideNumber: true,
          columns: besserLikert2,
          alternateRows: true,
          isAllRowRequired: true,
          rows: [
            { value: "Wirtschaft", text: "Wenn Sie ihre finanzielle Situation, bzw. die Ihres Haushalts mit der vor zwei Jahren vergleichen: Geht es Ihnen, bzw. Ihrem Haushalt, gegenwärtig finanziell besser oder schlechter?" },
          ],
        },
      ],
    },
    {
      title: "Umfrage Teil 1: Der Umgang mit Desinformation",
      description:
        "In diesem Teil sollten Sie Fragen über die Gefahren von Desinformation und Ihren Umgang damit beantworten. Bitte antworten Sie so wahrheitsgemäß wie möglich.",
      elements: [
        {
            title:
              "Wie häufig reagieren Sie wie folgt, wenn Sie im Internet oder in sozialen Netzwerken eine für Sie interessante Information finden, von der Sie jedoch nicht so genau wissen, ob sie stimmt oder nicht?",
            type: "matrix",
            name: "dealing-with-disinformation",
            hideNumber: true,
            columns: frequencyLikert4,
            alternateRows: true,
            isAllRowRequired: true,
            rows: [
              { value: "ignore-info", text: "Ich ignoriere die Information" },
              { value: "verify-source", text: "Ich suche nach anderen Quellen und Medienberichten, um die Information zu überprüfen" },
              { value: "ask-others", text: "Ich frage Andere, was sie davon halten" },
              { value: "trustworthy-source", text: "Ich versuche herauszufinden, ob man der Informationsquelle grundsätzlich vertrauen kann." },
            ],
          },
        {
          title: "Geben Sie bitte jeweils zu den folgenden Aussagen an, ob Sie diesen eher zustimmen oder eher nicht zustimmen.",
          type: "matrix",
          name: "dangers-disinformation",
          hideNumber: true,
          columns: agreementLikert3,
          alternateRows: true,
          isAllRowRequired: true,
          rows: [
            { value: "information-abundance", text: "Man weiß bei der Fülle an Informationen gar nicht mehr, was man glauben soll." },
            { value: "personal-fear", text: "Ich habe Sorge, dass ich selbst auf falsche oder irreführende Nachrichten reinfallen könnte." },
            { value: "others-fear", text: "Ich befürchte, dass andere sich durch falsche oder irreführende Nachrichten beeinflussen lassen." },
          ],
        },
      ],
    },
  ];
  
  export default politicalInformation;
  