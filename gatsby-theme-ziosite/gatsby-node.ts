import { existsSync, mkdirSync } from "fs";
import type { GatsbyNode } from "gatsby";

// We need to make sure that the content path directory exists, otherwise gatsby will throw up
export const onPreBootstrap : GatsbyNode["onPreBootstrap"] = ({reporter}) => {
  const docsPath = 'src/docs';

  if (!existsSync(docsPath)) { 
    reporter.info(`Creating directory ${docsPath}.`);
    mkdirSync(docsPath, {recursive: true});
  } else { 
    reporter.info(`Using exiting src/docs directory`);
  }
}
