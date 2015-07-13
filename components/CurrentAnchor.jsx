
import React from 'react'
import { colors } from '../data'

class CurrentAnchor extends React.Component {

  render () {
    let props = this.props
    let { x, y, zoom, isMoving, current } = props
    let r = 12 / zoom
    let styles = {
      current: {
        fill: colors.blue,
        stroke: 'none',
        opacity: .25,
        cursor: 'pointer',
        vectorEffect: 'non-scaling-stroke',
        transition: 'r .1s ease-out'
      },
      currentRing: {
        stroke: colors.blue,
        strokeWidth: 3,
        vectorEffect: 'non-scaling-stroke',
        transition: 'r .05s ease-out'
      }
    }

    if (current < 0) {
      return false
    }

    return (
      <g>
        <circle
          cx={x}
          cy={y}
          r={isMoving ? r * 2 : r}
          tabIndex='1'
          onMouseDown={props.onMouseDown.bind(this, ['x', 'y'])}
          onMouseMove={props.onMouseMove}
          onMouseUp={props.onMouseUp}
          style={styles.current} />
        <circle
          cx={x}
          cy={y}
          r={isMoving ? r * 1.25 : r}
          onMouseUp={props.onMouseUp}
          style={styles.currentRing} />
      </g>
    )
  }

}

export default CurrentAnchor

