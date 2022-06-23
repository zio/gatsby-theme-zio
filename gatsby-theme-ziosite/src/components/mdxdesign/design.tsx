import * as React from "react"
import { MDXProvider} from "@mdx-js/react"

const components = { 
  h1: p => <h1 className="text-2xl font-semibold mt-4 mb-2" {...p} />,
  h2: p => <h1 className="text-xl font-semibold my-2" {...p} />,
  h3: p => <h1 className="text-l font-semibold my-2" {...p} />
}

const MDXDesign = (props: React.PropsWithChildren) => { 
  return(
    <MDXProvider components={components}>
      {props.children}
    </MDXProvider>
  )
}

export default MDXDesign