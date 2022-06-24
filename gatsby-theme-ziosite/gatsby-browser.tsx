import * as React from "react"
import './src/styles/tailwind.css'
import { GatsbyBrowser } from "gatsby"
import Root from './src/components/root'

export const wrapRootElement : GatsbyBrowser["wrapRootElement"] = ({element}) => 
  { return(
      <Root>{element}</Root> 
    )
  }

