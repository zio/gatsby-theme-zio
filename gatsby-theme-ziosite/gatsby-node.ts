import { GatsbyNode } from "gatsby";
import { existsSync, mkdirSync } from "fs"; 

export const onPreBootstrap : GatsbyNode["onPreBootstrap"]= ({reporter}) => {
  const docsPath = 'src/docs';

  if (!existsSync(docsPath)) { 
    reporter.info(`Creating directory ${docsPath}.`);
    mkdirSync(docsPath, {recursive: true});
  } else { 
    reporter.info(`Using exiting src/docs directory`);
  }
}
