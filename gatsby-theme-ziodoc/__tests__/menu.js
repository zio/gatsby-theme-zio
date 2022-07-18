import * as jest from "@jest/globals"
import {Menu} from "../src/utils/menu.js"

jest.test("Just test something", () => {
  const m = new Menu("Foo")
  m.addEntry(["Bar", "Box"])
  m.addEntry(["Bar", "Bus", "Bam"])
  console.log(JSON.stringify(m, null, 2))

  jest.expect(m.id).toBe("Foo")
})
