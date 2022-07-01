import * as React from "react";
import Jumbotron from "../components/index/jumbotron";
import Features from "../components/index/features";
import Sponsors from "../components/index/sponsors";

const IndexPage = () => { 
  return (
    <main>
      <Jumbotron />
      <section id="features">
        <Features />
      </section>
      <section id="sponsors" className="bg-primary-300">
        <Sponsors />
      </section>
    </main>
  )
}

export default IndexPage