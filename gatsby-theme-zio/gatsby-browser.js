import * as React from "react"
import "./src/styles/tailwind.css"
import Root from "./src/components/root"

export const wrapRootElement = ({element}) => {

  return(
    <Root>{element}</Root>
  )
}
