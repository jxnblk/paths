
import React from 'react'
import previousKey from '../util/get-previous-key'
import { colors } from '../data'
import Anchor from './Anchor.jsx'
import CurrentAnchor from './CurrentAnchor.jsx'
import CurveHandles from './CurveHandles.jsx'

class Handles extends React.Component {

  constructor () {
    super ()
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleAddPoint = this.handleAddPoint.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      isMoving: false,
      params: false
    }
  }

  handleMouseDown (params, e) {
    if (typeof params === 'number') {
      this.props.selectPoint(params)
      params = ['x', 'y']
    } else if (Array.isArray(params)){
    }
    this.setState({
      isMoving: true,
      params: params
    })
  }

  handleMouseUp (e) {
    this.setState({ isMoving: false, params: false })
  }

  handleMouseLeave (e) {
    this.setState({ isMoving: false, params: false })
  }

  handleMouseMove (e) {
    if (this.state.isMoving) {
      let props = this.props
      let { ast, zoom, padding } = props
      let i = props.current
      let params = ast.commands[i].params
      let px = this.state.params[0]
      let py = this.state.params[1]
      let res = props.resolution2
      let ev = e.nativeEvent
      let x = ev.offsetX / zoom - padding
      let y = ev.offsetY / zoom - padding
      if (props.snap) {
        x = Math.floor(x / res) * res || 0
        y = Math.floor(y / res) * res || 0
      }
      if (x < 0) {
        x = 0
      } else if (x > props.width) {
        x = props.width
      }
      if (y < 0) {
        y = 0
      } else if (y > props.height) {
        y = props.height
      }
      if (typeof params[px] !== 'undefined') {
        params[px] = x
      }
      if (typeof params[py] !== 'undefined') {
        params[py] = y
      }
      //com.params.x = typeof com.params.x !== 'undefined' ? x : undefined
      //com.params.y = typeof com.params.y !== 'undefined' ? y : undefined
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

  handleKeyDown (e) {
    let props = this.props
    let { ast, current, width, height, snap, res } = props
    let params = ast.commands[current].params
    switch (e.keyCode) {
      case 38: // Up
        e.preventDefault()
        if (params.y > 0) {
          params.y = snap ? params.y - res : params.y - 1
        }
        break
      case 40: // Down
        e.preventDefault()
        if (params.y < height) {
          params.y = snap ? params.y + res : params.y + 1
        }
        break
      case 37: // Left
        if (params.x > 0) {
          params.x = snap ? params.x - res : params.x - 1
        }
        break
      case 39: // Right
        if (params.x < width) {
          params.x = snap ? params.x + res : params.x + 1
        }
        break
    }
    props.updateAst(ast)
  }

  render () {
    let self = this
    let props = this.props
    let state = this.state
    let { ast, current, zoom, preview } = props
    let q3 = 32 / zoom

    let anchors = ast.commands
      .filter(function(command) {
        return Object.keys(command.params).length
      })
      .map(function(command, i) {
        let params = command.params
        return {
          x: typeof params.x !== 'undefined' ? params.x : previousKey(ast.commands, i, 'x'),
          y: typeof params.y !== 'undefined' ? params.y : previousKey(ast.commands, i, 'y')
        }
      })

    let params = ast.commands[current] ? ast.commands[current].params : {}

    let currentAnchor = {
      x: typeof params.x !== 'undefined' ? params.x : previousKey(ast.commands, current, 'x'),
      y: typeof params.y !== 'undefined' ? params.y :  previousKey(ast.commands, current, 'y')
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
      curvePoint: {
        fill: colors.blue,
        stroke: 'none',
        cursor: 'pointer'
      }
    }

    if (preview) {
      return false
    }

    return (
      <g style={styles.g}
        onKeyDown={this.handleKeyDown}
        onMouseLeave={this.handleMouseLeave}>

        <rect
          transform={'translate(' + -props.padding + ' ' + -props.padding + ')'}
          width={props.width + props.padding * 2}
          height={props.height + props.padding * 2}
          style={styles.mouseRect}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove} />
        <rect
          width={props.width}
          height={props.height}
          style={styles.mouseRect}
          onMouseDown={this.handleAddPoint}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp} />

        {anchors.map(function(anchor, i) {
          return (
            <Anchor
              key={i}
              {...props}
              index={i}
              x={anchor.x}
              y={anchor.y}
              onMouseDown={self.handleMouseDown}
              onMouseUp={self.handleMouseUp}
              onMouseMove={self.handleMouseMove}
            />
          )
        })}

        <CurrentAnchor
          {...props}
          {...state}
          {...currentAnchor}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp} />

        <CurveHandles
          {...props}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp} />
      </g>
    )

  }

}

export default Handles

