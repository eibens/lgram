import * as Md from "./markdown.ts";
import { assertEquals } from "https://deno.land/std@0.91.0/testing/asserts.ts";

Deno.test("Markdown children works for terminal", () => {
  assertEquals(
    Md.children("hello"),
    ["hello"],
  );
});

Deno.test("Markdown children works for internal", () => {
  assertEquals(
    Md.children(["hello", "world"]),
    ["hello", "world"],
  );
});

Deno.test("Markdown stringify", () => {
  assertEquals(
    Md.stringify(["hello", "world"]),
    "helloworld",
  );
});

Deno.test("Markdown em", () => {
  assertEquals(
    Md.stringify(Md.em("hello")),
    "_hello_",
  );
});

Deno.test("Markdown heading", () => {
  assertEquals(
    Md.stringify(Md.strong("hello")),
    "**hello**",
  );
});

Deno.test("Markdown heading", () => {
  assertEquals(
    Md.stringify(Md.heading("hello", 3)),
    "### hello",
  );
});

Deno.test("Markdown blocks", () => {
  assertEquals(
    Md.stringify(Md.blocks(["hello", "world"])),
    "hello\n\nworld",
  );
});

Deno.test("Markdown spans", () => {
  assertEquals(
    Md.stringify(Md.spans(["hello", "world"])),
    "hello world",
  );
});

Deno.test("Markdown html", () => {
  assertEquals(
    Md.stringify(Md.html("hello", "code")),
    "<code>hello</code>",
  );
});
