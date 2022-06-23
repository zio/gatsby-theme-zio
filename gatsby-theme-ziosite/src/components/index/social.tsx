import * as React from "react";

type SocialProps = { 
  title: string,
  children?: any
}

const Social : React.FC<SocialProps> = ({title, children} : SocialProps) => { 
  return(
    <div className="flex-initial flex flex-col m-4">
      <h1 className="text-center text-lg font-bold w-full">{title}</h1>
      {children}
    </div>
  )
}

export default Social