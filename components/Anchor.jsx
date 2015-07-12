
import React from 'react'
import { colors } from '../data'

class Anchor extends React.Component {

  render () {
    let props = this.props
    let { current, index, zoom, x, y } = props
    let r = 12 / zoom
    let styles = {
      point: {
        fill: 'transparent',
        stroke: 'none',
        cursor: 'pointer'
      },
      pointRing: {
        opacity: current === index ? 0 : .5,
        vectorEffect: 'non-scaling-stroke',
      },
    }

    return (
      <g>
        <circle
          cx={x}
          cy={y}
          r={r * 2}
          tabIndex='1'
          onFocus={props.selectPoint.bind(this, index)}
          onMouseDown={props.onMouseDown.bind(this, index)}
          onMouseUp={props.onMouseUp}
          onMouseMove={props.onMouseMove}
          style={styles.point} />
        <circle
          cx={x}
          cy={y}
          r={r}
          style={styles.pointRing} />
      </g>
    )
  }

}

export default Anchor

