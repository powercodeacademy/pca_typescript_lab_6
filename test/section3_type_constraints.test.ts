import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";

describe("Lab 6 — Section 3: Type Constraints", () => {
  let context: any = {};
  let logs: string[] = [];

  before(() => {
    const filePath = join(__dirname, "../src/section3_type_constraints.ts");
    const tsCode = readFileSync(filePath, "utf8");
    const jsCode = ts.transpile(tsCode);
    context.console = { log: (msg: string) => logs.push(msg) };
    vm.createContext(context);
    vm.runInContext(jsCode, context);
  });

  beforeEach(() => {
    logs = [];
  });

  it("should log the length of an array", () => {
    context.logLength([1, 2, 3]);
    expect(logs[0]).to.equal("3");
  });

  it("should log the length of a string", () => {
    context.logLength("hello");
    expect(logs[0]).to.equal("5");
  });
});
