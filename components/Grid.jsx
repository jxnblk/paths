
import React from 'react'

class Grid extends React.Component {

  render () {
    let { width, height, resolution, resolution1, resolution2 } = this.props

    function getLines (x, y, step) {
      let lines = []
      for (var i = 0; i < y + 1; i++) {
        lines.push([
          'M', 0, i * step,
          'H', width
        ].join(' '))
      }
      for (var i = 0; i < x + 1; i++) {
        lines.push([
          'M', i * step, 0,
          'V', height
        ].join(' '))
      }
      return lines.join(' ')
    }

    let minor = [
      getLines(width / resolution2, height / resolution2, resolution2)
    ].join(' ')
    let major = [
      getLines(width / resolution1, height / resolution1, resolution1)
    ].join(' ')

    let styles = {
      g: {
        fill: 'none',
        stroke: 'currentcolor',
      },
      minor: {
        strokeWidth: .5,
        vectorEffect: 'non-scaling-stroke',
        opacity: .5,
      },
      major: {
        strokeWidth: .5,
        vectorEffect: 'non-scaling-stroke',
        opacity: .75
      }
    }

    return (
      <g style={styles.g}>
        <path d={minor} style={styles.minor} />
        <path d={major} style={styles.major} />
      </g>
    )
  }

}

export default Grid

