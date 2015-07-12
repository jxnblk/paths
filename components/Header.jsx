
import React from 'react'

class Header extends React.Component {

  render () {
    let s = {
      header: {
        padding: '8px 16px'
      },
      link: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '.2em',
        display: 'inline-block',
        color: 'inherit',
        textDecoration: 'none'
      }
    }
    return (
      <header style={s.header}>
        <a href='http://jxnblk.com'
          style={s.link}>
          Jxnblk
        </a>
        {' / '}
        <a href='/paths'
          style={s.link}>
          Paths
        </a>
      </header>
    )
  }

}

export default Header

