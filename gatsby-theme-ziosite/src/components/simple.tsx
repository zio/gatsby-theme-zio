import * as React  from "react";
import type { ContentPageProps }  from "../utils/sitetypes";
import { Container } from "@chakra-ui/react";

import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

const Simple = ( {data} : PageProps<ContentPageProps> ) => {

  const page = data.mdx;

  return (
    <>
      <h1>{page.frontmatter.title}</h1>
      <Container maxW="90%" m="auto">
        <MDXRenderer>{page.body}</MDXRenderer>
      </Container>
    </>
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
