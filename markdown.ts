export type Node = string | Node[];

export function children(x: Node): Node[] {
  return typeof x === "string" ? [x] : x;
}

export function stringify(x: Node): string {
  return typeof x === "string" ? x : x.join("");
}

export function em(text: Node): string {
  return `_${stringify(text)}_`;
}

export function strong(text: Node): string {
  return `**${stringify(text)}**`;
}

export function heading(text: Node, level: 1 | 2 | 3 | 4 | 5 | 6): string {
  return `${"#".repeat(level)} ${stringify(text)}`;
}

export function html(body: Node, name: string): string {
  return `<${name}>${stringify(body)}</${name}>`;
}

export function blocks(node: Node): Node[] {
  return between(node, "\n\n");
}

export function spans(node: Node): Node[] {
  return between(node, " ");
}

export function between(node: Node, separator: Node): Node[] {
  return children(node)
    .flatMap((x) => [separator, x])
    .slice(1);
}
