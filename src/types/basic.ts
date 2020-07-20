export type ScalarElement = string | number | boolean;
export type ScalarElementOrUndefined = ScalarElement | undefined;
export type JsonElement = ScalarElement | JsonArray | JsonObject | object;
export type JsonArray = JsonElement[];
export type JsonElementOrUndefined = JsonElement | undefined | null;
export interface JsonObject {
	[key: string]: JsonElementOrUndefined;
}

export interface NamedStrings {
	[key: string]: string;
}
