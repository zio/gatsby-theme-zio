import * as React from "react"
import { MDXProvider} from "@mdx-js/react"

interface HProps { 
  level: number,
  children: any
}

const H1 : React.FC = ({children} : React.PropsWithChildren) => { return <Heading level={1}>{children}</Heading> }
const H2 : React.FC = ({children} : React.PropsWithChildren) => { return <Heading level={2}>{children}</Heading> }
const H3 : React.FC = ({children} : React.PropsWithChildren) => { return <Heading level={3}>{children}</Heading> }
const H4 : React.FC = ({children} : React.PropsWithChildren) => { return <Heading level={4}>{children}</Heading> }
const H5 : React.FC = ({children} : React.PropsWithChildren) => { return <Heading level={5}>{children}</Heading> }
const H6 : React.FC = ({children} : React.PropsWithChildren) => { return <Heading level={6}>{children}</Heading> }

const Heading : React.FC<HProps> = ({level, children}) => {
  const sizes = ["4xl", "2xl", "xl"]
  const size = (level > 0 && level <= sizes.length) ? sizes.at(level - 1) : "lg"
  const style = `text-${size} font-semibold my-2`

  const Elem = `h${level}` as (keyof JSX.IntrinsicElements)
  
  return(
    <Elem className={style}>
      {children}
    </Elem>
  )
}

const components = { 
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: p => <p className="mb-2" {...p} />,
  inlineCode: p => <code className="font-mono text-sm bg-yellow-500 mx-1 p-1 rounded-md" {...p} />,
  pre: p => <pre className="font-mono mx-4 p-2 bg-yellow-500" {...p} />
}

const MDXDesign = (props: React.PropsWithChildren) => { 
  return(
    <MDXProvider components={components}>
      {props.children}
    </MDXProvider>
  )
}

export default MDXDesign