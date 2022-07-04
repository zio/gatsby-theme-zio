import * as React  from "react"

import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import MdxToc from "./MdxToc"

const Simple = ({data}) => {

  const page = data.mdx;

  return (
    <div className="container max-w-full w-full flex flex-row relative">
      <div className="max-w-6xl mx-auto">
        <MDXRenderer>{page.body}</MDXRenderer>
      </div>
      <div className="static top-0 right-0 px-4 min-w-[240px] border-l-2">
        <MdxToc key="toc" toc={page.tableOfContents}/>
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
