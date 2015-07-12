
import React from 'react'
import commands from 'path-ast/lib/keys'
import Command from './Command.jsx'
import Button from './Button.jsx'
import { scale } from '../data'

// Commands Palette
//  - Stepper

class Commands extends React.Component {

  constructor () {
    super ()
    this.addPoint = this.addPoint.bind(this)
  }

  addPoint () {
    let ast = this.props.ast
    let cx = this.props.width / 2
    let cy = this.props.height / 2
    let newPoint = {
      type: 'L',
      params: {
        x: cx,
        y: cy,
      }
    }
    ast.commands.splice(ast.commands.length - 1, 0, newPoint)
    this.props.updateAst(ast)
  }

  render () {
    let props = this.props
    let { ast, styles, colors } = props

    let coms = ast.commands.map(function(com) {
      let params = commands[com.type].map(function (key, i) {
        return {
          name: key,
          value: com.params[key]
        }
      })
      return {
        type: com.type,
        params: params
      }
    })

    let s = {
      container: {
        boxSizing: 'border-box',
        height: '100vh',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        backgroundColor: colors.darken[2]
      }
    }

    return (
      <div style={s.container}>
        <div>
          {coms.map(function (com, i) {
            if (!com.params.length) {
              // return false
            }
            return (
              <Command
                {...props}
                key={i}
                index={i}
                command={com} />
            )
          })}
        </div>
        <div style={{
            padding: scale[3]
          }}>
          <Button onClick={this.addPoint}
            style={{
              display: 'block',
              textAlign: 'center',
              width: '100%',
            }}>
            + Add Point
          </Button>
        </div>
      </div>
    )
  }

}

export default Commands

