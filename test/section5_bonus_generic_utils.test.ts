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
  it("should merge objects with overlapping properties", () => {
    const merged = context.merge({ a: 1, c: 3 }, { b: 2, c: 4 });
    expect(merged).to.deep.equal({ a: 1, b: 2, c: 4 });
  });

  it("should merge objects with nested properties", () => {
    const merged = context.merge({ a: { x: 1 } }, { b: { y: 2 } });
    expect(merged).to.deep.equal({ a: { x: 1 }, b: { y: 2 } });
  });

  it("should merge empty objects", () => {
    const merged = context.merge({}, {});
    expect(merged).to.deep.equal({});
  });

  it("should handle merging with null or undefined", () => {
    const merged1 = context.merge({ a: 1 }, null);
    expect(merged1).to.deep.equal({ a: 1 });

    const merged2 = context.merge(undefined, { b: 2 });
    expect(merged2).to.deep.equal({ b: 2 });
  });

  it("should wrap primitive values in an array", () => {
    expect(context.wrapInArray(42)).to.deep.equal([42]);
    expect(context.wrapInArray(true)).to.deep.equal([true]);
    expect(context.wrapInArray(null)).to.deep.equal([null]);
    expect(context.wrapInArray(undefined)).to.deep.equal([undefined]);
  });

  it("should wrap objects in an array", () => {
    const obj = { x: 1, y: 2 };
    const result = context.wrapInArray(obj);
    expect(result).to.deep.equal([obj]);
    expect(result[0]).to.equal(obj); // Same reference
  });

  it("should wrap arrays in an array (nested arrays)", () => {
    expect(context.wrapInArray([1, 2, 3])).to.deep.equal([[1, 2, 3]]);
    expect(context.wrapInArray([])).to.deep.equal([[]]);
  });
});
