import * as fs from "fs"
import * as path from "path"
import * as utils from "./src/utils"
import * as menu from "./src/utils/menu"

const fsp = fs.promises

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

const listDirs = async (dir) => {
  const res = await fsp.readdir(dir)
  return res
}

export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions 

  const typeDefs = `
    type ProjectYaml implements Node {
      name: String!
      version: String!
      sourceInstance: String!
    }
  `

  createTypes(typeDefs)
}

// get the project by src instance name
function project(projects, inst) { 
  return projects.find(p => p.sourceInstance === inst) 
} 

function buildMenus(mdxFiles, projects) { 
  const root = new menu.Menu("root")

  projects.forEach( p => {
    root.addEntry([p.name, p.version])
  })

  mdxFiles.forEach( file => {
    if (file.children.length >= 1) {
      const prj = project(projects, file.sourceInstanceName)
      const mdxChild = file.children[0]

      var menuPath = []
      if (prj) {
        menuPath.push(prj.name)
        menuPath.push(prj.version)
      }

      file.relativeDirectory.split("/").forEach(p => menuPath.push(p))
      menuPath.push(file.name)

      root.addEntry(menuPath)

    }
  })

  return root
}
  
export const createPages = ({ graphql, actions}) => {
 
  const { createPage } = actions
  const MdxComponent = path.resolve("./src/components/mdxcontent/MdxContent.js")

  return new Promise( (resolve, _) => {
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
                  frontmatter {
                    title
                    sidebar_label
                  }
                  fileAbsolutePath
                }
              }
              sourceInstanceName
            }
          }
          allProjectYaml {
            nodes {
              name
              version
              sourceInstance
            }
          }
        }
      `)
    )
  }).then( result => {
    // The array of all projects
    const projects = result.data.allProjectYaml.nodes

    // Just get the mdx files 
    const mdxFiles = result.data.allFile.nodes.filter(f => f.internal.mediaType === "text/markdown" || f.internal.mediaType === "text/mdx")

    const menus = buildMenus(mdxFiles, projects)
    console.log(mdxFiles)

    mdxFiles.forEach( file => {
      if (file.children.length >= 1) {
        const prj = project(projects, file.sourceInstanceName)
        const mdxChild = file.children.shift()

        // in case we do have an index page we will serve that at the address of the directory name 
        const basePath = prj ? `${prj.name}/${prj.version}` : ''
        var slug =  (utils.slugify(`${basePath}/${file.relativeDirectory}/${file.name}`)).replace(/\/index$/, '/')
        
        console.log(`${mdxChild.fileAbsolutePath}`)
        createPage({
          path: slug,
          component: MdxComponent,
          context: {
            menus: menus,
            project: prj,
            filePath: mdxChild.fileAbsolutePath
          }
        })
      }
    })
  })
}
