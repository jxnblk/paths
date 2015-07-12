
import React from 'react'
import Button from './Button.jsx'
import Input from './Input.jsx'
import Table from './Table.jsx'
import Stepper from './Stepper.jsx'
import { scale } from '../data'

class Toolbar extends React.Component {

  render () {
    let props = this.props

    function toggleGrid () {
      props.toggle('grid')
    }

    function toggleSnap () {
      props.toggle('snap')
    }

    function togglePreview () {
      props.toggle('preview')
    }

    function updateZoom (val) {
      props.updateState('zoom', val)
    }

    let s = {
      container: {
        padding: scale[1],
      }
    }

    return (
      <div style={s.container}>
        <Table pad>
          <Table.Cell>
            <Button
              active={props.grid}
              onClick={toggleGrid}>
              Grid {props.grid ? 'On' : 'Off'}
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button
              active={props.snap}
              onClick={toggleSnap}>
              Snap {props.snap ? 'On' : 'Off'}
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button
              active={props.preview}
              onClick={togglePreview}>
              Preview {props.preview ? 'On' : 'Off'}
            </Button>
          </Table.Cell>
          {/*
          <Table.Cell>
            <Input
              type='number'
              label='Grid 1'
              name='resolution1'
              value={props.resolution1}
              max={64}
              onChange={props.handleChange} />
          </Table.Cell>
          <Table.Cell>
            <Input
              type='number'
              label='Grid 2'
              name='resolution2'
              value={props.resolution2}
              max={64}
              onChange={props.handleChange} />
          </Table.Cell>
          <Table.Cell>
            <Input
              type='number'
              label='Zoom'
              name='zoom'
              step={.5}
              min={.5}
              max={64}
              value={props.zoom}
              onChange={props.handleChange} />
          </Table.Cell>
          */}
          <Table.Cell fill />
          <Table.Cell>
            <div>Zoom {props.zoom}x</div>
          </Table.Cell>
          <Table.Cell>
            <Stepper
              value={props.zoom}
              step={.5}
              min={.5}
              max={64}
              onChange={updateZoom} />
          </Table.Cell>
        </Table>
      </div>
    )
  }

}

export default Toolbar

