import * as React from "react"
import { withPrefix } from "gatsby"

const NavBar = ({links}) => { 

  const inner = links.map( (l) => {
    return(
      <a href={l.target} key={l.name} className="flex-initial p-2 hover:bg-primary-700 hover:rounded-md">{l.name}</a>
    )
  })

  return (
    <nav>
      <div className="w-full my-2 relative flex flex-row justify-between">
        <img src={`${withPrefix("/theme/img/navbar_brand.png")}`} alt="Home" className="h-8 w-auto"/>
        <div className="flex-row my-auto mr-8">
          {inner}
        </div>
      </div>
    </nav>
  )
}

export default NavBar;