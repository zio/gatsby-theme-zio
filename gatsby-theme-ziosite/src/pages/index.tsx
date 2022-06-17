import * as React from "react";
import type { PageProps } from "gatsby";
import { Box } from "@chakra-ui/react";

const IndexPage = ( { path } : PageProps ) => { 
  return (
    <main>
      <h1>Hello World !</h1>
      <p>Path: {path}</p>
      <Box bg="primary" color="black">Test !</Box>
    </main>
  )
}

export default IndexPage