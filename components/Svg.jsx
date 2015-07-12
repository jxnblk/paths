
import React from 'react'
import Grid from './Grid.jsx'
import Path from './Path.jsx'
import Guides from './Guides.jsx'
import Handles from './Handles.jsx'

class Svg extends React.Component {

  render () {
    let props = this.props
    let { width, height, zoom, padding } = props
    let padX = width + padding * 2
    let padY = height + padding * 2
    let styles = {
      svg: {
        display: 'block',
        margin: 'auto'
      }
    }
    return (
      <svg
        viewBox={[0, 0, padX, padY].join(' ')}
        width={padX * zoom}
        height={padY * zoom}
        style={styles.svg}
        fill='currentcolor'>
        <g transform={'translate(' + padding + ' ' + padding + ')'}>
          {props.grid ? <Grid {...props} /> : false}
          <Path {...props} />
          <Guides {...props} />
          <Handles {...props} />
        </g>
      </svg>
    )
  }

}

export default Svg

