
import React from 'react'
import { CarbonAd } from 'blk'
import pathast from 'path-ast'
import commands from 'path-ast/lib/keys'
import roundAst from '../util/round-ast'
import findCenter from '../util/find-center'
import Command from './Command.jsx'
import Button from './Button.jsx'
import { colors, scale } from '../data'

// Commands Palette
//  - Stepper

class Commands extends React.Component {

  constructor () {
    super ()
    this.addPoint = this.addPoint.bind(this)
  }

  addPoint () {
    let { ast, width, height } = this.props
    let a = ast.commands[ast.commands.length - 2].params || { x: width / 2, y: height / 2 }
    let b = ast.commands[0].params || { x: width / 2, y: height / 2 }
    let newPoint = {
      type: 'L',
      params: findCenter(a, b)
    }
    ast.commands.splice(ast.commands.length - 1, 0, newPoint)
    this.props.selectPoint(ast.commands.length - 2)
    this.props.updateAst(ast)
  }

  render () {
    let props = this.props
    let { ast, styles, colors } = props
    let code = pathast.stringify(roundAst(props.ast, 2))

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
        position: 'relative',
        boxSizing: 'border-box',
        height: '100vh',
        paddingBottom: 128,
        backgroundColor: colors.darken[2]
      },
      inner: {
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        height: '100%',
      },
      header: {
        paddingLeft: scale[3],
        paddingRight: scale[3],
      },
      code: {
        fontFamily: 'inherit',
        fontSize: 14
      },
      ad: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 16,
        backgroundColor: colors.darken[4]
      }
    }

    return (
      <div style={s.container}>
        <div style={s.inner}>
          <div style={s.header}>
            <h3>Path Commands</h3>
            <div style={s.code}>{code}</div>
          </div>
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
        <div style={s.ad}>
          <CarbonAd />
        </div>
      </div>
    )
  }

}

export default Commands

