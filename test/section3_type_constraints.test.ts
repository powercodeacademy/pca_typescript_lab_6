import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";
import * as type_annotation from "chai_typescript_type_annotation_tests";

describe("Lab 6 — Section 3: Type Constraints", () => {
  let context: any = {};
  let logs: string[] = [];
  const filePath = join(__dirname, "../src/section3_type_constraints.ts");

  before(() => {
    const tsCode = readFileSync(filePath, "utf8");
    const jsCode = ts.transpile(tsCode);
    context.console = { log: (msg: string) => logs.push(msg) };
    vm.createContext(context);
    vm.runInContext(jsCode, context);
  });

  beforeEach(() => {
    logs = [];
  });

  type_annotation.matchFunctionParameterTypeAnnotation(filePath, "logLength", [
    "T",
  ]);

  type_annotation.expectFunctionReturnTypeAnnotation(
    filePath,
    "logLength",
    "void"
  );

  it("should log the length of an array", () => {
    context.logLength([1, 2, 3]);
    expect(logs[0]).to.equal("3");
  });

  it("should log the length of a string", () => {
    context.logLength("hello");
    expect(logs[0]).to.equal("5");
  });
  it("should log the length of an empty array", () => {
    context.logLength([]);
    expect(logs[0]).to.equal("0");
  });

  it("should log the length of a large array", () => {
    context.logLength(Array(100).fill(0));
    expect(logs[0]).to.equal("100");
  });

  it("should log the length of an empty string", () => {
    context.logLength("");
    expect(logs[0]).to.equal("0");
  });

  it("should log the length of a custom object with length property", () => {
    context.logLength({ length: 42 });
    expect(logs[0]).to.equal("42");
  });

  it("should log the length of a string with special characters", () => {
    context.logLength("Hello, 世界!");
    expect(logs[0]).to.equal("10");
  });

  it("should log the length of a typed array", () => {
    context.logLength(new Uint8Array([1, 2, 3, 4]));
    expect(logs[0]).to.equal("4");
  });

  it("should log the length of a Map with size property converted to length", () => {
    context.logLength({
      length: new Map([
        ["a", 1],
        ["b", 2],
      ]).size,
    });
    expect(logs[0]).to.equal("2");
  });

  it("should log the length of an object with numeric length", () => {
    context.logLength({ length: 123.45 });
    expect(logs[0]).to.equal("123.45");
  });
});
