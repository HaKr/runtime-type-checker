import { DefineInputs, TypeChecks } from "../src";
import { expect, mocha } from "./_mocha";

interface Point {
	x: number;
	y: number;
	z: number;
}

mocha.describe("Check some inputs", () => {
	mocha.describe("Basic types", () => {
		const definitions = {
			num: {
				defineIf: TypeChecks.isNumberGreaterThanZero
			},
			str: {
				defineIf: TypeChecks.isNonEmptyString
			},
			bool: {
				defineIf: TypeChecks.isBoolean,
				error: "invalid type"
			}
		};
		mocha.it("Trivial", () => {
			const inputs = DefineInputs.fromData(
				{
					num: 313,
					str: "Beta",
					bool: true
				},
				definitions
			);
			expect(inputs.bool).to.be.true;
			expect(inputs.str).to.eql("Beta");
			expect(inputs.num).to.eql(313);
		});
		mocha.it("Fields can still be undefined when no error is given.", () => {
			const inputs = DefineInputs.fromData(
				{
					num: 0,
					str: "",
					bool: false
				},
				definitions
			);
			expect(inputs.bool).to.be.false;
			expect(inputs.str).to.be.undefined;
			expect(inputs.num).to.be.undefined;
		});
		mocha.it("Exception when incorrect type", () => {
			expect(() =>
				DefineInputs.fromData(
					{
						num: 313,
						str: "Beta",
						bool: { answer: 42 }
					},
					definitions
				)
			)
				.to.throw("invalid type")
				.with.property("verified")
				.eql({ str: "Beta", num: 313 });
		});
	});
	mocha.it("Object types and custom checks", () => {
		const isPoint = (toe: unknown): toe is Point => {
			return (
				TypeChecks.isJsonObject(toe) &&
				TypeChecks.isNumber(toe.x) &&
				TypeChecks.isNumber(toe.y) &&
				TypeChecks.isNumber(toe.z)
			);
		};
		const isPointArray = (toe: unknown): toe is Point[] => TypeChecks.isJsonArray(toe, isPoint);
		const inputs = DefineInputs.fromData(
			{
				origin: { x: 0, y: 0, z: 0 },
				vertices: [
					{ x: 1, y: 2, z: 3 },
					{ x: -1, y: -3, z: -2 }
				]
			},

			{
				origin: { defineIf: isPoint },
				vertices: { defineIf: isPointArray }
			}
		);
		expect(inputs.origin).to.eql({ x: 0, y: 0, z: 0 });
		expect(inputs.vertices).to.eql([
			{ x: 1, y: 2, z: 3 },
			{ x: -1, y: -3, z: -2 }
		]);
	});
});
