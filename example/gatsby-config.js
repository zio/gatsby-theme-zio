const config = { 
  siteMetadata: {
    title: "ZIO Sample Site"
  },
  plugins: [
    // The only plugin we want to see in here is the ZIO theme 
    {
      resolve: `@atooni/gatsby-theme-ziosite`
    }
  ]
}

module.exports = config;