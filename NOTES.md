# Requirements and Issues

## Issues

### Navigation bar / Sidebars

At the moment we can only use one version of the Navigation Bar component on the ZIO Web Site as this is configured as a central component. We can have multiple sidebars on the left hand side, for example one for each version.
With Docusaurus the sidebar links are maintained in json files, so they have to be accurate to work. Currently, the build for https://github.com/zio/zio/pull/6867 is broken due to a wrong sidebar configuration. (actually fixed now with https://github.com/khajavi/zio/pull/1)

The sidebars are configured per version within Docusaurus.

### Build process

The build process to build the entire site is a bit convoluted today:

- The site is built when we push a docs tag to the zio/series/2.x branch.
- First, the build checks out a specific version of ZIO 1 so that the ZIO 1 docs can be compiled.
- The compiled docs are moved into the designated final docusaurus source directory
- Then the build checks out the series/2.x branch and compiles the documentation as well
- Finally docusaurus build is run to create the final site.

There are a few issues with that approach that need to be addressed:

The ZIO 1 documentation is still configured to use docusaurus 1 while the ZIO 2 version is using the latest beta of docusaurus 2. Without upgrading to version 2 for version 1 as well it is nearly impossible to run a site build within version 1 to validate that it can be integrated with the final website.

Version 2 having knowledge about the version 1 build is a more fundamental issue. If we think about taking the site towards including the official libraries from the ZIO ecosystem as well, with that approach the site build would have to know about the site build for all of these projects.

In an ideal scenario the docs would be compiled within the version 1 build and we would publish the compiled docs as an artifact to some known location.

If we used a standard template we could also run the compiled docs through a static site generator.

The overall site build would then include the precompiled docs to build the overall site. The advantage here is that this could be extended to include official ZIO libraries as well.

### Local build

It would be ideal for contributors to documentation to have an easy local set-up so that they could validate the look and feel and the content of the site while writing the documentation.

The shorter the feedback loop for the writer the more fun it would be to write docs. In an ideal scenario we would start sbt docs/mdoc in watch mode in one terminal and a dev server for the site in another and we would see the updates in a browser window while editing the md files.

## Requirements

- Have a team blog

- Write articles with compiled examples depending on various version mixes

  _Issue_: For example, article A needs Foo-1.0, and article B needs Foo-2.0 library. Having type-safe documentation for both of these articles is necessary

  _Solution_: We can do this using mdoc with sbt multi-module: https://github.com/khajavi/multi-module-mdoc

- State of the art SEO and Site analytics

- Have one website for the entire official ZIO ecosystem rather than 100 microsites

  _Issue_: Maintaining documentation for each project is a pain. Also having a different project microsite is not a good idea from the perspective of the end-user.

  It would be better to have a single documentation site for all projects. This site should be easy to maintain and update.

  _Solution_: With GitHub pages, any organization can have “Organization site” like this: https://<organization>.github.io and it can be customised domain like “https://zio.dev”.

  “Project site” and each organization site has a url like this: https://<organization>.github.io/<repository>. And if the “organization site” has a custom domain like “https://zio.dev” the “project site” can be accessed through: “https://zio.dev/zio-logging

  So we do not require to gather all documentations manually or through the CI process and build all of them in one place. Every project will build its microsite and the whole documentation will be available through the “https://
  zio.dev” website.

- Versioned and Upgradable Templates (Support for the unofficial ecosystem)

  Currently, any ZIO project wants to have documentation, it “COPY”s from the template and work on that. This template is not upgradable. This means if any issue we fixed in the main ZIO documentation we should manually copy that to all ZIO ecosystems.

  This will be more painful when the library is unofficial. Because we don’t want to integrate all unofficial documentation in one place. So it would be better to have a good solution for the unofficial ecosystem.

  _Candidate Solutions:_ Instead of a template for documentation, it is better to have an SBT Plugin for ZIO documentation. Similar to what `sbt-typelevel` and `sbt-typelevel-site` does.

  Also see https://www.gatsbyjs.com/blog/2019-07-03-using-themes-for-distributed-docs/#gatsby-skip-here

- Maintainable

- Easy to deploy

- Site structure (new)

  - Have an overall site with navbar and footer
  - The navbar only contains general elements
  - Navbar also has search / project-version navigation
  - Everything between the navbar and footer is rendered as a sub-site
  - A subsite can be
    - The docs for a specific library / version (ZIO 1, ZIO 2, ZIO JSon, ZIO Flow etc)
    - The ZIO team blog
    - Technical articles (Need to be treated differently as the blog)
    - Additional content (Video link gallery, recorded talks …)
    - Tutorials (might go with Articles)
    - Etc.

  Every subsite is responsible for its own display area. This will be assisted by the ZIO docs templates and pre-configured components

  Preconfigured components should make it possible to build a subsite stand-alone (without the cross-project navigation)

  We want the project / version specific documentation for any project within the ZIO ecosystem to live in the repository of that project, more specifically within the branch corresponding to a specific version (in case we want to have multi version docs for that project).

  A user who wants to write documentation, wants to edit md or mdx files with the content of his docs.

  To do so we should give the user a set of Components that we guarantee to be compatible with the overall site.

  We should also give the user a downloadable, preconfigured env with the templates installed where he can run the project / version docs locally and it would look exactly like it will look within the overall site

  The build process should precompile the md / mdx files using mdoc and package up the project/version specific mdocs and upload them to a central store (GH packages, maven repo, s3 or other).

  Along with the mdoc archive a hash will be stored.

  Most likely this package requires some metadata describing the project / version.

  The overall site has a registry of all metadata files from all projects - Adding a new project / version will require a PR with the new metadata.

  The build process for the overall site will iterate over the existing metadata and organize different projects/versions into different directories.

  The overall site has a search component based on the meta data to provide cross project navigation.

  sub-sites should bring metadata, so that cross-project navigation can be generated

  Site generator should support metadata extraction from documents (like MDX front matters)

  Having the ability to link other articles from other sub-sites is a good option. For example, in the zio-logging-doc, we can link to an article in the zio-core which is about the core logging features.

# Technology candidates (for source driven site generators)

- Docusaurus 2 https://docusaurus.io/
- Gatsby https://www.gatsbyjs.com/
- HUGO https://gohugo.io/
- NetxJS & ContentLayer https://www.contentlayer.dev/
