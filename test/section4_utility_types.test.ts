import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";
import * as type_annotation from "chai_typescript_type_annotation_tests";

describe("Lab 6 — Section 4: Utility Types", () => {
  let context: any = {};
  const filePath = join(__dirname, "../src/section4_utility_types.ts");

  before(() => {
    const tsCode = readFileSync(filePath, "utf8");
    const jsCode = ts.transpile(tsCode);
    vm.createContext(context);
    vm.runInContext(jsCode, context);
  });

  type_annotation.expectTypeAliasPropertyTypeAnnotation(
    filePath,
    "User",
    "id",
    "number"
  );
  type_annotation.expectTypeAliasPropertyTypeAnnotation(
    filePath,
    "User",
    "name",
    "string"
  );
  type_annotation.expectTypeAliasPropertyTypeAnnotation(
    filePath,
    "User",
    "email",
    "string"
  );

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

  it("should allow partial user with missing properties", () => {
    expect(context.partialUser).to.not.have.all.keys("id", "name", "email");
    expect(Object.keys(context.partialUser).length).to.be.lessThan(3);
  });

  it("should define pick user with only name property", () => {
    expect(Object.keys(context.pickUser).length).to.equal(1);
    expect(context.pickUser.name).to.exist;
    expect(context.pickUser.email).to.not.exist;
    expect(context.pickUser.id).to.not.exist;
  });

  it("should define readonly user with all expected properties", () => {
    expect(context.readonlyUser).to.have.all.keys("id", "name", "email");
  });
});
