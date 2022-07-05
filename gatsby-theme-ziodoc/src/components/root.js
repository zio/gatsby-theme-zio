import * as React from "react"
import NavBar from "./navbar"
import Footer from "./footer"
import MDXDesign from "./mdxrender/design"

const mainLinks = [
  { name: "Blog", target: "#"},
  { name: "Articles",target: "#"},
  { name: "Projects",target: "#"},
  { name: "Contribute",target: "#"},
  { name: "About",target: "#"}
]

const Root = (props) => { 
  return(
    <MDXDesign>
      <div className="max-w-full w-full h-full flex-row">
        <header className="fixed top-0 left-0 max-w-full w-full bg-primary-900 text-primary-50">
          <NavBar links={mainLinks} />
        </header>
        <div className="absolute top-20 bottom-0 max-w-full w-full overflow-auto">
          <section className="bg-primary-100">
            {props.children}
          </section>
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </MDXDesign>
  )
}

export default Root 