import * as React from "react"
import * as Prism from "prismjs"

// Prism extra Languages should go into an overall config object 
// Need to load java before scala
const extraLanguages : Array<string> = ["java", "scala"]

// Turn a single toke into a node 
const tokenToReactNode = (token: Prism.Token | string, i: number) : React.ReactNode=> {
  if (typeof token === "string") {
    return <span key={i}>{token}</span>
  } else if (typeof token.content === "string") {
    return <span key={i} className={`token ${token.type}`}>{token.content}</span>
  } else if (Array.isArray(token.content)) {
    return <span key={i} className={`token ${token.type}`}>{token.content.map(tokenToReactNode)}</span>
  } else {
    return <span key={i} className={`token ${token.type}`}>{tokenToReactNode(token.content, 0)}</span>
  }
  
}

interface Props {
  className: string,
  children: any
}

const CodeBlock : React.FC<Props> = (props : Props) => {

  // Figure out the Prism language to use 
  const language : string = props.className?.replace(/language-/g, '') || ''

  // We will stick the tokenized data into the state
  const [data, replaceToken] = React.useState<Array<string | Prism.Token>>([])

  const loadAndTokenize = (langs : Array<string>) => {
    // more languages to load
    if (langs.length > 0) { 
      const lang = langs.shift()
      console.log(`Loading language ${lang}`)
      import(`prismjs/components/prism-${lang}`).then( () => { 
        loadAndTokenize(langs)
      })
    } else { 
      const grammar : Prism.Grammar = Prism.languages[language]
      const tokens = grammar ? Prism.tokenize(props.children, grammar) : []

      replaceToken(tokens)
    }
  }

  React.useEffect( () => { loadAndTokenize(extraLanguages) }, [props.children])
  
  return(
    <div className="w-11/12 my-2 mx-auto">
      <pre className={`language-${language} rounded-xl`}>
        {data.length ? data.map(tokenToReactNode) : props.children}
      </pre>
    </div>
  )
}

export default CodeBlock