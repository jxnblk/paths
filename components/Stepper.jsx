
import React from 'react'
import scale from '../data'
import Button from './Button.jsx'

class Stepper extends React.Component {

  constructor () {
    super ()
    this.decrement = this.decrement.bind(this)
    this.increment = this.increment.bind(this)
  }

  decrement () {
    let props = this.props
    let val = props.value - props.step
    if (val > props.min - props.step) {
      props.onChange(val)
    }
  }

  increment () {
    let props = this.props
    let val = props.value + props.step
    if (val < props.max + props.step) {
      props.onChange(val)
    }
  }

  render () {
    let props = this.props
    let radius = 2
    let disabled = {
      left: props.value - props.step < props.min,
      right: props.value + props.step > props.max,
    }
    let s = {
      container: {
        display: 'inline-block',
        whiteSpace: 'nowrap'
      },
      left: {
        fontSize: 16,
        width: scale[6],
        borderRadius: [radius, 0, 0, radius].join(' '),
        opacity: disabled.left ? .5 : null
      },
      right: {
        fontSize: 16,
        width: scale[6],
        marginLeft: -1,
        borderRadius: [0, radius, radius, 0].join(' '),
        opacity: disabled.right ? .5 : null
      }
    }

    return (
      <div style={s.container}>
        <Button
          text='-'
          title='Decrement'
          onClick={this.decrement}
          disabled={disabled.left}
          style={s.left} />
        <Button
          text='+'
          title='Increment'
          onClick={this.increment}
          disabled={disabled.right}
          style={s.right} />
      </div>
    )
  }

}

Stepper.propTypes = {
  value: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,
}

Stepper.defaultProps = {
  value: 0,
  min: 0,
  max: 100,
  step: 1
}

export default Stepper

