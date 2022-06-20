import * as React from "react";
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

const tagLine = "Type-safe, composable asynchronous and concurrent programming for Scala"

const IndexPage = () => { 
  return (
    <Layout>
      <main>
        <div className="container flex flex-row max-w-full w-full relative bg-black place-content-center">
          <div className="relative place-content-center">
            <div className="absolute left-0 top-1/3 w-full z-10 flex flex-col">
              <span className="text-primary-50 mt-10 mx-auto text-center h-0 invisible md:visible md:h-auto">{tagLine}</span>
              <Link to="/foo/2-0-0/docs" className="text-primary-50 mt-2 m-auto p-2 border-solid border-primary-50 border rounded-lg hover:bg-primary-600">Get Started</Link>
            </div>
            <StaticImage 
              alt={tagLine}
              src="../images/jumbotron_pattern.png" 
              width={1000}
            />
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default IndexPage