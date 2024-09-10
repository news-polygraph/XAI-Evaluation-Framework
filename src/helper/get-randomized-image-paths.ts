/* Randomly chooses a URL from each category */

import images from './Visualization.module.css';
import extractImagePaths from './extractImagePaths';

type Paths = {
    leaning: string[],
    parties: string[],
    ideology: string[]
  };

/* const imagePaths: Paths = extractImagePaths(images); */

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomImages = (imagePaths: Paths) => {
  const randomImages = {
    leaning: getRandomElement(imagePaths.leaning),
    parties: getRandomElement(imagePaths.parties),
    ideology: getRandomElement(imagePaths.ideology)
  };
};

export default getRandomImages;