
import React from 'react'
import { round } from 'lodash'
import previousKey from '../util/get-previous-key'
import { colors } from '../data'
import Table from './Table.jsx'
import Button from './Button.jsx'

class AnchorDetails extends React.Component {

  constructor () {
    super ()
    this.removePoint = this.removePoint.bind(this)
  }

  removePoint (e) {
    let props = this.props
    let { ast, current } = props
    ast.commands.splice(current, 1)
    props.updateAst(ast)
    React.findDOMNode(e.target).blur()
  }

  render () {
    let props = this.props
    let { ast, current, width, zoom, padding, preview } = props
    let { type, params } = ast.commands[current]

    //let x = typeof params.x !== 'undefined' ? params.x : previousKey(ast.commands, current, 'x')
    let y = typeof params.y !== 'undefined' ? params.y : previousKey(ast.commands, current, 'y')

    let styles = {
      outer: {
        position: 'absolute',
        top: y * zoom + padding * zoom,
        left: width * zoom + padding * zoom + 32,
        color: colors.blue,
        transitionProperty: 'top',
        transitionDuration: '.2s',
        transitionTimingFunction: 'ease-out'
      },
      values: {
        whiteSpace: 'nowrap'
      }
    }

    if (preview) {
      return false
    }

    return (
      <div style={styles.outer}>
        <Table>
          <Table.Cell>
            <div>
              {type}
            </div>
            <div style={styles.values}>
              {Object.keys(params).map(function(key, i) {
                return (
                  <span key={i}>
                    {round(params[key], 2)}{' '}
                  </span>
                )
              })}
            </div>
          </Table.Cell>
          <Table.Cell>
            <Button
              text='&times;'
              title='Remove Point'
              style={{ fontSize: 20 }}
              onClick={this.removePoint} />
          </Table.Cell>
        </Table>
      </div>
    )
  }

}

export default AnchorDetails

