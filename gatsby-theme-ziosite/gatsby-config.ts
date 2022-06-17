import { GatsbyConfig } from 'gatsby';

const config : GatsbyConfig = { 
  siteMetadata: {
    title: "The ZIO Gatsby Theme"
  },
  plugins: [
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        resetCSS: true,
        isUsingColorMode: true,
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
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      }
    }
  ]
}

export default config;
