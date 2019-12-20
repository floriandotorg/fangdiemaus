export default (definition, print) => {
  const fs = []

  definition({ onPlayBegins: f =>  fs.push(f), say: print})
  return () => {
    fs.forEach(f => f())
  }
}
