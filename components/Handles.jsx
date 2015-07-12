
import React from 'react'
import previousKey from '../util/get-previous-key'

class Handles extends React.Component {

  constructor () {
    super ()
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.selectPoint = this.selectPoint.bind(this)
    this.state = {
      isMoving: false
    }
  }

  handleMouseDown (e) {
    this.setState({ isMoving: true })
  }

  handleMouseUp (e) {
    this.setState({ isMoving: false })
  }

  handleMouseLeave (e) {
    console.log('mouseleave', e)
    this.setState({ isMoving: false })
  }

  handleMouseMove (e) {
    if (this.state.isMoving) {
      let ast = this.props.ast
      let i = this.props.current
      let com = ast.commands[i]
      let zoom = this.props.zoom
      let res = this.props.resolution2
      let ev = e.nativeEvent
      console.log(this.props.padding * zoom)
      let x = ev.offsetX / zoom - this.props.padding
      let y = ev.offsetY / zoom - this.props.padding
      if (this.props.snap) {
        x = Math.floor(x / res) * res || com.params.x || 0
        y = Math.floor(y / res) * res || com.params.y || 0
      }
      com.params.x = com.params.x ? x : null
      com.params.y = com.params.y ? y : null
      this.props.updateAst(ast)
      //console.log('mousemove', x, y)
    }
  }

  selectPoint (i) {
  }

  render () {
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
      cx: curr.x || previousKey(ast.commands, current, 'x') || prev.x,
      cy: curr.y || previousKey(ast.commands, current, 'y') || prev.y,
      r: r2
    }

    function selectPoint (e) {
      props.selectPoint(this)
    }

    let styles = {
      g: {
        fill: 'none',
        stroke: 'currentcolor',
        strokeWidth: 2,
      },
      mouseRect: {
        stroke: 'none',
        fill: 'transparent'
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
        fill: 'cyan',
        opacity: .25,
        cursor: 'pointer',
        vectorEffect: 'non-scaling-stroke',
      },
      currentRing: {
        stroke: 'cyan',
        vectorEffect: 'non-scaling-stroke',
      }
    }

    return (
      <g style={styles.g}
        onMouseLeave={this.handleMouseLeave}>
        <rect
          transform={'translate(' + -props.padding + ' ' + -props.padding + ')'}
          width={props.width + props.padding * 2}
          height={props.height}
          style={styles.mouseRect}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove} />
        {points.map(function(p, i) {
          return (
            <g key={i}>
              <circle
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                onClick={selectPoint.bind(i)}
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

