
import commands from 'path-ast/lib/keys'
import Color from 'color'
import modular from 'simple-modular-scale'

let scale = modular({
  base: 8,
  ratios: [9/8, 4/3, 4/3]
})

export default {
  title: 'Paths',
  commands: Object.keys(commands)
    .filter(function (key) {
      return key.match(/[A-Z]/)
    }),
  scale: scale,
  styles: {
    pad: scale
  },
  colors: {
    cyan: 'cyan',
    dark: '#222',
    darken: [
      Color('#000').alpha(1/16).rgbString(),
      Color('#000').alpha(2/16).rgbString(),
      Color('#000').alpha(3/16).rgbString(),
      Color('#000').alpha(4/16).rgbString(),
    ],
    lighten: [
      Color('#fff').alpha(1/16).rgbString(),
      Color('#fff').alpha(2/16).rgbString(),
      Color('#fff').alpha(3/16).rgbString(),
      Color('#fff').alpha(4/16).rgbString(),
    ]
  }
}

