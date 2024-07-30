import styles from './Visualizations.module.css';


type Paths = {
    leaning: string[],
    parties: string[],
    ideology: string[]
  };
  
  const extractClassNames = (styles: { [key: string]: string }): Paths => {
    const classNames: Paths = {
      leaning: [],
      parties: [],
      ideology: []
    };
  
    for (const className in styles) {
      if (styles.hasOwnProperty(className)) {
        if (className.startsWith('leaning')) {
          classNames.leaning.push(className);
        } else if (className.startsWith('parties')) {
          classNames.parties.push(className);
        } else if (className.startsWith('ideology')) {
          classNames.ideology.push(className);
        }
      }
    }
  
    return classNames;
  };

export default extractClassNames;