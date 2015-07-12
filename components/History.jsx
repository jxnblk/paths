
import React from 'react'
import qs from 'qs'
import pathast from 'path-ast'
import { debounce } from 'lodash'
import roundAst from '../util/round-ast'

class History extends React.Component {

  constructor () {
    super ()
    this.updateUrl = debounce(this.updateUrl.bind(this), 200)
  }

  updateUrl () {
    let props = this.props
    let ast = roundAst(props.ast)
    let q = qs.stringify({
      d: pathast.stringify(ast)
    })
    window.history.pushState(this.state , '', '?' + q)
  }

  componentDidMount () {
    let props = this.props
    if (typeof window !== 'undefined') {
      let params = qs.parse(window.location.search.replace(/^\?/, ''))
      if (params.d) {
        let ast = pathast.parse(params.d)
        props.updateAst(ast)
      }
    }
  }

  componentDidUpdate () {
    this.updateUrl()
  }

  render () {
    return false
  }

}

export default History

