import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";

describe("Lab 6 — Section 4: Utility Types", () => {
  let context: any = {};

  before(() => {
    const filePath = join(__dirname, "../src/section4_utility_types.ts");
    const tsCode = readFileSync(filePath, "utf8");
    const jsCode = ts.transpile(tsCode);
    vm.createContext(context);
    vm.runInContext(jsCode, context);
  });

  it("should define a partial user object", () => {
    expect(context.partialUser).to.include.keys("id", "name");
  });

  it("should define a readonly user object", () => {
    expect(context.readonlyUser).to.include.keys("email");
  });

  it("should define a picked user object", () => {
    expect(context.pickUser).to.include.keys("name");
    expect(context.pickUser).to.not.have.property("id");
  });
});
