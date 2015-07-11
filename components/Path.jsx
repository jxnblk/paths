
import React from 'react'
import pathast from 'path-ast'

class Path extends React.Component {

  render () {
    let { ast } = this.props

    let styles = {
      opacity: .75
    }

    return (
      <g style={styles}>
        <path d={pathast.stringify(ast)} />
      </g>
    )
  }

}

export default Path

