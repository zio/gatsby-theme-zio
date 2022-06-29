import { GatsbyNode, Actions, Node, CreatePageArgs} from "gatsby";
import { readFileSync, existsSync, mkdirSync } from "fs"; 
import path from "path";
import { ProjectRef } from "./src/utils/sitetypes";

function findFile(fn: string) : string { 
  const dirs = [ 
    ".", 
    "node_modules/@atooni/gatsby-theme-ziosite", 
    "../gatsby-theme-ziosite"
  ]

  const idx = dirs.findIndex ( (d) => { 
    const fileName = path.resolve(d, fn)
    const exists = existsSync(fileName)
    return exists
  } )

  if (idx >= 0) { 
    return path.resolve(dirs[idx], fn)
  } else {
    return path.resolve(fn)
  }
}

const mdxComponent : string = findFile("./src/components/simple.tsx")
const projectFile = findFile("./projects.json")

const projects : Array<ProjectRef> = JSON.parse(readFileSync(projectFile, "utf-8")).projects

function prjSlug(srcInstance: string, baseSlug : string) : string {
  const prj = projects.find( (p) => p.sourceInstance === srcInstance )
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

export const onCreateNode : GatsbyNode["onCreateNode"] = (params) => { 

  const node = params.node
  const { createNodeField } = params.actions

  if (node.internal?.type && node.internal?.type === `File`) {

    const src = `${node.sourceInstanceName}`
    const relFile = `${node.relativeDirectory}/${node.name}`
    const mType = `${node.internal?.mediaType}`

    if (mType === `text/markdown` || mType === `text/mdx`) { 
      const slug = prjSlug(src, relFile)

      createNodeField({
        node,
        name: 'slug',
        value: slug
      })
    }
  }
}

export const onCreatePage : GatsbyNode["onCreatePage"] = (params) => {

  const { createPage, deletePage } = params.actions

  if (`${params.page.component}`.match(/mdx?$/)) { 
    const oldPage = params.page
    
    const newPage = { 
      ...oldPage,
      component: mdxComponent,
      context: { 
        ...oldPage.context,
        filePath: `${oldPage.component}`
      }
    }

    deletePage(oldPage)
    createPage(newPage)
  }
}

export const createPages : GatsbyNode["createPages"] = async ({ graphql, actions }) => {
 
  const { createPage } = actions

  interface SubSiteNode { 
    fields: { 
      slug: string
    },
    children: Array<{
      id: string, 
      fileAbsolutePath,
      slug: string
    }>
  }

  interface SubSiteResult { 
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
                fileAbsolutePath
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
        if (n.children.length >= 1) { 
          const mdxChild = n.children[0]
          createPage({
            path: n.fields.slug,
            component: mdxComponent,
            context: {
              filePath: mdxChild.fileAbsolutePath
            },
          })
        }
      })
    })
  })
}
