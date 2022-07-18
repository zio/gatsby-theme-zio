# zio.dev goes Gatsby

Based on our observations we have come to a decision that Docusaurus has limitations to move 
zio.dev to the place where we would like it to be. So, among the alternatives that we looked 
at, GatsBy seemed to be the most promising. 

The major benefits we are seeing:
- it has an open architecture and is extensible
- it is fairly well documented 
- there is a strong community around it
- microsites and zio.dev can share a common theme, wo would have a common L&F
- local setup is fairly simple and needs minimal customization, because all settings should come from the theme

## Gatsby in a nutshell 

- [GatsBy](https://www.gatsbyjs.com/docs) started its life as a static content generator and is built on top aj JavaScript and React. So, essentially every single page is rendered as a React Component.
- What sets Gatsby apart from other content generators is that it is designed for extension:
  - The low level Gatsby rendering input is modelled in Gatsby as nodes.
  - Gatsby provides a GraphQL interface to query nodes and that layer can be used within the React components as well. 
  - Theme providers can contribute custom node types that will be available through GraphQL as well.
  - *Being built on top of React* translates to *Being built on MDX*. In fact, that JS MDX libraries are used directly within Gatsby.
  - Standard Gatsby components/plugins exist to consume standard data such as `md/mdx` files, `YAML`, `JSON` and more.  
- The Gatsby core does not make any assumptions about the L&F of the site.
  - Like in many other static site generators the L&F is coming from *Themes*. 
  - Gatsby does not (!!) make any assumptions what the theme is built on - Material UI, Semantic UI, Tailwind or whatever. 
- Gatsby has many plugins, though it might be tricky to find a working combination. Many plugins have been released for earlier versions and Gatsby 4 has introduced some breaking features, so older plugins most like will not work. Still, there is a broad range of things that work OOTB.  
- The Gatsby API is well documented and is the main point of contact for a theme author.

## What can Gatsby do for us 

The overall idea is: if we provide a Gatsby theme with a standard L&F for ZIO related MD content we can apply that theme to an overall site like zio.dev, to single project sites and could also use a local Gatsby installation to render the site locally or use a dev server for immediate feedback while editing the MD files. 

To achieve that, every project/version that wants to use the Gatsby theme must be setup to so. Within the project's gatsby config we must not introduce any further settings as this would break the guarantee that the project's doc can be rendered in the ZIO docs universe.

The individual projects will publish their docs as a separate module (most likely a versioned NPM module within the ZIO organisation on npmjs.com). In case the docs for the project/version shall be part of zio.dev, the published module will be registered as a contributing project and will be rendered automagically. Otherwise, the gatsby generated site could be published to the GH pages branch of the project itself. 

### Provide ZIO theme

So, the first thing we need is a gatsby theme:
 
- The theme needs a configuration to distinguish between a standalone site and zio.dev.
- The theme must provide a config API to register new projects/versions
- The theme must provide standard content like social images, brand images, standard contribution pages etc. 
- The theme provides a consistent color scheme with logical names, so that the colour mapping could be changed if we wanted to. 
- The theme will provide a light / dark mode switch. 
- The theme will provide the ZIO Layout. 

### What does that mean for a single project/version 

A single project/version might be something like `ZIO 1`, `ZIO 2`, `ZIO Metrics Connectors`, `ZIO Prelude` etc. All of these shall provide self-contained documentation. If a page needs to reference content in another project / version that should be encoded as an external link.

Further, the project's documentation shall be compiled with [Scala MDoc](https://scalameta.org/mdoc/) and the compiled md files are the actual input to gatsby. 

The projects must have a valid Gatsby configuration referencing the *ZIO theme*. 

The CI process for the project should contain steps for compiling the docs and also for building a stand-alone gatsby site. The latter is either published to NPM or deployed th GH pages.

> **TODO**: provide examples of a minimal project config and CI steps 

### Local documentation editing 

Assuming a local installation of Gatsby, a contributor can just start 

```
yarn start
```

from the projects `website`directory. That will bring a Gatsby development server at http://localhost:8000. A dev server also provides a graphql frontend for the local site at http://localhost:8000/___graphql. The latter can be used to investigate the datamodel of the rendered site.  

### CI Build process

> **TODO**: Provide examples

### Publish documentation modules compatible with zio.dev

We will create an organization `@zio` on NPM where we publish our generated sub sites to, so that they can be integrated in zio.dev. 

### Deploy to zio.dev

Within https://github.com/zio/zio-docs we will reference all sub sites that shall be integrated with zio.dev. 

At the moment, registering is a 3 part process:

- Include the subsites in `package.json`

```
...
"dependencies": {
  "@atooni/gatsby-theme-ziodoc": "^0.0.9",
  "@atooni/zio-core": "^1.0.2",
  "@atooni/zio-core-2": "npm:@atooni/zio-core@^2.0.0",
  "@atooni/zio-metrics-connectors": "2.0.0",
  ...
}
```

- Register the directories containing the sub site´s md files in `gatsby-config.js`

```
const config = { 
  pathPrefix: "/gatsby-theme-zio",
  siteMetadata: {
    title: "ZIO Sample Site"
  },
  plugins: [
    '@atooni/gatsby-theme-ziodoc',
    {
      resolve: `gatsby-source-filesystem`,
      options: { 
        name: "zio",
        path: `${__dirname}/node_modules/@atooni/zio-core/src/docs`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { 
        name: "zio-2",
        path: `${__dirname}/node_modules/@atooni/zio-core-2/src/docs`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { 
        name: "metrics-connectors",
        path: `${__dirname}/node_modules/@atooni/zio-metrics-connectors/src/docs`,
      }
    }
  ]
}

module.exports = config;
```

- Provide project meta data to gatsby in `projects.json´

```
- name: "site"
  version: "1.0.0"
  sourceInstance: "docs"
- name: "ZIO"
  version: "1.0.0"
  sourceInstance: "zio"
- name: "ZIO"
  version: "1.0.0"
  sourceInstance: "zio-2"
- name: "ZIO Metrics Connectors"
  version: "2.0.0"
  sourceInstance: "metrics-connectors"
```

### Deploy to GH Pages (as a standalone doc site)

> **TODO**: Provide an example for GH actions



