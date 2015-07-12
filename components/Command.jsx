
import React from 'react'
import commands from 'path-ast/lib/keys'
import commandNames from '../util/command-names'
import Select from './Select.jsx'
import Input from './Input.jsx'
import Button from './Button.jsx'
import Table from './Table.jsx'
import Pad from './Pad.jsx'

class Command extends React.Component {

  constructor () {
    super ()
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleParamChange = this.handleParamChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.removePoint = this.removePoint.bind(this)
  }

  handleTypeChange (e) {
    let ast = this.props.ast
    let index = this.props.index
    let value = e.target.value
    let command = ast.commands[index]
    command.type = value
    commands[value].forEach(function (key) {
      command.params[key] = command.params[key] || 0
    })
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
    let props = this.props
    let { command, index, scale, colors } = props
    let options = Object.keys(commands)
      .filter(function (key) {
        return key.match(/[A-Z]/)
      })
      .map(function(key) {
        return {
          label: key + ': ' + commandNames[key],
          value: key
        }
      })

    let active = index === props.current

    let s = {
      div: {
        padding: scale[3],
        boxShadow: active ? 'inset 0 0 0 2px ' + colors.blue : null
      },
      grid: {
        marginLeft: -scale[2],
        marginRight: -scale[2],
      },
      cell: {
        display: 'inline-block',
        boxSizing: 'border-box',
        width: '50%',
        paddingLeft: scale[2],
        paddingRight: scale[2],
      }
    }

    return (
      <div style={s.div}>
        <Table pad>
          <Table.Cell fill>
            <Select
              {...props}
              mb
              name={'command-' + props.index}
              label={'Command'}
              value={command.type}
              options={options}
              onFocus={this.handleFocus}
              onChange={this.handleTypeChange} />
          </Table.Cell>
          <Table.Cell nowrap>
            <Button
              title='Remove Point'
              onClick={this.removePoint}
              style={{
                fontSize: 20
              }}>
              &times;
            </Button>
          </Table.Cell>
        </Table>
        <div style={s.grid}>
          {command.params.map(function (param, j) {
            return (
              <div key={j}
                style={s.cell}>
                <Input
                  type='number'
                  {...props}
                  mb
                  label={param.name}
                  name={'command-' + props.index + '-' + param.name}
                  value={param.value}
                  step={props.snap ? (props.resolution2) : 1}
                  onFocus={self.handleFocus}
                  onChange={self.handleParamChange} />
              </div>
              )
          })}
        </div>
      </div>
    )
  }

}

export default Command

