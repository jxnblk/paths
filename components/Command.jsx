
import React from 'react'
import commands from 'path-ast/lib/keys'
import Select from './Select.jsx'
import Input from './Input.jsx'

class Command extends React.Component {

  constructor () {
    super ()
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleParamChange = this.handleParamChange.bind(this)
  }

  handleTypeChange (e) {
    let ast = this.props.ast
    let names = e.target.name.split('-')
    let index = names[1]
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
    let index = names[1]
    let param = names[2]
    let value = e.target.value
    ast.commands[index].params[param] = value
    this.props.updateAst(ast)
  }

  render () {
    let props = this.props
    let { command, index, scale, colors } = props
    let options = Object.keys(commands)
      .filter(function (key) {
        return key.match(/[A-Z]/)
      })
      .map(function(key) {
        return {
          label: key,
          value: key
        }
      })

    let s = {
      div: {
        marginBottom: scale[3],
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: colors.lighten[2]
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

    let handleParamChange = this.handleParamChange

    return (
      <div style={s.div}>
        <Select
          {...props}
          mb
          name={'command-' + props.index}
          label={'Command'}
          value={command.type}
          options={options}
          onChange={this.handleTypeChange} />
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
                  step={props.snap ? (props.resolution[1]) : 1}
                  onChange={handleParamChange} />
              </div>
              )
          })}
        </div>
      </div>
    )
  }

}

export default Command

