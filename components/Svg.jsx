
import React from 'react'
import Grid from './Grid.jsx'
import Path from './Path.jsx'
import Guides from './Guides.jsx'
import Handles from './Handles.jsx'
import AnchorDetails from './AnchorDetails.jsx'

class Svg extends React.Component {

  render () {
    let props = this.props
    let { width, height, zoom, padding } = props
    let padX = width + padding * 2
    let padY = height + padding * 2
    function stopClick (e) {
      e.stopPropagation()
    }
    let styles = {
      outer: {
        position: 'relative',
        width: padX * zoom,
        margin: 'auto'
      },
      svg: {
        display: 'block',
        margin: 'auto'
      }
    }

    return (
      <div style={styles.outer}>
        <svg
          viewBox={[0, 0, padX, padY].join(' ')}
          width={padX * zoom}
          height={padY * zoom}
          style={styles.svg}
          fill='currentcolor'
          onClick={stopClick}>
          <g transform={'translate(' + padding + ' ' + padding + ')'}>
            <Grid {...props} />
            <Path {...props} />
            <Guides {...props} />
            <Handles {...props} />
          </g>
        </svg>
        {/*
        <AnchorDetails {...props} />
          */}
      </div>
    )
  }

}

export default Svg

