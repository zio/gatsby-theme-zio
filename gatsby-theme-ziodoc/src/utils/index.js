/**
 * Turn a given string into a useful slug that can be used as part of a URL.
 * 
 * @param str The input string.
 * @returns The slugified string
 */
exports.slugify = (str) => { 
  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9/]+/g, '-')
    .replace(/(^--$)+/g, '')

    return `${slug}`.replace(/\/\/+/g, '/')
}
