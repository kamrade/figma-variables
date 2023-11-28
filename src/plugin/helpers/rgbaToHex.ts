function rgbaTransform(r: number, g: number, b: number, a: number) {
  return {
    r: Math.round(255 * r),
    g: Math.round(255 * g),
    b: Math.round(255 * b),
    a: a
  }
}

function rgbaToHex(rgbaObject) {
  let redHex = rgbaObject.r.toString(16).padStart(2, '0');
  let greenHex = rgbaObject.g.toString(16).padStart(2, '0');
  let blueHex = rgbaObject.b.toString(16).padStart(2, '0');
  let alphaHex = Math.round(rgbaObject.a * 255).toString(16).padStart(2, '0');
  if (alphaHex === 'ff') {
    return `#${redHex}${greenHex}${blueHex}`;
  } 
  return `#${redHex}${greenHex}${blueHex}${alphaHex}`;
}

export function figmaRgbaToHex(rgbaFigmaObject) {
  return rgbaToHex( rgbaTransform(rgbaFigmaObject.r, rgbaFigmaObject.g, rgbaFigmaObject.b, rgbaFigmaObject.a) )
}