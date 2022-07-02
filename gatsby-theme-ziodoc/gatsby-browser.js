import * as React from "react"
import "./src/styles/tailwind.css"
import "prism-themes/themes/prism-material-dark.css"

import Root from "./src/components/root"

export const wrapRootElement = ({element}) => {

  return(
    <Root>{element}</Root>
  )
}
