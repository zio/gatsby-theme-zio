module.exports = {
  pathPrefix: "/gatsby-theme-zio",
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@zio`,
    siteUrl: `https://zio.dev`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-postcss',
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
