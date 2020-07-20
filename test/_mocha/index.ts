import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as mocha from "mocha";

chai.use(chaiAsPromised);

export { mocha };
export const expect = chai.expect;

export type { Types } from "../../src";
export { TypeChecks } from "../../src";

export * as TestFramework from "./framework";
