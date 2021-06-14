function apply(input, commands, reducer) {
  if (commands.length === 0) return input;
  const [command, ...rest] = commands;
  const next = reducer(input, command);
  return apply(next, rest, reducer);
}
const mod = function () {
  return {
    apply: apply,
  };
}();
function apply1(input, command, lookup) {
  const [name, ...args] = command;
  return lookup[name](input, ...args);
}
const mod1 = function () {
  return {
    apply: apply1,
  };
}();
function children(x) {
  return typeof x === "string"
    ? [
      x,
    ]
    : x;
}
function stringify(x) {
  return typeof x === "string" ? x : x.join("");
}
function em(text) {
  return `_${stringify(text)}_`;
}
function strong(text) {
  return `**${stringify(text)}**`;
}
function heading(text, level) {
  return `${"#".repeat(level)} ${stringify(text)}`;
}
function html(body, name) {
  return `<${name}>${stringify(body)}</${name}>`;
}
function blocks(node) {
  return between(node, "\n\n");
}
function spans(node) {
  return between(node, " ");
}
function between(node, separator) {
  return children(node).flatMap((x) => [
    separator,
    x,
  ]).slice(1);
}
const mod2 = function () {
  return {
    children: children,
    stringify: stringify,
    em: em,
    strong: strong,
    heading: heading,
    html: html,
    blocks: blocks,
    spans: spans,
    between: between,
  };
}();
export { mod as Pipe };
export { mod1 as Lookup };
export { mod2 as Markdown };
