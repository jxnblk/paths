
import pathast from 'path-ast'

export default function (ast) {
  let d = pathast.stringify(ast)
  let svg = `
<!-- Generated with http://jxnblk.com/paths -->
<svg
  xmlns='http://www.w3.org/2000/svg'
  viewBox='0 0 64 64'
  width='64' height='64'
  fill='currentcolor'>
  <path d='${d}' />
</svg>`
  return svg
}

