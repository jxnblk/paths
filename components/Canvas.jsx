
import React from 'react'
import { TweetButton } from 'blk'
import Header from './Header.jsx'
import Svg from './Svg.jsx'
import Toolbar from './Toolbar.jsx'

class Canvas extends React.Component {

  render () {
    let props = this.props
    let styles = {
      container: {
        position: 'relative',
        height: '100vh',
      },
      viewport: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 48,
        left: 0,
        //paddingBottom: 64,
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
      },
      table: {
        display: 'table',
        width: '100%',
        height: '100%',
      },
      cell: {
        display: 'table-cell',
        verticalAlign: 'middle',
      },
      header: {
        position: 'absolute',
        top: 0,
        left: 0
      },
      social: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '8px 16px'
      },
      toolbar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 48,
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        backgroundColor: props.colors.darken[1]
      }
    }

    return (
      <div style={styles.container}>
        <div style={styles.viewport}>
          <div style={styles.table}>
            <div style={styles.cell}>
              <Svg {...props} />
            </div>
          </div>
        </div>
        <div style={styles.header}>
          <Header />
        </div>
        <div style={styles.social}>
          <TweetButton
            url='http://jxnblk.com/paths'
            text='Web app to learn about the SVG path element' />
        </div>
        <div style={styles.toolbar}>
          <Toolbar {...props} />
        </div>
      </div>
    )
  }

}

export default Canvas

