import images from './Visualization.module.css';

type Paths = {
    leaning: string[],
    parties: string[],
    ideology: string[]
  };

const extractImagePaths = (styles: { [key: string]: string }): Paths => {
    const paths: Paths = {
        leaning: [],
        parties: [],
        ideology: []
    };

    for (const className in images) {
        if (images.hasOwnProperty(className)) {
            const image = images[className];
            const pathMatch = image.match(/url\('(.+?)'\)/);
            if (pathMatch) {
                const path = pathMatch[1];
                if (path.includes('/leaning/')) {
                    paths.leaning.push(path);
                } else if (path.includes('/parties/')) {
                    paths.parties.push(path);
                } else if (path.includes('/ideology/')) {
                    paths.ideology.push(path);
                }
            }
        }
    }

    return paths;
};

export default extractImagePaths;