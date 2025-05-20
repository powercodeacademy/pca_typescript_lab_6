import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";

describe("Lab 6 — Section 2: Generic Classes", () => {
  let context: any = {};

  before(() => {
    const filePath = join(__dirname, "../src/section2_generic_classes.ts");
    const tsCode = readFileSync(filePath, "utf8");
    const jsCode = ts.transpile(tsCode);
    vm.createContext(context);
    vm.runInContext(jsCode, context);
  });

  it("should store and return a value using Box", () => {
    const box = new context.Box("test");
    expect(box.getValue()).to.equal("test");
  });
});
