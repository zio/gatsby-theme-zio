import * as React from "react"
import * as Prism from "prismjs"

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
    if (this.tokens.length === 0) return true
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
      <div className="flex-grow ml-2">{nodes}</div>
    </div>
  ) 
}

const linify = (tokens) => { 

  var curLine = new Line()
  const lines = []

  const linefeed = ( () => {
    lines.push(curLine)
    curLine = new Line()
  })
  
  const eatLines = (token) => {

    if (typeof token === "string") {
      if (token.includes(lineSplit)) {
        const parts = token.split(lineSplit)
        while (parts.length > 0) {
          const part = parts.shift()
          curLine.addElement(part)
          if (parts.length > 0 || (token.endsWith(lineSplit) && part.trim().length > 0 )) linefeed()
        }
      } else { 
        curLine.addElement(token)
      }
    } else if (typeof token.content === "string") { 
      if (token.content.includes(lineSplit)) { 
        const parts = token.content.split(lineSplit)
        while (parts.length > 0) { 
          curLine.addElement(new Prism.Token(token.type, parts.shift(), token.alias))
          if (parts.length > 0 || token.content.endsWith(lineSplit)) linefeed()
        }
      } else {
        curLine.addElement(token)
      }
    } else if (Array.isArray(token.content)) {
      token.content.forEach( (t) => eatLines(t))
    } else { 
      eatLines(token.content)
    }
  } // end of eatLines

  tokens.forEach( (t) => { 
    eatLines(t)
  })
  if (!curLine.isEmpty()) lines.push(curLine)
  return lines
}

const CodeBlock = (props) => {

  const [extraLanguages] = React.useState(["bash", "java", "scala"])
  const [language] = React.useState(props.className?.replace(/language-/g, '') || '')
  const [nonum] = React.useState(props.nonum?.valueOf() || false)
  const [grammar, setGrammar] = React.useState(undefined)


  const highlightCode = (g, content, useNums) => { 
    const tokens = Prism.tokenize(content, g)
    const lines = linify(tokens)
    const nodes = lines.map( (l, i) => lineToReactNode(l, i, useNums))
    return nodes
  }

  React.useEffect( () => {
    const loadGrammar = (lang, langs) => {
      const g = Prism.languages[lang]
      if (g) {
        //console.log(`Found grammar for ${lang}`)
        setGrammar(g)
      } else { 
        if (langs.length > 0) { 
          const l = langs.shift()
          import(`prismjs/components/prism-${l}`).then(
            () => { 
              //console.log(`loaded language ${l}`)
              loadGrammar(lang, langs)
            },
            () => {
              //console.log(`failed to load language ${l}`)
              loadGrammar(lang, langs)
            }
          )
        }
      }
    }
  
    //console.log(`Language = ${language}, extras=${extraLanguages}`)
    loadGrammar(language, extraLanguages)
  }, [language, extraLanguages])
  
  return(
    <div className="w-11/12 my-2 mx-auto">
      <pre className={`language-${language} rounded-xl`}>
         { grammar ? highlightCode(grammar, props.children, nonum) :  props.children }
      </pre>
    </div>
  )
}

export default CodeBlock
