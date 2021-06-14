import { assertEquals } from "https://deno.land/std@0.91.0/testing/asserts.ts";
import * as Lookup from "./lookup.ts";
import * as Pipe from "./pipe.ts";
import * as Markdown from "./markdown.ts";

Deno.test("Pipe applies all commands", () => {
  const text = "hello" as string;

  type Command = Lookup.Command<Markdown.Node, Markdown.Node, typeof Markdown>;

  const commands: Command[] = [
    ["strong"],
    ["html", "code"],
  ];

  function apply(input: Markdown.Node, command: Command) {
    return Lookup.apply(input, command, Markdown);
  }

  assertEquals(
    Pipe.apply(text, commands, apply),
    "<code>**hello**</code>",
  );
});
