const fs = require("fs")
const path = require("path")

const mdxComponent = findFile("./src/components/simple.js")
const projectFile = findFile("./projects.json")

const projects = JSON.parse(fs.readFileSync(projectFile, "utf-8")).projects

function findFile(fn) { 
  const dirs = [ 
    ".", 
    "node_modules/@atooni/gatsby-theme-ziodoc", 
    "../gatsby-theme-ziosite"
  ]

  const idx = dirs.findIndex ( (d) => { 
    const fileName = path.resolve(d, fn)
    const exists = fs.existsSync(fileName)
    return exists
  } )

  if (idx >= 0) { 
    return path.resolve(dirs[idx], fn)
  } else {
    return path.resolve(fn)
  }
}

function prjSlug(srcInstance, baseSlug) {
  const prj = projects.find( (p) => p.sourceInstance === srcInstance )
  if (typeof prj !== "undefined") { 
    return slugify(`${prj.projectName}/${prj.version}/${baseSlug}`)
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
const slugify = (str) => { 
  const basePath = '/';

  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9\/]+/g, '-')
    .replace(/(^-\-$)+/g, '')

    return `/${basePath}/${slug}`.replace(/\/\/+/g, '/')
}

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

  projects.forEach(async (p) => { 
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
