import * as React from "react"
import * as Prism from "prismjs"
import "./src/styles/tailwind.css"
import "prism-themes/themes/prism-material-dark.css"
import Root from "./src/components/root"

Prism.manual = true
console.log(Prism.languages)

export const wrapRootElement = ({element}) => {
  return(
    <Root>{element}</Root>
  )
}
