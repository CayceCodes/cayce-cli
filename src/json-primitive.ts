type JSONValue = boolean | JSONValue[] | null | number | string | {[key: string]: JSONValue}

export type JSONObject = Record<string, JSONValue>

export interface PackageJSON {
  dependencies?: JSONObject
  devDependencies?: JSONObject
  name?: string
}
