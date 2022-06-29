export declare type ProjectRef = {
    sourceInstance: string;
    projectName: string;
    version: string;
};
export declare type ContentPageProps = {
    mdx: {
        id: string;
        slug: string;
        frontmatter: FrontMatter;
        body: string;
    };
};
export declare type FrontMatter = {
    id?: string;
    sidebar_label?: string;
    title: string;
};
//# sourceMappingURL=sitetypes.d.ts.map