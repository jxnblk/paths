
import React from 'react'
import pathast from 'path-ast'
import { Grid, Cell } from 'rgx'
import Canvas from './Canvas.jsx'
import Commands from './Commands.jsx'
import UrlHistory from './UrlHistory.jsx'
import css from '../app.css'

class App extends React.Component {

  constructor () {
    super ()
    this.state = {
      ast: pathast.parse('M8 48 L56 48 L32 12 Z'),
      current: 1,
      width: 64,
      height: 64,
      aspectRatio: [1, 1],
      zoom: 6,
      grid: true,
      resolution: [16, 2],
      resolution1: 16,
      resolution2: 2,
      // Replace resolutions with
      res: 2,
      snap: true,
      preview: false,
      mode: 'select',
      history: []
    }
    this.updateAst = this.updateAst.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.selectPoint = this.selectPoint.bind(this)
    this.updateState = this.updateState.bind(this)
    this.toggle = this.toggle.bind(this)
    this.undo = this.undo.bind(this)
  }

  updateAst (ast) {
    let { history } = this.state
    history.push(ast)
    if (history.length > 64) {
      history.unshift()
    }
    this.setState({ ast: ast, history: history })
  }

  handleChange (e) {
    let key = e.target.name
    let val = parseFloat(e.target.value) || e.target.value
    this.setState({ [key]: val })
  }

  selectPoint (i) {
    this.setState({ current: i })
  }

  toggle (key) {
    let val = !this.state[key]
    this.setState({ [key]: val })
  }

  updateState (key, val) {
    this.setState({ [key]: val })
  }

  undo () {
    let { history } = this.state
    if (history.length) {
      let ast = history.pop()
      this.setState({ ast: ast })
    }
  }

  handleKeyDown (e) {
    if (e.metaKey && e.keyCode === 90) {
      this.undo()
    }
  }

  render () {
    let state = this.state
    let props = this.props
    let style = {
      color: 'white',
      backgroundColor: props.colors.dark
    }

    return (
      <div style={style}
        onKeyDown={this.handleKeyDown.bind(this)}>
        <Grid>
          <Cell min={320}>
            <Canvas
              {...props}
              {...state}
              toggle={this.toggle}
              updateAst={this.updateAst}
              selectPoint={this.selectPoint}
              updateState={this.updateState}
              handleChange={this.handleChange} />
          </Cell>
          <Cell min={256} max={320}>
            <Commands
              {...props}
              {...state}
              selectPoint={this.selectPoint}
              updateAst={this.updateAst} />
          </Cell>
        </Grid>
        <UrlHistory
          {...props}
          {...state}
          updateAst={this.updateAst} />
      </div>
    )
  }

}

export default App

