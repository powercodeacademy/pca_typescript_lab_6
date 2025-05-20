import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";

describe("Lab 6 — Section 5 (Bonus): Generic Utilities", () => {
  let context: any = {};

  before(() => {
    const filePath = join(__dirname, "../src/section5_bonus_generic_utils.ts");
    const tsCode = readFileSync(filePath, "utf8");
    const jsCode = ts.transpile(tsCode);
    vm.createContext(context);
    vm.runInContext(jsCode, context);
  });

  it("should merge two objects", () => {
    const merged = context.merge({ a: 1 }, { b: 2 });
    expect(merged).to.deep.equal({ a: 1, b: 2 });
  });

  it("should wrap a value in an array", () => {
    const result = context.wrapInArray("hello");
    expect(result).to.deep.equal(["hello"]);
  });
});
