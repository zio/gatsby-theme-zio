export type ContentPageProps = {
  mdx: { 
    id: string, 
    slug: string,
    frontmatter: FrontMatter,
    body: string
  }
}

export type FrontMatter = {
  id? : string, 
  sidebar_label?: string, 
  title: string
}