
import React from 'react'
import qs from 'qs'
import { stringify, parse } from 'path-ast'
import { debounce } from 'lodash'
import roundAst from '../util/round-ast'

class UrlHistory extends React.Component {

  constructor () {
    super ()
    this.updateUrl = debounce(this.updateUrl.bind(this), 200)
    this.updateState = this.updateState.bind(this)
  }

  updateUrl (manual) {
    const { props } = this
    const history = window.history
    const ast = roundAst(props.ast)
    const d = stringify(ast)
    const q = qs.stringify({
      d: d
    })
    history.pushState(d, '', '?' + q)
  }

  updateState (e) {
    const { props } = this
    const q = window.location.search.replace(/^\?/, '')
    const params = qs.parse(q)
    if (params.d) {
      const ast = parse(params.d)
      props.updateAst(ast)
    }
  }

  componentDidMount () {
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

export default UrlHistory

