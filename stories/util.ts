export const rGBToHex = (rgb: string) => {
  if (rgb[0] === '#') {
    return rgb;
  }
  const sep = ",";

  // Turn "rgba(r,g,b)" into [r,g,b]
  const rgbArr = rgb.substr(5).split(")")[0].split(sep);

  let r = (+rgbArr[0]).toString(16),
      g = (+rgbArr[1]).toString(16),
      b = (+rgbArr[2]).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
};