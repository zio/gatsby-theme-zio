import * as fs from "fs"
import * as path from "path"
import * as prj from "./src/utils/projects"

const mdxComponent = path.resolve("./src/components/mdxcontent/MdxContent.js")

// Make sure the path src/docs exists.
exports.onPreBootstrap = ({reporter}) => {
  const docsPath = 'src/docs';

  if (!fs.existsSync(docsPath)) { 
    reporter.info(`Creating directory ${docsPath}.`);
    fs.mkdirSync(docsPath, {recursive: true});
  } else { 
    reporter.info(`Using existing src/docs directory`);
  }
}

exports.onCreateNode = (params) => { 

  const node = params.node
  const { createNodeField } = params.actions

  if (node.internal.type && node.internal.type === `File`) {

    const src = `${node.sourceInstanceName}`
    const relFile = `${node.relativeDirectory}/${node.name}`
    const slug = prj.projectSlug(src, relFile)
    const project = prj.projectBySourceInstance(src)

    if (project) { 
      createNodeField({
        node,
        name: 'project',
        value: project
      })
    }

    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter}) => {
 
  const { createPage } = actions

  const createSubSitePages = async (
    prj
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

  prj.projects.forEach(async (p) => { 
    reporter.info(`Processing project ${JSON.stringify(p)}`)
    const pages = await createSubSitePages(p)
    pages.data.allFile.nodes.forEach((n) => {
      if (n.children.length >= 1) {
        reporter.info(`Creating page ${n.fields.slug}`)
        const mdxChild = n.children[0]
        createPage({
          path: `${n.fields.slug}`,
          component : mdxComponent,
          context: {
            filePath: mdxChild.fileAbsolutePath
          },
        })
      }
    })
  })
}
