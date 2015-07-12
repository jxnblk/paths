
import React from 'react'
import pathast from 'path-ast'

class Path extends React.Component {

  render () {
    let { ast, preview } = this.props

    let styles = {
      opacity: preview ? 1 : .75
    }

    return (
      <g style={styles}>
        <path d={pathast.stringify(ast)} />
      </g>
    )
  }

}

export default Path

