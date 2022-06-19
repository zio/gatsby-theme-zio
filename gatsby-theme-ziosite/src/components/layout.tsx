import * as React from "react";
import NavBar from "./navbar";

const Layout = (props : React.PropsWithChildren) => { 
  return(
    <>
      <header>
        <h1>Header</h1>
      </header>
      <section>
        {props.children}
      </section>
      <footer>
        <h1>Footer</h1>
      </footer>
    </>
  )
}

export default Layout