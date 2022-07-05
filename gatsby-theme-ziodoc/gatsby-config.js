module.exports = {
  pathPrefix: "/gatsby-theme-zio",
  siteMetadata: {
    title: `ZIO Gatsby Theme`,
    description: `A Gatsby theme for creating ZIO documentation sites`,
    author: `@atooni`,
    siteUrl: `https://zio.dev`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-postcss',
    'gatsby-transformer-yaml',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/data/`
      }
    },
     // Configure the file system plugin for standard pages
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`
      }
    },
    // Configure the file system plugin for generated docs
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/src/docs/`
      }
    },
    // Configure a sample sub site for testing the theme
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `zio`,
        path: `${__dirname}/node_modules/@atooni/zio-core/src/docs/`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      }
    }
  ],
}
