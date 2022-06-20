import * as React from "react";
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage = () => { 
  return (
    <Layout>
      <main>
        <div className="container flex flex-row max-w-full w-full relative bg-black">
          <StaticImage className="relative m-auto" src="../images/jumbotron_pattern.png" alt="Alt" />
        </div>
      </main>
    </Layout>
  )
}

export default IndexPage