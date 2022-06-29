import * as React  from "react";
import type { ContentPageProps }  from "../utils/sitetypes.js";

import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

const Simple = ( {data} : PageProps<ContentPageProps> ) => {

  const page = data.mdx;

  return (
    <div className="container mx-auto">
      <h1 className="text-blue-700 text-4xl underline font-semibold mb-4">{page.frontmatter.title}</h1>
      <MDXRenderer>{page.body}</MDXRenderer>
    </div>
  )
}

export default Simple;

export const query = graphql`
  query($filePath: String!) {
    mdx(fileAbsolutePath: {eq: $filePath}) {
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
