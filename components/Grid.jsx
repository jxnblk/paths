
import React from 'react'

class Grid extends React.Component {

  render () {
    let { grid, preview, width, height, resolution } = this.props

    function getLines (x, y, step) {
      let lines = []
      for (var i = 0; i <= y; i++) {
        lines.push([
          'M', 0, i * step,
          'H', width
        ].join(' '))
      }
      for (var i = 0; i <= x; i++) {
        lines.push([
          'M', i * step, 0,
          'V', height
        ].join(' '))
      }
      return lines.join(' ')
    }

    let minor = [
      getLines(width / resolution, height / resolution, resolution)
    ].join(' ')
    let major = [
      getLines(width / 16, height / 16, 16)
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

    if (!grid || preview) {
      return false
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

