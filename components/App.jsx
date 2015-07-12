
import React from 'react'
import pathast from 'path-ast'
import { Grid, Cell } from 'rgx'
import Canvas from './Canvas.jsx'
import Commands from './Commands.jsx'
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
      mode: 'select'
    }
    this.updateAst = this.updateAst.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.selectPoint = this.selectPoint.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  updateAst (ast) {
    this.setState({ ast: ast })
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
    console.log
    this.setState({ [key]: val })
  }

  render () {
    let state = this.state
    let props = this.props
    let style = {
      fontFamily: 'sans-serif',
      color: 'white',
      backgroundColor: props.colors.dark
    }

    return (
      <div style={style}>
        <Grid>
          <Cell min={320}>
            <Canvas
              {...props}
              {...state}
              toggle={this.toggle}
              updateAst={this.updateAst}
              selectPoint={this.selectPoint}
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
      </div>
    )
  }

}

export default App

