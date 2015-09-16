
import { stringify } from 'path-ast'
import { cloneDeep, round } from 'lodash'

export default function(originalAst, precision) {
  let ast = cloneDeep(originalAst)
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

