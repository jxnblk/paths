
import React from 'react'
import { scale } from '../data'

class Pad extends React.Component {

  render () {
    let { x, y, children } = this.props
    let s = {
      paddingLeft: x ? scale[x] : 0,
      paddingRight: x ? scale[x] : 0,
      paddingTop: y ? scale[y] : 0,
      paddingBottom: y ? scale[y] : 0,
    }

    return (
      <div style={s}>
        {children}
      </div>
    )
  }

}

export default Pad

