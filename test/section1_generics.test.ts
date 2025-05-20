import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";

describe("Lab 6 — Section 1: Generics", () => {
  let context: any = {};

  before(() => {
    const filePath = join(__dirname, "../src/section1_generics.ts");
    const tsCode = readFileSync(filePath, "utf8");
    const jsCode = ts.transpile(tsCode);
    vm.createContext(context);
    vm.runInContext(jsCode, context);
  });

  it("should return the same value using identity with a string", () => {
    const result = context.identity("hello");
    expect(result).to.equal("hello");
  });

  it("should return the same value using identity with a number", () => {
    const result = context.identity(42);
    expect(result).to.equal(42);
  });
});
