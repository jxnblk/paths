
import React from 'react'
import { colors } from '../data'
import previousKey from '../util/get-previous-key'

class CurveHandles extends React.Component {

  render () {
    let props = this.props
    let { ast, current, zoom } = props
    let params = ast.commands[current].params
    let handles = []
    let w = 10 / zoom

    if (Object.keys(params).length > 2) {
      let { x1, y1, x2, y2 } = params
      if (typeof x1 !== 'undefined' && typeof y1 !== 'undefined') {
        // Show lines for Q (both points)
        handles.push({
          x: x1,
          y: y1,
          params: ['x1', 'y1'],
          to: {
            x: previousKey(ast.commands, current, 'x'),
            y: previousKey(ast.commands, current, 'y')
          }
        })
      }
      if (typeof x2 !== 'undefined' && typeof y2 !== 'undefined') {
        handles.push({
          x: x2,
          y: y2,
          params: ['x2', 'y2'],
          to: {
            x: params.x,
            y: params.y
          }
        })
      }
    }

    let styles = {
      handle: {
        fill: colors.blue,
        stroke: 'none',
        cursor: 'pointer'
      },
      hit: {
        fill: 'transparent',
        stroke: 'none',
        cursor: 'pointer',
      },
      line: {
        stroke: colors.blue,
        strokeWidth: .25,
        opacity: .5
      }
    }

    if (!handles.length) {
      return false
    }

    return (
      <g>
        {handles.map(function (h, i) {
          return (
            <g key={i}>
              <path
                d={[
                  'M', h.x, h.y,
                  'L', h.to.x, h.to.y
                ].join(' ')}
                style={styles.line} />
              <rect
                x={h.x - w / 2}
                y={h.y - w / 2}
                width={w}
                height={w}
                onMouseUp={props.onMouseUp}
                style={styles.handle} />
              <rect
                x={h.x - w}
                y={h.y - w}
                width={2 * w}
                height={2 * w}
                onMouseDown={props.onMouseDown.bind(this, h.params)}
                onMouseMove={props.onMouseMove}
                onMouseUp={props.onMouseUp}
                style={styles.hit} />
            </g>
          )
        })}
      </g>
    )
  }

}

export default CurveHandles

