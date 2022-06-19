import * as React  from "react";
import type { ContentPageProps }  from "../utils/sitetypes";
import Layout from "./layout";

import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

const Simple = ( {data} : PageProps<ContentPageProps> ) => {

  const page = data.mdx;

  return (
    <Layout>
      <h1>{page.frontmatter.title}</h1>
      <MDXRenderer>{page.body}</MDXRenderer>
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
