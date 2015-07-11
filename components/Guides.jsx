
import React from 'react'
import pathast from 'path-ast'

class Guides extends React.Component {

  render () {
    let { ast, current } = this.props
    let styles = {
      g: {
        fill: 'none',
        stroke: 'currentcolor',
        vectorEffect: 'non-scaling-stroke'
      },
      guides: {
      },
      current: {
        stroke: 'cyan'
      }
    }
    let currentC = {
      commands: [
        ast.commands[current - 1] || ast.commands[0],
        ast.commands[current]
      ]
    }
    let currentD = pathast.stringify(currentC)

    return (
      <g style={styles.g}>
        <path d={pathast.stringify(ast)}
          style={styles.guides} />
        <path d={currentD}
          style={styles.current} />
      </g>
    )
  }

}

export default Guides

