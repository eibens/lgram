/**
 * Applies multiple commands by feeding the output of each command as input to the next command.
 *
 * @param input is the input entity.
 * @param grammar provides the implementation of the grammar.
 * @param commands defines the sequence of rule application.
 * @returns the result of the rule applied to the input entity.
 */
export function apply<X, C>(
  input: X,
  commands: C[],
  reducer: (input: X, command: C) => X,
): X {
  // Base case: identity mapping.
  if (commands.length === 0) return input;
  // Apply the first command.
  const [command, ...rest] = commands;
  const next: X = reducer(input, command);
  // Recursively apply the remaining commands.
  return apply(next, rest, reducer);
}
