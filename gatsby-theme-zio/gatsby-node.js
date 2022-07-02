const fs = require("fs")

// Make sure the path src/docs exists.
exports.onPreBootstrap = ({reporter}) => {
  const docsPath = 'src/docs';

  if (!fs.existsSync(docsPath)) { 
    reporter.info(`Creating directory ${docsPath}.`);
    fs.mkdirSync(docsPath, {recursive: true});
  } else { 
    reporter.info(`Using existing src/docs directory`);
  }
}