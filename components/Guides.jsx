
import React from 'react'
import pathast from 'path-ast'
import getPrevKey from '../util/get-previous-key'

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
        vectorEffect: 'non-scaling-stroke',
        strokeWidth: 2,
      },
      current: {
        vectorEffect: 'non-scaling-stroke',
        strokeWidth: 3,
        stroke: 'cyan'
      }
    }

    let currentC = {
      commands: [
        {
          type: 'M',
          params: {
            x: getPrevKey(ast.commands, current, 'x'),
            y: getPrevKey(ast.commands, current, 'y'),
          }
        },
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

