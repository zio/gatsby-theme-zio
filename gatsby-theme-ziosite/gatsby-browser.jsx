const React = require("react")
require('./src/styles/tailwind.css')
require('prism-themes/themes/prism-material-dark.css')
const Root = require("./src/components/root")

exports.wrapRootElement = ({element}) => 
  { return(
      <Root>{element}</Root> 
    )
  }

