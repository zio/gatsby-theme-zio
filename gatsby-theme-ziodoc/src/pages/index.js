import * as React from "react"
import Sponsors from "../components/idx/sponsors"
import Features from "../components/idx/features"
import Jumbotron from "../components/idx/jumbotron"

const IndexPage = () => { 
  return(
    <>
      <section id="jumbo">
        <Jumbotron />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="sponsors" className="bg-primary-300">
        <Sponsors />
      </section>
    </>
  )
}

export default IndexPage
