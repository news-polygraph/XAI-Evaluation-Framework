import {
  accessibilityLikert7,
  frequencyLikert7,
  importanceLikert7,
  seriousnessLikert7,
  truthfulnessLikert7,
  oftenLikert6,
  oftenLikert3,
  yesnoLikert2,
  credibleLikert4,
} from "@/helper/likert-scales";

const informationSeekingBehaviour = [
  {
    title: "Umfrage Teil 1: Ihr allgemeines Verhalten bei der Suche nach Informationen",
    description:
      "In diesem Teil sollten Sie Fragen dazu beantworten, woher Sie Ihre politischen Informationen beziehen. Bitte antworten Sie so wahrheitsgemäß wie möglich.",
    elements: [
      {
        title:
          "Wie häufig nutzen Sie die folgenden Medien und Informationsquellen, um sich über politische Themen zu informieren?",
        type: "matrix",
        name: "information-seeking.political",
        hideNumber: true,
        columns: oftenLikert6,
        alternateRows: true,
        isAllRowRequired: true,
        rows: [
          { value: "public_tv", text: "Öffentlich-rechtliches Fernsehen, z. B. ARD und ZDF" },
          { value: "private_tv", text: "Private Fernsehprogramme, z.B. RTL, Pro7, Sat.1" },
          { value: "radio", text: "Radio" },
          { value: "newspaper", text: "Zeitungen und Zeitschriften" },
          { value: "internet_sites", text: "Internet-Nachrichtenseiten und Nachrichten-Apps" },
          { value: "internet_blogs", text: "Nachrichten-Blogs im Internet" },
          { value: "social_media", text: "Nachrichten in sozialen Netzwerken wie Facebook, Twitter oder Instagram" },
          { value: "messages", text: "Nachrichten und Beiträge in sogenannten Messengerdiensten wie WhatsApp oder Telegram" },
          { value: "podcasts", text: "Nachrichten-Podcasts" },
          { value: "government", text: "Beiträge und Informationen, die von der Bundesregierung selbst verbreitet werden, z.B. im Internet, in Broschüren oder eigenen Zeitschriften" },
        ],
      },
      {
        title:
          "Wie oft nutzen Sie die folgenden sozialen Netzwerke?",
        type: "matrix",
        name: "information-seeking.socialmedia",
        hideNumber: true,
        columns: oftenLikert3,
        alternateRows: true,
        isAllRowRequired: true,
        rows: [
          { value: "tiktok", text: "TikTok" },
          { value: "instagram", text: "Instagram" },
          { value: "youtube", text: "YouTube" },
          { value: "facebook", text: "Facebook" },
          { value: "twitter", text: "Twitter" },
        ],
      },
      {
        title:
          "Wenn Sie an die letzte Woche denken, haben Sie da in den folgenden sozialen Netzwerken Nachrichten zu politischen Themen gesehen?",
        type: "matrix",
        name: "information-seeking.socialmedia2",
        hideNumber: true,
        columns: yesnoLikert2,
        alternateRows: true,
        isAllRowRequired: true,
        rows: [
          { value: "tiktok", text: "TikTok" },
          { value: "instagram", text: "Instagram" },
          { value: "youtube", text: "YouTube" },
          { value: "facebook", text: "Facebook" },
          { value: "twitter", text: "Twitter" },
        ],
      },
      {
        title:
          "Und für wie glaubwürdig halten Sie alles in allem …?",
        type: "matrix",
        name: "information-seeking.credibility",
        hideNumber: true,
        columns: credibleLikert4,
        alternateRows: true,
        isAllRowRequired: true,
        rows: [
          { value: "journalists", text: "Nachrichten und Informationen von Journalistinnen und Journalisten" },
          { value: "internet", text: "Informationen im Internet von Prominenten oder auch von „normalen Leuten“, die Sie nicht persönlich kennen" },
          { value: "politicians", text: "Reden und Beiträge von Politikerinnen und Politikern" },
          { value: "family", text: "die Meinungen von Familienmitgliedern, Freunden und Bekannten" },
          { value: "government", text: "Informationen der Bundesregierung" },
        ],
      },
    ],
  },
];
export default informationSeekingBehaviour;
