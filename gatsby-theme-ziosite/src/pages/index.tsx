import * as React from "react";
import Layout from "../components/layout";
import Jumbotron from "../components/jumbotron";
import Features from "../components/features";
import Sponsors from "../components/sponsors";

const IndexPage = () => { 
  return (
    <Layout>
      <main>
        <Jumbotron />
        <section id="features">
          <Features />
        </section>
        <section id="sponsors" className="bg-primary-300">
          <Sponsors />
        </section>
      </main>
    </Layout>
  )
}

export default IndexPage