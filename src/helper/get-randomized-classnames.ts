import styles from './Visualizations.module.css';
import NewsItem from "@/model/news-item";

type Paths = {
  leaning: string,
  parties: string,
  ideology: string
};

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomClassNames = (): Paths => {
  const classNames: Paths = {
    leaning: '',
    parties: '',
    ideology: ''
  };

  // Get all class names from styles object
  const allClassNames = Object.keys(styles);

  // const id = item.id

  // Filter and map to populate classNames with random class names
  classNames.leaning = getRandomElement(allClassNames.filter(className => className.startsWith('leaning')).map(className => styles[className]));
  classNames.parties = getRandomElement(allClassNames.filter(className => className.startsWith('parties')).map(className => styles[className]));
  classNames.ideology = getRandomElement(allClassNames.filter(className => className.startsWith('ideology')).map(className => styles[className]));

  return classNames;
};

export default getRandomClassNames;