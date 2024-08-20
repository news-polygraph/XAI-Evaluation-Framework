import styles from './Visualizations.module.css';
import NewsItem from "@/model/news-item";

type Paths = {
  leaning: string,
  parties: string,
  ideology: string
};

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomClassNames = (item: NewsItem): Paths => {
  const classNames: Paths = {
    leaning: '',
    parties: '',
    ideology: ''
  };

  // Get all class names from styles object
  // const allClassNames = Object.keys(styles);

  const idString = `item_${item.id}_`;

  const idClassNames = Object.keys(styles).filter(className => className.includes(idString));

  // Filter and map to populate classNames with random class names
  classNames.leaning = getRandomElement(idClassNames.filter(className => className.startsWith('leaning')).map(className => styles[className]));
  classNames.parties = getRandomElement(idClassNames.filter(className => className.startsWith('parties')).map(className => styles[className]));
  classNames.ideology = getRandomElement(idClassNames.filter(className => className.startsWith('ideology')).map(className => styles[className]));

  return classNames;
};

export default getRandomClassNames;

