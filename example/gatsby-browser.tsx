import * as React from "react"
import './src/styles/tailwind.css'
import 'prism-themes/themes/prism-material-dark.css'
import { GatsbyBrowser } from "gatsby"
import Root from '@atooni/gatsby-theme-ziosite/src/components/root'

export const wrapRootElement : GatsbyBrowser["wrapRootElement"] = ({element}) => 
  { return(
      <Root>{element}</Root> 
    )
  }

