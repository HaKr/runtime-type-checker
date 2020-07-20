import type { Types } from "../../src";
import { expect } from ".";

export const expectFail = async (
	actualResult: Promise<unknown>,
	expectedError: string | RegExp,
	withProperties?: Types.JsonObject
) => {
	let error: Types.JsonObject | null = null;
	await expect(
		actualResult.catch((e) => {
			error = e;
			throw e;
		})
	).to.be.rejectedWith(expectedError);
	if (withProperties != undefined) {
		if (error == null) expect(error).to.equal(withProperties, "No error received");
		else
			for (const propertyName in withProperties) {
				expect(error).to.have.property(
					propertyName,
					withProperties[propertyName],
					"Error property differs"
				);
			}
	}
};
