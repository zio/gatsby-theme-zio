import * as React from "react"
import { Link } from "gatsby" 
import { withPrefix } from "gatsby" 

const tagLine = "Type-safe, composable asynchronous and concurrent programming for Scala"

const Jumbotron = () => { 
  return (
    <div className="container flex flex-row max-w-full w-full relative bg-black place-content-center">
      <div className="relative place-content-center">
        <div className="absolute left-0 top-1/2 w-full z-10 flex flex-col">
          <span className="text-primary-50 mx-auto text-center h-0 invisible md:visible md:h-auto">{tagLine}</span>
          <Link 
            to="/foo/2-0-0/docs" 
            className="text-primary-50 mt-4 m-auto p-4 border-solid border-primary-50 border-2 rounded-lg hover:bg-primary-600">Get Started
          </Link>
        </div>
        <img 
          alt={tagLine}
          src={`${withPrefix("/theme/img/jumbotron_pattern.png")}`}
        />
      </div>
    </div>
  ) 
}

export default Jumbotron