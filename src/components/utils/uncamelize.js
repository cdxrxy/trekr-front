export function uncamelize(text, separator = '_') {
  return text
    .replace(/[A-Z]/g, (letter) => separator + letter.toLowerCase())
    .replace('/^' + separator + '/', '')
}
