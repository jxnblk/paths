
import React from 'react'
import { findLastIndex } from 'lodash'
import { stringify } from 'path-ast'
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
    this.handleTranslate = this.handleTranslate.bind(this)
    this.state = {
      isMoving: false,
      isTranslating: false,
      params: false,
      start: false
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
    this.setState({
      isMoving: false,
      isTranslating: false,
      params: false,
      start: false
    })
  }

  handleMouseLeave (e) {
    this.setState({
      isMoving: false,
      params: false,
      isTranslating: false,
      start: false
    })
  }

  handleMouseMove (e) {
    const { props } = this
    const { ast, zoom, padding } = props
    let newAst = ast
    let res = props.resolution2
    const ev = e.nativeEvent
    let x = ev.offsetX / zoom - padding
    let y = ev.offsetY / zoom - padding
    if (props.snap) {
      x = Math.floor(x / res) * res || 0
      y = Math.floor(y / res) * res || 0
    }
    if (this.state.isMoving) {
      let i = props.current
      let params = newAst.commands[i].params
      let px = this.state.params[0]
      let py = this.state.params[1]
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
      this.props.updateAst(newAst)
    } else if (this.state.isTranslating) {
      const { start } = this.state
      newAst.translate(x - start.x, y - start.y)
      this.setState({
        start: { x, y }
      })
      this.props.updateAst(newAst)
    }
  }

  handleAddPoint (i, e) {
    const { props } = this
    const { ast, zoom, padding, current, snap } = props
    const res = props.resolution2
    const ev = e.nativeEvent
    let newAst = ast
    let x = ev.offsetX / zoom - padding
    let y = ev.offsetY / zoom - padding
    if (snap) {
      x = Math.floor(x / res) * res || 0
      y = Math.floor(y / res) * res || 0
    }
    newAst.commands.splice(i, 0, {
      type: 'L',
      params: {
        x: x,
        y: y,
      }
    })
    props.updateAst(newAst)
    props.selectPoint(i)
    this.setState({ isMoving: true, params: ['x', 'y'] })
  }

  handleTranslate (e) {
    const { zoom, padding, snap, resolution2 } = this.props
    const res = resolution2
    const ev = e.nativeEvent
    let x = ev.offsetX / zoom - padding
    let y = ev.offsetY / zoom - padding
    if (snap) {
      x = Math.floor(x / res) * res || 0
      y = Math.floor(y / res) * res || 0
    }
    this.setState({
      isTranslating: true,
      start: { x, y }
    })
  }

  handleKeyDown (e) {
    let props = this.props
    let { ast, current, width, height, snap, res } = props
    let params = ast.commands[current].params
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) {
      return
    }
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
    const { props, state } = this
    const { ast, current, zoom, preview } = props
    const q3 = 32 / zoom

    const d = stringify(ast)

    const anchors = ast.commands
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

    const segments = ast.commands
      .filter((command) => {
        return Object.keys(command.params).length || command.type.match(/z|Z/)
      })
      .map((command, i) => {
        if (command.type.match(/z|Z/)) {
          const lastMIndex = findLastIndex(ast.commands, (command, j) => {
            if (j > i) { return false }
            return command.type.match(/m|M/)
          })
          command.type = 'L'
          command.params = {
            x: ast.commands[lastMIndex].params.x || 0,
            y: ast.commands[lastMIndex].params.y || 0,
          }
        }
        let segment = {
          commands: [
            {
              type: 'M',
              params: {
                x: previousKey(ast.commands, i, 'x'),
                y: previousKey(ast.commands, i, 'y'),
              }
            },
            command
          ]
        }
        return segment
      })

    const params = ast.commands[current] ? ast.commands[current].params : {}

    const currentAnchor = {
      x: typeof params.x !== 'undefined' ? params.x : previousKey(ast.commands, current, 'x'),
      y: typeof params.y !== 'undefined' ? params.y :  previousKey(ast.commands, current, 'y')
    }

    const styles = {
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
      },
      path: {
        fill: 'transparent',
        stroke: 'none',
        cursor: 'move'
      },
      segment: {
        fill: 'none',
        stroke: 'transparent',
        strokeWidth: 4
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
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp} />

        <path d={d}
          style={styles.path}
          onMouseDown={this.handleTranslate}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        />

        {segments.map((segment, i) => {
          const segD = stringify(segment)
          return (
            <path
              key={i}
              ref={`segment-${i}`}
              d={segD}
              style={styles.segment}
              onMouseDown={this.handleAddPoint.bind(this, i)}
              />
          )
        })}

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

