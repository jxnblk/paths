
import React from 'react'
import previousKey from '../util/get-previous-key'
import { colors } from '../data'

class Handles extends React.Component {

  constructor () {
    super ()
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleAddPoint = this.handleAddPoint.bind(this)
    this.state = {
      isMoving: false
    }
  }

  handleMouseDown (i, e) {
    if (typeof i === 'number') {
      this.props.selectPoint(i)
    }
    this.setState({ isMoving: true })
  }

  handleMouseUp (e) {
    this.setState({ isMoving: false })
  }

  handleMouseLeave (e) {
    this.setState({ isMoving: false })
  }

  handleMouseMove (e) {
    if (this.state.isMoving) {
      let props = this.props
      let { ast, zoom, padding } = props
      let i = props.current
      let com = ast.commands[i]
      let res = props.resolution2
      let ev = e.nativeEvent
      let x = ev.offsetX / zoom - padding
      let y = ev.offsetY / zoom - padding
      if (this.props.snap) {
        x = Math.floor(x / res) * res || 0
        y = Math.floor(y / res) * res || 0
      }
      if (x < 0) {
        x = 0
      } else if (x > this.props.width) {
        x = this.props.width
      }
      if (y < 0) {
        y = 0
      } else if (y > this.props.height) {
        y = this.props.height
      }
      com.params.x = typeof com.params.x !== 'undefined' ? x : null
      com.params.y = typeof com.params.y !== 'undefined' ? y : null
      this.props.updateAst(ast)
    }
  }

  handleAddPoint (e) {
    let props = this.props
    let { ast, zoom, padding, current, snap } = props
    let res = props.resolution2
    let ev = e.nativeEvent
    let x = ev.offsetX / zoom - padding
    let y = ev.offsetY / zoom - padding
    if (snap) {
      x = Math.floor(x / res) * res || 0
      y = Math.floor(y / res) * res || 0
    }
    ast.commands.splice(current + 1, 0, {
      type: 'L',
      params: {
        x: x,
        y: y,
      }
    })
    props.updateAst(ast)
    props.selectPoint(current + 1)
  }

  render () {
    let self = this
    let props = this.props
    let { ast, current, zoom } = props
    let r1 = 8 / zoom
    let r2 = 12 / zoom

    let points = ast.commands
      .filter(function(command) {
        return Object.keys(command.params).length
      })
      .map(function(command, i) {
        let params = command.params
        return {
          cx: typeof params.x !== 'undefined' ? params.x : previousKey(ast.commands, i, 'x'),
          cy: typeof params.y !== 'undefined' ? params.y : previousKey(ast.commands, i, 'y'),
          r: r1
        }
      })

    let curr = ast.commands[current].params

    let c = {
      cx: typeof curr.x !== 'undefined' ? curr.x : previousKey(ast.commands, current, 'x'),
      cy: typeof curr.y !== 'undefined' ? curr.y :  previousKey(ast.commands, current, 'y'),
      r: r2
    }

    function selectPoint (i, e) {
      props.selectPoint(i)
    }

    let styles = {
      g: {
        fill: 'none',
        stroke: 'currentcolor',
        strokeWidth: 2,
      },
      mouseRect: {
        stroke: 'none',
        fill: 'transparent',
      },
      point: {
        fill: 'transparent',
        stroke: 'none',
        cursor: 'pointer'
      },
      pointRing: {
        opacity: .5,
        vectorEffect: 'non-scaling-stroke',
      },
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

    return (
      <g style={styles.g}
        onMouseLeave={this.handleMouseLeave}>
        <rect
          transform={'translate(' + -props.padding + ' ' + -props.padding + ')'}
          width={props.width + props.padding * 2}
          height={props.height + props.padding * 2}
          style={styles.mouseRect}
          onMouseDown={this.handleAddPoint}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove} />
        {points.map(function(p, i) {
          return (
            <g key={i}>
              <circle
                cx={p.cx}
                cy={p.cy}
                r={r2 * 2}
                tabIndex='1'
                onFocus={selectPoint.bind(self, i)}
                onMouseDown={self.handleMouseDown.bind(self, i)}
                onMouseMove={self.handleMouseMove}
                style={styles.point} />
              <circle
                cx={p.cx}
                cy={p.cy}
                r={current === i ? r2 : p.r}
                style={styles.pointRing} />
            </g>
          )
        })}
        <circle
          cx={c.cx}
          cy={c.cy}
          r={this.state.isMoving ? 2 * c.r : c.r}
          tabIndex='1'
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
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

