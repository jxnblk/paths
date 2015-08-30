
import React from 'react'
import { min, max } from 'lodash'
import { colors } from '../data'

class PathHandles extends React.Component {

  render() {
    const {
      ast,
      handleScale,
      handleMouseMove,
      handleMouseUp
    } = this.props
    const xPoints = ast.commands.map((command) => {
      return command.params.x || null
    })
    const yPoints = ast.commands.map((command) => {
      return command.params.y || null
    })
    const minX = min(xPoints)
    const maxX = max(xPoints)
    const minY = min(yPoints)
    const maxY = max(yPoints)
    const width = maxX - minX + 6
    const height = maxY - minY + 6
    const x = minX - 3
    const y = minY - 3
    const styles = {
      rect: {
        fill: 'none',
        stroke: colors.blue,
        strokeWidth: .25,
        opacity: .5
      },
      handle: {
        fill: colors.blue,
        stroke: 'none',
        cursor: 'nwse-resize'
      },
      handle2: {
        fill: colors.blue,
        stroke: 'none',
        cursor: 'nesw-resize'
      }
    }

    const handles = [
      {
        x: x - 1,
        y: y - 1,
        style: styles.handle
      },
      {
        x: maxX + 2,
        y: maxY + 2,
        style: styles.handle
      },
      {
        x: x - 1,
        y: maxY + 2,
        style: styles.handle2
      },
      {
        x: maxX + 2,
        y: y - 1,
        style: styles.handle2
      },
    ]

    return (
      <g>
        <rect width={width}
          height={height}
          x={x}
          y={y}
          style={styles.rect} />
        {handles.map((handle, i) => {
          return (
            <rect
              key={i}
              width={2}
              height={2}
              {...handle}
              onMouseDown={handleScale}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />
          )
        })}
      </g>
    )
  }

}

export default PathHandles

