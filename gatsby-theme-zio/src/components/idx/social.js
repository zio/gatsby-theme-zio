import * as React from "react";


const Social = ({title, children}) => { 
  return(
    <div className="flex-initial flex flex-col m-4">
      <h1 className="text-center text-lg font-bold w-full">{title}</h1>
      {children}
    </div>
  )
}

export default Social