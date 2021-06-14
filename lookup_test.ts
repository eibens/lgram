import { assertEquals } from "https://deno.land/std@0.91.0/testing/asserts.ts";
import * as Lookup from "./lookup.ts";
import * as Markdown from "./markdown.ts";

Deno.test("Lookup is typed", () => {
  type Command = Lookup.Command<Markdown.Node, Markdown.Node, typeof Markdown>;
  const _emCommand: Command = ["em"];
  const _codeCommand: Command = ["html", "code"];
  // @ts-ignore: This is an example of something that is not a command.
  const _nonCommand: Command = ["something else"];
});

Deno.test("Lookup applies a command", () => {
  assertEquals(
    Lookup.apply("hello", ["strong"], Markdown),
    "**hello**",
  );
});

Deno.test("Lookup applies a parametric command", () => {
  assertEquals(
    Lookup.apply("hello", ["html", "code"], Markdown),
    "<code>hello</code>",
  );
});
