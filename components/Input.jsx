
import React from 'react'
import { scale, colors } from '../data'

class Input extends React.Component {

  render () {
    let props = this.props
    let { name, label } = props
    let s = {
      div: {
        marginBottom: props.mb ? 12 : null
      },
      label: {
        fontSize: 14,
        fontWeight: 'bold',
        display: 'block',
        marginBottom: 4,
      },
      input: {
        fontSize: 16,
        width: '100%',
        height: scale[6],
        paddingLeft: 8,
        paddingRight: 8,
        boxSizing: 'border-box',
        color: 'inherit',
        backgroundColor: colors.darken[3],
        borderColor: colors.lighten[3],
        borderWidth: 1,
        boxShadow: 'none',
        borderRadius: 2,
        WebkitAppearance: 'none',
      }
    }
    let type = props.type || 'text'

    return (
      <div style={s.div}>
        <label
          htmlFor={name}
          style={s.label}>
          {label}
        </label>
        <input
          {...props}
          type={type}
          style={s.input} />
      </div>
    )
  }

}

Input.propTypes = {
  label: React.PropTypes.string,
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  mb: React.PropTypes.bool,
}

export default Input

