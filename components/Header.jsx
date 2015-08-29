
import React from 'react'
import { TweetButton, GithubButton } from 'blk'
import Table from './Table.jsx'
import LinkBtn from './LinkBtn.jsx'

class Header extends React.Component {

  render () {
    let s = {
      header: {
        fontSize: 14,
        fontWeight: 'bold',
        boxSizing: 'border-box',
        height: 48,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
      },
      link: {
        textTransform: 'uppercase',
        letterSpacing: '.2em',
        display: 'inline-block',
        color: 'inherit',
        textDecoration: 'none'
      }
    }
    return (
      <header style={s.header}>
        <Table>
          <Table.Cell>
            <a href='http://jxnblk.com'
              style={s.link}>
              Jxnblk
            </a>
            {' / '}
            <a href='/paths'
              style={s.link}>
              Paths
            </a>
          </Table.Cell>
          <Table.Cell fill />
          <Table.Cell>
            <LinkBtn href='https://github.com/jxnblk/paths'>
              GitHub
            </LinkBtn>
          </Table.Cell>
          <Table.Cell>
            <TweetButton
              url='http://jxnblk.com/paths'
              text='Build and edit SVGs in the browser' />
          </Table.Cell>
          {/*
          <Table.Cell>
            <GithubButton
              user='jxnblk'
              repo='paths' />
          </Table.Cell>
          */}
        </Table>
      </header>
    )
  }

}

export default Header

