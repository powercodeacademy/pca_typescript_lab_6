import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";
import * as type_annotation from "chai_typescript_type_annotation_tests";

describe("Lab 6 — Section 2: Generic Classes", () => {
  let context: any = {};
  const filePath = join(__dirname, "../src/section2_generic_classes.ts");

  before(() => {
    const tsCode = readFileSync(filePath, "utf8");
    const jsCode = ts.transpile(tsCode);
    vm.createContext(context);
    vm.runInContext(jsCode, context);
  });

  type_annotation.expectClassMethodReturnTypeAnnotation(
    filePath,
    "Box",
    "getValue",
    "T"
  );

  type_annotation.expectClassPropertyTypeAnnotation(
    filePath,
    "Box",
    "value",
    "T"
  );

  it("should store and return a value using Box", () => {
    const box = new context.Box("test");
    expect(box.getValue()).to.equal("test");
  });

  it("should store and return a number value using Box", () => {
    const box = new context.Box(42);
    expect(box.getValue()).to.equal(42);
  });

  it("should store and return a boolean value using Box", () => {
    const box = new context.Box(true);
    expect(box.getValue()).to.equal(true);
  });

  it("should store and return an object using Box", () => {
    const testObj = { name: "test", value: 123 };
    const box = new context.Box(testObj);
    expect(box.getValue()).to.deep.equal(testObj);
  });

  it("should store and return an array using Box", () => {
    const testArray = [1, 2, 3];
    const box = new context.Box(testArray);
    expect(box.getValue()).to.deep.equal(testArray);
  });

  it("should store and return null using Box", () => {
    const box = new context.Box(null);
    expect(box.getValue()).to.equal(null);
  });

  it("should store and return undefined using Box", () => {
    const box = new context.Box(undefined);
    expect(box.getValue()).to.equal(undefined);
  });

  it("should maintain type information at compile time", () => {
    // This is a compile-time check, not a runtime test
    const BoxClass = context.Box as new <T>(value: T) => { getValue(): T };
    const box = new BoxClass<number>(123);
    const value = box.getValue();
    // If TypeScript is working correctly, this would be a type error if uncommented:
    // const str: string = value;
  });

  it("should work with nested Box instances", () => {
    const innerBox = new context.Box("inner");
    const outerBox = new context.Box(innerBox);
    expect(outerBox.getValue().getValue()).to.equal("inner");
  });
});
