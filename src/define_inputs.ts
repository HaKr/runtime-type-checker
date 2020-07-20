import type { Types } from "./index";
import { TypeChecks } from "./index";

type TypeCast<T, A = T> = (v: unknown) => T | A;
type TypeCheck<T, A = T> = (toe: unknown) => toe is T | A;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TypeFallback<T, A = T> = (inputs: any) => T | A;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TypePostCheck<T, A = T> = (inputs: any) => T | A;

interface InputDefinition<T> {
	cast?: TypeCast<T>;
	fallback?: TypeFallback<T>;
	defineIf: TypeCheck<T>;
	postCheck?: TypePostCheck<T>;
	error?: string;
}

export type InputDefinitions<TID> = {
	[F in keyof TID]: InputDefinition<TID[F]>;
};

function contextValue(v: unknown) {
	return TypeChecks.isComplexElement(v) ? JSON.stringify(v) : `${v}`;
}

export class InputTypeCheckFailed extends Error {
	constructor(
		msg: string,
		public readonly name: string,
		public readonly testValue: string,
		public readonly verified: Types.JsonObject,
		public readonly context: Types.NamedStrings
	) {
		super(msg);
	}
}
export function fromData<T>(
	data: Types.JsonObject,
	definitions: InputDefinitions<T>,
	overrides: Types.JsonObject = {},
	context: Types.NamedStrings = {}
): T {
	const result: { [key: string]: unknown } = {};
	if (TypeChecks.isJsonObject(data)) {
		for (const name in definitions) {
			const definition = definitions[name];
			const propertyValue = data[name];
			const msgValue = overrides[name];
			const workValue =
				propertyValue != undefined &&
				(!TypeChecks.isString(propertyValue) || TypeChecks.isNonEmptyString(propertyValue))
					? propertyValue
					: msgValue;
			const castValue = definition.cast ? definition.cast(workValue) : workValue;
			const value =
				definition.fallback && !definition.defineIf(castValue)
					? definition.fallback(result)
					: castValue;

			context[name] = `${
				propertyValue != undefined ? contextValue(propertyValue) : contextValue(msgValue)
			}`;
			if (definition.defineIf(value)) {
				result[name] = value;
				if (definition.postCheck) result[name] = definition.postCheck(result);
			} else {
				if (TypeChecks.isNonEmptyString(definition.error)) {
					throw new InputTypeCheckFailed(
						definition.error,
						name,
						contextValue(value),
						(result as unknown) as Types.JsonObject,
						context
					);
				}
			}
		}
	}
	return (result as unknown) as T;
}
