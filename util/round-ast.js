
import { round } from 'lodash'

export default function(ast, precision) {
  ast.commands = ast.commands.map(function(com) {
    let params = {}
    Object.keys(com.params).forEach(function(key) {
      params[key] = round(com.params[key], precision || 6)
    })
    com.params = params
    return com
  })
  return ast
}

