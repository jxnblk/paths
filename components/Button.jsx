
import React from 'react'
import { assign } from 'lodash'
import { scale, colors } from '../data'

class Button extends React.Component {

  render () {
    let props = this.props
    let text = props.text || props.children
    let s = assign({
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'inherit',
      lineHeight: (scale[6] - 2 * scale[1]) + 'px',
      height: scale[6],
      margin: 0,
      padding: scale[1],
      boxSizing: 'border-box',
      border: 0,
      // border: '1px solid',
      // borderRadius: 2,
      color: props.active ? colors.blue : 'inherit',
      backgroundColor: props.active ? colors.darken[3] : 'transparent',
      borderColor: props.active ? 'transparent' : colors.darken[3],
      cursor: 'pointer'
    }, props.style)

    return (
      <button
        {...props}
        style={s}>
        {text}
      </button>
    )
  }

}

export default Button

