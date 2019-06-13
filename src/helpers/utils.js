export const pluralize = (count, noun, suffix = "s") =>
  `${count} ${noun}${count !== 1 ? suffix : ""}`;

export const validateEmail = email => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const addClass = (node, _class) => node.classList.add(_class);
export const removeClass = (node, _class) => node.classList.remove(_class);

// Special Thanks To: https://gist.github.com/KoryNunn/5488215
export function inEach(items, callback) {
  for (
    let i = 0, count = items.length;
    i < count && !callback(items[i], i, items);
    i++
  ) {}
  return items;
}
