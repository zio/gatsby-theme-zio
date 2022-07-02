import * as React from "react"
import { MDXProvider} from "@mdx-js/react"
import CodeBlock from "./Codeblock"

const H1 = ({children}) => { return <Heading level={1}>{children}</Heading> }
const H2 = ({children}) => { return <Heading level={2}>{children}</Heading> }
const H3 = ({children}) => { return <Heading level={3}>{children}</Heading> }
const H4 = ({children}) => { return <Heading level={4}>{children}</Heading> }
const H5 = ({children}) => { return <Heading level={5}>{children}</Heading> }
const H6 = ({children}) => { return <Heading level={6}>{children}</Heading> }

const LI = ({children}) => { 
  return <li className="mb-2">{children}</li> 
}

const Heading = ({level, children}) => {
  const sizes = ["4xl", "2xl", "xl"]
  const size = (level > 0 && level <= sizes.length) ? sizes.at(level - 1) : "lg"
  const style = `text-${size} font-semibold my-2`

  const Elem = `h${level}`
  
  return(
    <Elem className={style}>
      {children}
    </Elem>
  )
}

const UL = ({orig, children}) => { 
  return(
    <ul className="list-disc list-outside" {...orig}>
      {children}
    </ul>
  )
}

const OL = ({start, children}) => { 
  return(
    <div className="ml-5">
      <ol className="list-decimal list-outside" start={start} >
        {children}
      </ol>
    </div>
  )
}

const components = { 
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  ul: UL,
  ol: OL,
  li: LI,
  p: p => <p className="mb-2" {...p} />,
  pre: p => <pre {...p} />,
  inlineCode: p => <code className="font-mono text-sm bg-primary-300 mx-1 py-1 px-1 rounded-md" {...p} />,
  code: CodeBlock
}

const MDXDesign = (props) => { 
  return(
    <MDXProvider components={components}>
      {props.children}
    </MDXProvider>
  )
}

export default MDXDesign