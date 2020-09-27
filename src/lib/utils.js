export function getter(name) {
  const path = name ? name.split('.') : [];
  const len = path.length;

  return function (ctx) {
    let idx = 0;

    while (ctx && idx < len) ctx = ctx[path[idx++]];

    return ctx;
  };
}

export function getExceptions(exp = [], getter) {
  return getter(exp);
}

export function save(data, name = 'dataName') {
  const string = JSON.stringify(data);

  localStorage.setItem(name, string);
}

export function load(name = 'dataName') {
  const string = localStorage.getItem(name);
  const data = JSON.parse(string);

  return data;
}