interface TypeEnum {
  "string": string;
  "number": number;
  "bigint": BigInt;
  "boolean": boolean;
  "symbol": Symbol;
  "undefined": undefined;
  "object": object;
  "function": Function;
};
type Types = keyof TypeEnum;
export default function typeCheckerGenerator<T extends Types[]>(types: T) {
  function typeChecker(toCheck: any): toCheck is TypeEnum[T[number]] {
    return types.includes(typeof toCheck);
  }
  return typeChecker;
}
