
import React from 'react'
import commands from 'path-ast/lib/keys'
import commandNames from '../util/command-names'
import previousKey from '../util/get-previous-key'
import Select from './Select'
import Input from './Input'
import CompactInput from './CompactInput'
import Button from './Button'
import Table from './Table'
import Pad from './Pad'

class Command extends React.Component {

  constructor () {
    super ()
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleParamChange = this.handleParamChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.removePoint = this.removePoint.bind(this)
  }

  handleTypeChange (e) {
    let { ast } = this.props
    const { index } = this.props
    let value = e.target.value
    let command = ast.commands[index]
    let prevX = previousKey(ast.commands, index, 'x')
    let prevY = previousKey(ast.commands, index, 'y')
    command.type = value
    let params = {}
    commands[value].forEach(function (key) {
      // Move this into a utility
      // Get prev x and y if all else fails
      if (typeof command.params[key] === 'undefined') {
        if (key.match(/^x/)) {
          if (typeof command.params.x !== 'undefined') {
            let x = parseFloat(command.params.x)
            let diff = x > prevX ? (x - prevX) / 2 + prevX: (prevX - x) / 2 + x
            params[key] = diff
          } else {
            params[key] = prevX
          }
        } else if (key.match(/^y/)) {
          if (typeof command.params.y !== 'undefined') {
            let y = parseFloat(command.params.y)
            let diff = y > prevY ?  (y - prevY) / 2 + prevY: (prevY - y) / 2 + y
            params[key] = diff
          } else {
            params[key] = prevY
          }
        } else {
          params[key] = 0
        }
      } else {
        params[key] = command.params[key]
      }
    })
    command.params = params
    this.props.updateAst(ast)
  }

  handleParamChange (e) {
    let ast = this.props.ast
    let names = e.target.name.split('-')
    let index = this.props.index || names[1]
    let param = names[2]
    let value = e.target.value
    ast.commands[index].params[param] = value
    this.props.updateAst(ast)
  }

  handleFocus (e) {
    let index = parseInt(e.target.name.split('-')[1], 10)
    this.props.selectPoint(index)
  }

  removePoint (e) {
    let ast = this.props.ast
    let index = this.props.index
    ast.commands.splice(index, 1)
    this.props.updateAst(ast)
  }

  render () {
    let self = this
    const { props } = this
    const { command, index, scale, colors } = props
    const options = Object.keys(commands)
      .filter(function (key) {
        return key.match(/[A-Z]/)
      })
      .filter(function (key) {
        // Temporarily disable Arc
        return key !== 'A'
      })
      .map(function(key) {
        return {
          label: key,
          value: key
        }
      })

    let active = index === props.current

    let s = {
      div: {
        //fontFamily: 'monospace',
        //paddingTop: scale[1],
        marginBottom: scale[1],
        color: active ? colors.blue : 'inherit'
        // boxShadow: active ? 'inset 0 0 0 2px ' + colors.blue : null
      },
      grid: {
        // marginLeft: -scale[2],
        // marginRight: -scale[2],
      },
      cell: {
        display: 'inline-block',
        verticalAlign: 'middle',
        boxSizing: 'border-box',
        width: '25%',
        //paddingLeft: scale[0],
        //paddingRight: scale[0],
      }
    }

    return (
      <div style={s.div}>
        <div style={s.grid}>
          <div style={s.cell}>
            <Select
              {...props}
              name={'command-' + props.index}
              label={'Command'}
              hideLabel
              value={command.type}
              options={options}
              onFocus={this.handleFocus}
              disabled={index === 0 ? true : false}
              onChange={index === 0 ? null : this.handleTypeChange} />
          </div>
          {command.params.map(function (param, j) {
            return (
              <div key={j}
                style={s.cell}>
                <CompactInput
                  type='number'
                  {...props}
                  label={param.name}
                  name={'command-' + props.index + '-' + param.name}
                  value={Math.round(param.value * 100) / 100}
                  step={props.snap ? (props.res) : 1}
                  onFocus={self.handleFocus}
                  onChange={self.handleParamChange} />
              </div>
              )
          })}
          <div style={s.cell}>
            <Button
              title='Remove Point'
              onClick={this.removePoint}
              disabled={index === 0 ? true : false}
              style={{
                fontSize: 20,
                lineHeight: 1,
                paddingTop: 0,
                paddingBottom: 0,
                opacity: .5,
                display: index === 0 ? 'none' : null
              }}>
              &times;
            </Button>
          </div>
        </div>
      </div>
    )
  }

}

export default Command

