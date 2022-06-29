const config = { 
  siteMetadata: {
    title: "ZIO Sample Site"
  },
  plugins: [
    'gatsby-plugin-postcss',
    '@atooni/gatsby-theme-ziosite',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      }
    }
  ]
}

module.exports = config;