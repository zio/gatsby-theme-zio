import * as React  from "react";

import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

const Simple = ({data}) => {

  const page = data.mdx;

  return (
    <div className="container mx-auto">
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
      body
    }
  }
`
