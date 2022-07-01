import * as React from "react";

const Root = (props) => { 
  return(
    <div className="container flex flex-col max-w-full w-full">
      <section className="bg-primary-100">
        {props.children}
      </section>
    </div>
  )
}

export default Root 