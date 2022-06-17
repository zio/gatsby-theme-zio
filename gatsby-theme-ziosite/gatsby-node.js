const fs = require("fs");

exports.onPreBootstrap = ({reporter}) => {
  const docsPath = 'src/docs';

  if (!fs.existsSync(docsPath)) { 
    reporter.info(`Creating directory ${docsPath}.`);
    fs.mkdirSync(docsPath, {recursive: true});
  } else { 
    reporter.info(`Using exiting src/docs directory`);
  }
}
