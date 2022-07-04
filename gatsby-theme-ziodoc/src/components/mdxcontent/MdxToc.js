import * as React from "react"
import * as Utils from "../../utils"
import { Link } from "gatsby"

const MdxToc = ({lvl = [], toc}) => {

  const single = (entry,i) => {

    const target = entry.title ? Utils.slugify(entry.title) : undefined
    const nestedLvl = [...lvl]
    nestedLvl.push(`${i}`)
    const lvlKey = nestedLvl.join("-")

    return(
      <div key={lvlKey}>
        { target
          ?  <div className="p-1"><Link to={`#${target}`} className="p-1 rounded-md hover:bg-primary-300">{entry.title}</Link></div>
          : <></> 
        }
        { entry.items ? <MdxToc lvl={nestedLvl} toc={entry.items} /> : <></> }
      </div>
    )
  }
  
  const subToc = Array.isArray(toc) 
    ? <div className="flex-flex-column"> 
       {toc.map( (entry, i) => single(entry, i))}
      </div>
    : single(toc,0)

  return(
    <div className="pl-2">
      {subToc}
    </div>
  )
}

export default MdxToc