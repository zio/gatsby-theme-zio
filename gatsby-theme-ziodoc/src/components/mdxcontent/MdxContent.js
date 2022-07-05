import * as React  from "react"

import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import MdxToc from "./MdxToc"
import * as Components from "../mdxrender/design"

const Simple = ({data}) => {

  const page = data.mdx;

  return (
    
    <div className="flex-row">
      <div className="fixed top-12 left-0 right-0 h-8 py-1 bg-primary-700 text-primary-100">
        <div className="flex flex-row">

        </div>
        Sub Site Navbar - navigate across sub site sections
      </div>
      <div className="container max-w-full w-full flex flex-row relative flex-items-stretch">
        <div className="px-4 border-r-2">
          <Components.H2>Nav in single section</Components.H2>
        </div>
        <div className="max-w-6xl mx-auto p-2">
          <MDXRenderer>{page.body}</MDXRenderer>
        </div>
        <div className="px-4 border-l-2">
          <Components.H2>Table of contents</Components.H2>
          <MdxToc key="toc" toc={page.tableOfContents}/>
        </div>
      </div>
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
      tableOfContents(maxDepth: 3)
    }
  }
`
