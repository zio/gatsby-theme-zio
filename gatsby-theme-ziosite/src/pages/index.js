import * as React from "react";
const IndexPage = ({ path }) => {
    return (React.createElement("main", null,
        React.createElement("h1", null, "Hello World !"),
        React.createElement("p", null,
            "Path: ",
            path)));
};
export default IndexPage;
