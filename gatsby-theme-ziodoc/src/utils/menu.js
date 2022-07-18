export class Menu {
  constructor(id, label = undefined, link = undefined) {
    if (typeof id === "string") {
      const parts = id.split("_")
      console.log(parts)

      this.id = id
      this.pos = 0
      this.name = label
      this.link = link
      this.entries = {}
    } else {
      throw `A menu must be contructed with a string`
    }
  }

  orderedEntries() {
    return Object.getOwnPropertyNames(this.entries)
  }

  addEntry(e, label = undefined) {
    if (Array.isArray(e)) {
      if (e.length > 0) {
        const lvl = e.shift()
        const entry = this.ensureEntry(lvl)
        entry.addEntry(e)
      }
    } else if (Object.getPrototypeOf(e) === Menu.prototype) {
      ensureEntry(e.id, e.label)
    } else if (typeof (e) === "string") {
      this.ensureEntry(e, label)
    } else {
      throw "Boom"
    }
  }

  ensureEntry(id, label = undefined) {
    if (!this.entries.hasOwnProperty(id)) {
      const newEntry = new Menu(id, label)
      this.entries[id] = newEntry
    }

    return this.entries[id]
  }
}

