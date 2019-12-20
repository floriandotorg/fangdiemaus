export default ({ onPlayBegins, say }) => {
  onPlayBegins(() => say('test *test*'))
}
