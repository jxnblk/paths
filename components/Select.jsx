
import React from 'react'

class Select extends React.Component {

  render () {
    let props = this.props
    let { scale, colors } = props
    let s = {
      div: {
        marginBottom: props.mb ? 12 : null
      },
      label: {
        fontSize: 14,
        fontWeight: 'bold',
        display: 'block',
        marginBottom: 4
      },
      select: {
        fontSize: 14,
        width: '100%',
        height: scale[6],
        paddingLeft: scale[1],
        paddingRight: scale[1],
        boxSizing: 'border-box',
        borderColor: colors.lighten[3],
        borderWidth: 1,
        boxShadow: 'none',
        borderRadius: 2,
        color: 'inherit',
        backgroundColor: colors.darken[3],
        //WebkitAppearance: 'none',
      }
    }

    return (
      <div style={s.div}>
        <label htmlFor={props.name}
          style={s.label}>
          {props.label}
        </label>
        <select
          {...props}
          style={s.select}>
          {props.options.map(function(option, i) {
            return (
              <option
                key={i}
                {...option} />
              )
          })}
        </select>
      </div>
    )
  }

}

Select.propTypes = {
  name: React.PropTypes.string,
}

export default Select

