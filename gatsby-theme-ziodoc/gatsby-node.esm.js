import * as fs from "fs"
import * as path from "path"
import * as utils from "./src/utils"

// Make sure the data directory exists.
exports.onPreBootstrap = ({reporter}) => {
  const dataPath = 'data';

  if (!fs.existsSync(dataPath)) { 
    reporter.info(`Creating directory ${dataPath}.`);
    fs.mkdirSync(dataPath, {recursive: true});
  } else { 
    reporter.info(`Using existing <${dataPath}> directory`);
  }
}

export const createPages = ({ graphql, actions, reporter}) => {
 
  const { createPage } = actions
  const MdxComponent = path.resolve("./src/components/mdxcontent/MdxContent.js")

  return new Promise( (resolve, reject) => {
    resolve(
      graphql(`
        {
          allFile {
            nodes {
              relativeDirectory
              relativePath
              name
              internal {
                mediaType
              }
              children {
                ... on Mdx {
                  id
                  fileAbsolutePath
                }
              }
              sourceInstanceName
            }
          }
          allProjectYaml {
            nodes {
              id
              name
              version
              sourceInstance
            }
          }
          allSitePlugin(filter: {name: {eq: "gatsby-source-filesystem"}}) {
            nodes {
              pluginOptions
              name
            }
          }
        }
      `)
    )
  }).then( result => {
    // The array of all projects
    const projects = result.data.allProjectYaml.nodes
    // From the file source plugins we just need the pluginOptions
    const plugins = result.data.allSitePlugin.nodes.map(p => p.pluginOptions)

    // extract the pluginOptions by src instance name
    const src = inst => { return plugins.find(p => p.name === inst) }

    // get the project by src instance name
    const project = inst => { return projects.find(p => p.sourceInstance === inst) } 

    const mdxFiles = result.data.allFile.nodes.filter(f => f.internal.mediaType === "text/markdown" || f.internal.mediaType === "text/mdx")

    mdxFiles.forEach( file => {
      if (file.children.length >= 1) {
        const prj = project(file.sourceInstanceName)
        const mdxChild = file.children.shift()

        // in case we do have an index page we will serve that at the address of the directory name 
        const basePath = prj ? `${prj.name}/${prj.version}` : ''
        const slug =  (utils.slugify(`${basePath}/${file.relativeDirectory}/${file.name}`)).replace(/\/index$/, '')

        const source = src(file.sourceInstanceName)
        reporter.info(`Creating page ${slug} -- ${basePath}`)
        createPage({
          path: slug,
          component: MdxComponent,
          context: {
            filePath: mdxChild.fileAbsolutePath
          }
        })
      }
    })
  })
}
