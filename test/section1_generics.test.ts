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
    
    it("should return the same value using identity with a boolean", () => {
    const result = context.identity(true);
    expect(result).to.equal(true);
    });

    it("should return the same value using identity with null", () => {
    const result = context.identity(null);
    expect(result).to.equal(null);
    });

    it("should return the same value using identity with undefined", () => {
    const result = context.identity(undefined);
    expect(result).to.equal(undefined);
    });

    it("should return the same array using identity", () => {
    const arr = [1, 2, 3];
    const result = context.identity(arr);
    expect(result).to.deep.equal(arr);
    expect(result).to.equal(arr); // Same reference
    });

    it("should return the same object using identity", () => {
    const obj = { name: "test", value: 123 };
    const result = context.identity(obj);
    expect(result).to.deep.equal(obj);
    expect(result).to.equal(obj); // Same reference
    });

    it("should maintain the type of complex objects", () => {
    const date = new Date();
    const result = context.identity(date);
    expect(result).to.equal(date);
    expect(result instanceof Date).to.be.true;
    });

    it("should handle functions correctly", () => {
    const fn = () => "test";
    const result = context.identity(fn);
    expect(result).to.equal(fn);
    expect(result()).to.equal("test");
    });

  });
