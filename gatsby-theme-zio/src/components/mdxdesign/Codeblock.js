import * as React from "react"
import * as Prism from "prismjs"

// Prism extra Languages should go into an overall config object 
// Need to load java before scala
const extraLanguages = ["bash", "java", "scala"]

// A single line consists of an array of Elements
class Line {
  tokens

  constructor () { 
    this.tokens = []
  }

  addElement(t) { 
    this.tokens.push(t)
  }

  isEmpty() { 
    if (this.tokens.length == 0) return true
    return (this.tokens.findIndex( (e) => {
      if (typeof e === "string") { 
        return e.trim().length > 0
      } else {
        return true
      }
    }) === -1)
  }
}

// The regex to split lines 
const lineSplit = '\n'

// Turn a single toke into a node 
const tokenToReactNode = (token, key) => {
  if (typeof token === "string") {
    return <span key={key}>{token}</span>
  } else if (typeof token.content === "string") {
    return <span key={key} className={`token ${token.type}`}>{token.content}</span>
  } else if (Array.isArray(token.content)) {
    return(
      <span key={key} className={`token ${token.type}`}>
        {token.content.map((t) => { return tokenToReactNode(t, key) })}
      </span>
    )
  } else {
    return (
      <span key={key} className={`token ${token.type}`}>
        {tokenToReactNode(token.content, "")}
      </span>
    )
  }  
}

const lineToReactNode = (line, i, nonum) => {
  const nodes = line.tokens.map( (t,idx) => { return tokenToReactNode(t, `l-${i}-t-${idx}`) })

  const lineNum = nonum ? "hidden" : "flex-none w-8 pr-2 border-r-2 text-right"

  return(
    <div className="flex flew-row" key={`l-${i}`}> 
      <div className={lineNum}>{i+1}</div>
      <div className="flex-grow ml-2">{nodes}{`\n`}</div>
    </div>
  ) 
}

function tokenToLines (curLine, lines, token) {
  if (typeof token === "string") {
    if (token.includes(lineSplit)) {
      const parts = token.split(lineSplit)
      curLine.addElement(parts.shift())
      lines.push(curLine)
      return parts.join(lineSplit)
    } else { 
      curLine.addElement(token)
      return null
    }
  } else if (typeof token.content === "string") { 
    if (token.content.includes(lineSplit)) { 
      const parts = token.content.split(lineSplit)
      const toEol = new Prism.Token(token.type, parts.shift(), token.alias)
      curLine.addElement(toEol)
      lines.push(curLine)
      return new Prism.Token(token.type, parts.join(lineSplit), token.alias)
    } else {
      curLine.addElement(token)
      return null
    }
  } else { 
    curLine.addElement(token)
    return null
  }
} 

function linify(tokens) { 
  const res = []
  var curLine = new Line()
  const lines = []
  tokens.forEach( (t) => { 
    var elem = t 
    while(elem) { 
      elem = tokenToLines(curLine, lines, elem)
      if (elem) { 
        console.log(JSON.stringify(curLine))
        res.push(curLine)
        curLine = new Line()
      }
    }
  })
  if (!curLine.isEmpty()) res.push(curLine)
  console.log(JSON.stringify(curLine))
  return res
}

const CodeBlock = (props) => {

  // Figure out the Prism language to use 
  const language = props.className?.replace(/language-/g, '') || ''
  const nonum = props.nonum?.valueOf() || false

  // We will stick the tokenized data into the state
  const [data, replaceToken] = React.useState<Array<Line>>([])

  // This will load the required extra languages and tokenise the codeblock 
  const loadAndTokenize = (langs) => {
    // more languages to load
    if (langs.length > 0) { 
      const lang = langs.shift()
      console.log(`Loading language ${lang}`)
      import(`prismjs/components/prism-${lang}`).then( () => { 
        loadAndTokenize(langs)
      })
    } else { 
      // Now we should have all languages, so we can try to tokenize the code block
      const grammar = Prism.languages[language]
      const tokens = 
        grammar ? Prism.tokenize(props.children, grammar) : [props.children]

      const lines = linify(tokens)
      replaceToken(lines)
    }
  }

  React.useEffect( () => { loadAndTokenize(extraLanguages) })
  
  return(
    <div className="w-11/12 my-2 mx-auto">
      <pre className={`language-${language} rounded-xl`}>
        {data.length ? data.map( (l, i) => lineToReactNode(l, i, nonum)) : props.children}
      </pre>
    </div>
  )
}

export default CodeBlock