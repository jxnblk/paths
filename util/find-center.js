
export default function (a, b) {

  a = {
    x: parseFloat(a.x),
    y: parseFloat(a.y),
  }
  b = {
    x: parseFloat(b.x),
    y: parseFloat(b.y),
  }

  let x = a.x > b.x ? (a.x - b.x) / 2 + b.x : (b.x - a.x) / 2 + a.x
  let y = a.y > b.y ? (a.y - b.y) / 2 + b.y : (b.y - a.y) / 2 + a.y

  return { x, y }
}

