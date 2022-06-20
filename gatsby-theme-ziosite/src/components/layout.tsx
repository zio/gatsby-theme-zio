import * as React from "react";
import NavBar from "./navbar";

const Layout = (props : React.PropsWithChildren) => { 
  return(
    <div className="container flex flex-col max-w-full w-full">
      <header className="bg-primary-900 text-primary-50">
        <NavBar />
      </header>
      <section className="bg-primary-100">
        {props.children}
      </section>
      <footer className="bg-primary-700 text-primary-50">
        <h1>Footer</h1>
      </footer>
    </div>
  )
}

export default Layout