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
    }

  ]
}

module.exports = config;