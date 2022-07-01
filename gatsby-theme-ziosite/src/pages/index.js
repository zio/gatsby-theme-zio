const React = require("react");
const Jumbotron = require("../components/index/jumbotron")
const Features = require("../components/index/features")
const Sponsors = require("../components/index/sponsors")

const IndexPage = () => { 
  return (
    <main>
      <Jumbotron />
      <section id="features">
        <Features />
      </section>
      <section id="sponsors" className="bg-primary-300">
        <Sponsors />
      </section>
    </main>
  )
}

export default IndexPage