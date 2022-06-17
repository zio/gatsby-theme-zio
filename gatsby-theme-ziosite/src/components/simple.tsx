import * as React  from "react";
import { FC } from "react"; 

import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

const Simple = () => {
  return (
    <h1>Hello World !</h1>
  )
}

//   const page = data.mdx

//   return(
//     <>
//       <h1>{page.frontmatter.title}</h1>
//       <MDXRenderer>{page.body}</MDXRenderer>
//     </>
//   ) 
// }

// export const query = graphql`
//   query($mdxId: String!) {
//     mdx(id: {eq: $mdxId}) {
//       id
//       slug
//       frontmatter {
//         id
//         sidebar_label
//         title
//       }
//       body
//     }
//   }
// `

export default Simple;