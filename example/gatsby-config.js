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