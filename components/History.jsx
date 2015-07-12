
import React from 'react'
import qs from 'qs'
import pathast from 'path-ast'
import { debounce } from 'lodash'
import roundAst from '../util/round-ast'

class History extends React.Component {

  constructor () {
    super ()
    this.updateUrl = debounce(this.updateUrl.bind(this), 200)
    this.updateState = this.updateState.bind(this)
  }

  updateUrl (manual) {
    let props = this.props
    let history = window.history
    let ast = roundAst(props.ast)
    let q = qs.stringify({
      d: pathast.stringify(ast)
    })
    history.pushState(ast, '', '?' + q)
  }

  updateState (e) {
    let props = this.props
    let q = window.location.search.replace(/^\?/, '')
    let params = qs.parse(q)
    if (params.d) {
      let ast = pathast.parse(params.d)
      props.updateAst(ast)
    }
  }

  componentDidMount () {
    let props = this.props
    this.updateState()
    //window.addEventListener('popstate', this.updateState)
  }

  componentWillUnmount () {
    //window.removeEventListener('popstate', this.updateState)
  }

  componentDidUpdate () {
    this.updateUrl()
  }

  render () {
    return false
  }

}

export default History

