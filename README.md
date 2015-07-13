# Paths

Edit SVG paths in the browser http://jxnblk.com/paths

## About

Paths is an SVG [path element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path)
editor intended to demonstrate the path syntax in an interactive interface.
Compared to other SVG elements, the path command syntax can look intimidating.
This app is intended to help users understand how the commands work and how to get started with coding and manipulating paths.

#### Caveats

This is only a demonstration app and is **not** intended to be a robust drawing application.
Since this relies heavily on mouse events, the application does not work well on mobile touchscreen devices

## SVG Path Commands

The path element is used to create complex shapes based on a series of commands.
Each command begins with a letter and is followed by numbers representing x/y coordinates according to the SVG’s viewBox attribute. Uppercase letters represent absolute coordinate movements, and lowercase letters represent relative movements.
For simplicity, the Paths app only supports absolute movements.

For a more in-depth introduction, see the [MDN Path Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).

### `M x y`

The [Moveto command](http://www.w3.org/TR/SVG/paths.html#PathDataMovetoCommands)
moves the current point without drawing.
Paths must begin with a Moveto command to determine where the drawing starts.

### `L x y`

The [Lineto command](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands)
draws a straight line from the previous command to its x/y coordinates.

### `H x`

The [Horizontal Lineto command](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands)
draws a horizontal line.

### `V y`

The [Vertical Lineto command](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands)
draws a vertical line.

### `C x1 y1 x2 y2 x y`

The [Curveto command](http://www.w3.org/TR/SVG/paths.html#PathDataCubicBezierCommands)
draws a cubic Bézier curve with control points for the beginning and end of the curve.
The final x/y coordinate pair determines where the line ends.

### `S x2 y2 x y`

The [Shorthand/Smooth Curveto command](http://www.w3.org/TR/SVG/paths.html#PathDataCubicBezierCommands)
draws a cubic Bézier curve with a control point for the end of the curve.
The first control point is a reflection of the control point from the previous command.

### `Q x1 y1 x y`

The [Quadratic Bézier Curveto command](http://www.w3.org/TR/SVG/paths.html#PathDataQuadraticBezierCommands)
draws a quadratic Bézier curve with a single control point for both points on the curve.

### `T x y`

The [Shorthand/Smooth Quadratic Bézier Curveto command](http://www.w3.org/TR/SVG/paths.html#PathDataQuadraticBezierCommands)
draws a quadratic Bézier curve, using a reflection of the previous command’s control point.

### `Z`

The [Closepath command](http://www.w3.org/TR/SVG/paths.html#PathDataClosePathCommand)
draws a line to the intial point to close a path.

### `A rx ry x-axis-rotaion large-arc-flag sweep-flag x y`

**Note: The Arc command is currently not supported in the Paths app**

The [Elliptical Arc command](http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands)
draws an elliptical arc to the x/y coordinates.


## How-To Use the App

Unlike other vector drawing applications, Paths has no tool palette or modes.
Instead it exposes the path command syntax in a reactive user interface.

- Use the form to the right to manually adjust the type and parameters for each command.
- Add new points with the button below the form.
- Remove points with the **×** button next to the command.
- Click to select points on the canvas.
- Click and drag to move points.
- Use the arrow keys to nudge points.
- Click anywhere on the canvas to add a new point after the selected point.
- Click the blue **×** button to the right of the command syntax tooltip to remove a point.
- Click outside of the canvas to deselect all points.
- Use the toolbar below the canvas to toggle the following:
  - Grid visibility
  - Snap to grid
  - Path preview mode
- Use the *Download* link to save the SVG.
- Use the **+** & **-** buttons to zoom in and out.
- Copy and paste the URL (along with the parameters) to share links with others.

## Issues

The interface has a lot of known issues and doesn’t work well on mobile devices,
but if you spot any bugs, please
[open an issue](https://github.com/jxnblk/paths/issues).

## Running Locally

```bash
git clone https://github.com/jxnblk/paths.git
```

```bash
cd paths
```

```bash
npm i
```

(Requires [Node.js](https://nodejs.org/))

```bash
npm start
```

Open <http://localhost:8080>


## Related

- [Building SVG Icons with React](http://jxnblk.com/react-icons/)
- [Geomicons Open](http://geomicons.com) - hand-coded SVG icons

---

Paths is built with
[React](https://facebook.github.io/react/),
[webpack](http://webpack.github.io/),
and [path-ast](https://github.com/jxnblk/path-ast).

MIT License

