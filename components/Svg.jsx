
import React from 'react'
import Grid from './Grid.jsx'
import Path from './Path.jsx'
import Guides from './Guides.jsx'
import Handles from './Handles.jsx'

class Svg extends React.Component {

  render () {
    let { width, height, zoom } = this.props
    let padding = 8
    let padX = width + padding * 2
    let padY = height + padding * 2
    let styles = {
      svg: {
        //maxHeight: '100%',
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
          <Grid {...this.props} />
          <Path {...this.props} />
          <Guides {...this.props} />
          <Handles {...this.props} />
        </g>
      </svg>
    )
  }

}

export default Svg

