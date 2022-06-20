import * as React from "react";
import Layout from "../components/layout";
import Jumbotron from "../components/jumbotron";
import Features from "../components/features";
import Partners from "../components/partners";

const IndexPage = () => { 
  return (
    <Layout>
      <main>
        <Jumbotron />
        <Features />
        <Partners />
      </main>
    </Layout>
  )
}

export default IndexPage