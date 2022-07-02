import * as React from "react"
import Social from "./idx/social"
import { withPrefix } from "gatsby" 

const year = new Date().getFullYear()

const Footer = () => { 
  return(
    <div className="container max-w-full w-full bg-primary-700 text-primary-50 flex flex-col">
      <div className="flex flex-col md:flex-row justify-center p-4">
        <img className="flex-initial m-4 max-w-200" src={`${withPrefix("/theme/img/navbar_brand.png")}`} alt="zio" />
        <Social title="Github">
          <a href="https://github.com/zio/zio" className="m-auto">
            <img src="https://img.shields.io/github/stars/zio/zio?style=social" alt="github" />
          </a>
        </Social>
        <Social title="Chat with us on Discord">
          <a href="https://discord.gg/2ccFBr4" className="m-auto">
            <img src="https://img.shields.io/discord/629491597070827530?logo=discord&amp;style=social" alt="discord"/>
          </a>
        </Social>
        <Social title="Follow us on Twitter">
          <a href="https://twitter.com/zioscala" className="m-auto">
            <img src="https://img.shields.io/twitter/follow/zioscala?label=Follow&amp;style=social" alt="twitter"/>
          </a>
        </Social>
        <Social title="Additional resources">
          <a href="https://javadoc.io/doc/dev.zio/zio_2.12/" className="m-auto">ScalaDoc of ZIO</a>
        </Social>
      </div>
      <p className="flex w-full text-sm justify-center pb-4">Copyright © {year} - ZIO Maintainers - Built with <a className="ml-1 underline" href="https://www.gatsbyjs.com/">Gatsby</a></p>
    </div>
  )
}

export default Footer