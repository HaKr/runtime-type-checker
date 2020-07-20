import { Types } from "..";

/*
export type ScalarElement = string | number | boolean;
export type ScalarElementOrUndefined = ScalarElement | undefined;
export type ComplexElement = ScalarElement | ElementArray | JsonObject | object;
export type ElementArray = ComplexElement[];
export type ComplexElementOrUndefined = ComplexElement | undefined | null;
export interface JsonObject {
	[key: string]: ComplexElementOrUndefined;
}

*/
export type TypeChecker<T> = (toe: unknown) => toe is T;

export function isOneOf<X, Y>(
	toe: unknown,
	isTypeX: TypeChecker<X>,
	isTypeY: TypeChecker<Y>
): toe is X | Y {
	return isTypeX(toe) || isTypeY(toe);
}

export const isUndefined = (toe: unknown): toe is undefined => toe == undefined;

export function isNumber(toe: unknown): toe is number {
	return typeof toe == "number";
}

export function isNumberGreaterThanZero(toe: unknown): toe is number {
	return isNumber(toe) && toe > 0;
}

export function isBoolean(toe: unknown): toe is boolean {
	return typeof toe == "boolean";
}

export function isString(toe: unknown): toe is string {
	return typeof toe == "string";
}

export function isNonEmptyString(toe: unknown): toe is string {
	return isString(toe) && toe.trim().length > 0;
}

export function isNonEmptyStringOrUndefined(toe: unknown): toe is string | undefined {
	return isOneOf(toe, isUndefined, isNonEmptyString);
}

export function isNonEmptyStringOrNumber(toe: unknown): toe is string | number {
	return isOneOf(toe, isNumberGreaterThanZero, isNonEmptyString);
}

export function isJsonArray<T>(
	toe: unknown,
	checkElement: (element: unknown) => element is T
): toe is T[];
export function isJsonArray<Json>(toe: unknown): toe is Json[];
export function isJsonArray(
	toe: unknown,
	checkElement?: (element: unknown) => boolean
): toe is Types.JsonArray {
	return (
		typeof toe == "object" &&
		toe != null &&
		Array.isArray(toe) &&
		(checkElement == undefined || toe.every(checkElement))
	);
}

export function isJsonObject(toe: unknown): toe is Types.JsonObject {
	return typeof toe == "object" && toe != null && !Array.isArray(toe);
}

export function isComplexElement(toe: unknown): toe is Types.JsonElement {
	return isJsonArray(toe) || isJsonObject(toe);
}
