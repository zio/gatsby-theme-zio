import * as React from "react";
import NavBar from "./navbar";
import Footer from "./footer"
import MDXDesign from "./mdxdesign/design";

const Root = (props : React.PropsWithChildren) => { 
  return(
    <MDXDesign>
      <div className="container flex flex-col max-w-full w-full">
        <header className="bg-primary-900 text-primary-50">
          <NavBar />
        </header>
        <section className="bg-primary-100">
          {props.children}
        </section>
        <footer>
          <Footer />
        </footer>
      </div>
    </MDXDesign>
  )
}

export default Root 