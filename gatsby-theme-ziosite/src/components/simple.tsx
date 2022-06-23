import * as React  from "react";
import type { ContentPageProps }  from "../utils/sitetypes";
import Layout from "./layout";

import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import MDXDesign from "./mdxdesign/design";

const Simple = ( {data} : PageProps<ContentPageProps> ) => {

  const page = data.mdx;

  return (
    <Layout>
      <MDXDesign>
        <div className="container mx-auto">
          <h1 className="text-blue-700 text-4xl underline font-semibold">{page.frontmatter.title}</h1>
          <MDXRenderer>{page.body}</MDXRenderer>
        </div>
      </MDXDesign>
    </Layout>
  )
}

export default Simple;

export const query = graphql`
  query($mdxId: String!) {
    mdx(id: {eq: $mdxId}) {
      id
      slug
      frontmatter {
        id
        sidebar_label
        title
      }
      body
    }
  }
`
