
import React from 'react'
import { colors } from '../data'

class CurrentAnchor extends React.Component {

  render () {
    let props = this.props
    let { x, y, zoom, isMoving } = props
    let r = 12 / zoom
    let styles = {
      current: {
        fill: colors.blue,
        stroke: 'none',
        opacity: .25,
        cursor: 'pointer',
        vectorEffect: 'non-scaling-stroke',
      },
      currentRing: {
        stroke: colors.blue,
        vectorEffect: 'non-scaling-stroke',
      }
    }

    // ref
    // r={this.state.isMoving ? 2 * c.r : c.r}

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
          r={r}
          onMouseUp={props.onMouseUp}
          style={styles.currentRing} />
      </g>
    )
  }

}

export default CurrentAnchor

