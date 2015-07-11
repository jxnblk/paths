
import React from 'react'

class Handles extends React.Component {

  render () {
    let { ast, current } = this.props
    let r1 = 2.5
    let r2 = 3
    let points = ast.commands.map(function(command, i) {
      let params = command.params
      let prev = ast.commands[i - 1] ? ast.commands[i - 1].params : ast.commands[0].params
      return {
        cx: params.x || prev.x,
        cy: params.y || prev.y,
        r: r1
      }
    })

    let curr = ast.commands[current].params
    let prev = ast.commands[current - 1] ? ast.commands[current - 1].params : ast.commands[0].params

    let c = {
      cx: curr.x || prev.x,
      cy: curr.y || prev.y,
      r: r2
    }

    let styles = {
      g: {
        fill: 'none',
        stroke: 'currentcolor',
        strokeWidth: .5,
        vectorEffect: 'non-scaling-stroke',
      },
      point: {
        fill: 'transparent',
        stroke: 'none',
        cursor: 'pointer'
      },
      pointRing: {
        opacity: .5,
      },
      current: {
        fill: 'cyan',
        opacity: .25,
        cursor: 'pointer'
      },
      currentRing: {
        stroke: 'cyan'
      }
    }

    return (
      <g style={styles.g}>
        {points.map(function(p, i) {
          return (
            <g key={i}>
              <circle
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                style={styles.point} />
              <circle
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                style={styles.pointRing} />
            </g>
          )
        })}
        <circle
          cx={c.cx}
          cy={c.cy}
          r={c.r}
          style={styles.current} />
        <circle
          cx={c.cx}
          cy={c.cy}
          r={c.r}
          style={styles.currentRing} />
      </g>
    )

  }

}

export default Handles

