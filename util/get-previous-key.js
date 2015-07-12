
export default function (commands, index, key) {
  for (var i = index - 1; i > -1; i--) {
    if (commands[i] && commands[i].params[key]) {
      return commands[i].params[key]
    }
  }
  return 0
}

