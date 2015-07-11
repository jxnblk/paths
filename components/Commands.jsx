
import React from 'react'
import commands from 'path-ast/lib/keys'
import Command from './Command.jsx'

// Commands Palette
//  - Button
//  - Remove
//  - Stepper

class Commands extends React.Component {

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
        padding: styles.pad[3],
        backgroundColor: colors.darken[2]
      }
    }

    return (
      <div style={s.container}>
        {coms.map(function (com, i) {
          if (!com.params.length) {
            return false
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
    )
  }

}

export default Commands

