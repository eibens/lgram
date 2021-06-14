/**
 * Defines a helper type that removes the first element of a tuple.
 */
type Shift<T extends [unknown, ...unknown[]]> = T extends [unknown, ...infer R]
  ? R
  : never;

/**
 * Represents a parametric mapping from X to Y.
 */
// deno-lint-ignore no-explicit-any
export type Rule<X, Y, P extends any[]> = (x: X, ...args: P) => Y;

/**
 * Represents a collection of rules that are associated with unique identifiers.
 */
// NOTE: Changing `any` to `unknown` leads to type conflicts in test code. Changing it to `never` leads to type errors in `apply`.
// deno-lint-ignore no-explicit-any
export type Lookup<X, Y> = Record<PropertyKey, Rule<X, Y, any[]>>;

/**
 * Represents a rule application as a tuple, removing the dependence on the input entity.
 */
export type Command<X, Y, L extends Lookup<X, Y>> = {
  [K in keyof L]: [K, ...Shift<Parameters<L[K]>>];
}[keyof L];

/**
 * Applies a command to the input entity.
 *
 * @param input is the input entity.
 * @param grammar provides the implementation of the grammar.
 * @param command defines the rule application.
 * @returns the result of the rule applied to the input entity.
 */
export function apply<X, Y, L extends Lookup<X, Y>>(
  input: X,
  command: Command<X, Y, L>,
  lookup: L,
): Y {
  const [name, ...args] = command;
  return lookup[name](input, ...args);
}
