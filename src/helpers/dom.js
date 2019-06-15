import sanitizeSVG from "@mattkrick/sanitize-svg";

export const addClass = (node, _class) => node.classList.add(_class);

export const removeClass = (node, _class) => node.classList.remove(_class);

export const getSVG = async svgPath => {
  return await fetch(svgPath)
    .then(r => r.text())
    .then(svg => {
      return sanitizeSVG(svg);
    });
};
