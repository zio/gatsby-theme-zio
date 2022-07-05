import * as Utils from "./index"

export const projects = [
  {
    "projectName": "site",
    "version": "1.0.0",
    "sourceInstance": "docs"
  },
  {
    "projectName": "zio",
    "version": "1.0.0",
    "sourceInstance": "zio"
  }
]

export const projectBySourceInstance = (instance) => { 
  return projects.find( (p) => p.sourceInstance === instance)
}

export const projectSlug = (instance, baseSlug) => {
  const prj = projectBySourceInstance(instance)
  if (typeof prj !== "undefined") { 
    return "/" + Utils.slugify(`${prj.projectName}/${prj.version}/${baseSlug}`)
  } else {  
    return "/" + Utils.slugify(baseSlug)
  }
}
