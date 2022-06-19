import { GatsbyNode, Actions, Node, CreatePageArgs} from "gatsby";
import { existsSync, mkdirSync } from "fs"; 
import path from "path";
import { ProjectRef } from "./src/utils/sitetypes";
import { projects } from "./projects";

function prjSlug(srcInstance: string, baseSlug : string) : string {
  const prj =projects.find( (p) => p.sourceInstance === srcInstance )
  if (typeof prj !== "undefined") { 
    return slugify(`${prj!.projectName}/${prj!.version}/${baseSlug}`)
  } else {  
    return slugify(baseSlug)
  }
}

/**
 * Turn a given string into a useful slug that can be used as part of a URL.
 * 
 * @param str The input string.
 * @returns The slugified string
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
    reporter.info(`Using existing src/docs directory`);
  }
}

export const onCreateNode : GatsbyNode["onCreateNode"] = ({ node, _, actions}) => { 

  const { createNodeField } = actions

  if (node.internal.type && node.internal.type === `File`) { 
    createNodeField({
      node,
      name: 'slug',
      value: prjSlug(`${node.sourceInstanceName}`, `${node.relativeDirectory}/${node.name}`)
    })
  }
}

export const createPages : GatsbyNode["createPages"] = async ({ graphql, actions }) => {
 
  const { createPage } = actions

  type SubSiteNode = { 
    fields: { 
      slug: string
    },
    children: Array<{
      id: string, 
      slug: string
    }>
  }

  type SubSiteResult = { 
    data?: {
      allFile: { 
        nodes: [SubSiteNode]
      }
    }
  }
  
  const createSubSitePages = async (
    prj : ProjectRef
  ) => {
    return await graphql(`
      {
        allFile(filter: {sourceInstanceName: {eq: "${prj.sourceInstance}"}}) {
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
  }

  projects.forEach( async (p) => { 
    createSubSitePages(p).then( (qPages) => {
      const pages = <SubSiteResult>qPages
      pages.data!.allFile.nodes.forEach((n: SubSiteNode) => {
        createPage({
          path: n.fields.slug,
          component: path.resolve(p.component),
          context: {
            mdxId: n.children[0].id,
            slug: n.fields.slug,
          },
        })
      })
    })
  })
}
