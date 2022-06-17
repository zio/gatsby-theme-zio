import { Actions, GatsbyNode } from "gatsby";
import { existsSync, mkdirSync } from "fs"; 
import path from "path";


/**
 * Turn a given string into a useful slug that can be used as part of a URL.
 * 
 * @param str The input string.
 * @returns The sluggified string
 */
const slugify = (str: string) => { 
  const basePath = '/';

  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9\/]+/g, '-')
    .replace(/(^-\-$)+/g, '')

    return `/${basePath}/${slug}`.replace(/\/\/+/g, '/')
}

// Make sure the path src/docs exists.
export const onPreBootstrap : GatsbyNode["onPreBootstrap"]= ({reporter}) => {
  const docsPath = 'src/docs';

  if (!existsSync(docsPath)) { 
    reporter.info(`Creating directory ${docsPath}.`);
    mkdirSync(docsPath, {recursive: true});
  } else { 
    reporter.info(`Using exiting src/docs directory`);
  }
}

export const onCreateNode : GatsbyNode["onCreateNode"] = ({ node, _, actions}) => { 

  const { createNodeField } = actions

  if (node.internal.type && node.internal.type === `File`) { 
    if (node.sourceInstanceName && node.sourceInstanceName === `docs`) { 
      createNodeField({
        node,
        name: 'slug',
        value: slugify(`zio-metrics-connectors/2.0.0/${node.relativeDirectory}/${node.name}`)
      })
    } else { 
      createNodeField({
        node,
        name: 'slug',
        value: slugify(`${node.relativeDirectory}/${node.name}`)
      })
    }
  }
}

export const createPages : GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result : { data? : any } = await graphql(`
    {
      allFile(filter: {sourceInstanceName: {eq: "docs"}}) {
        nodes {
          fields {
            slug
          }
          children {
            ... on Mdx {
              id
              slug
            }
          }
        }
      }
    }
  `)

  const templatePath = path.resolve(`./src/components/simple.tsx`)
  
  result.data.allFile.nodes.forEach((node: any) => {
    createPage({
      path: node.fields.slug,
      component: templatePath,
      context: {
        mdxId: node.children[0].id,
        slug: node.fields.slug,
      },
    })
  })
}
