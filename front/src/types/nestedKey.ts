export type NestedKey<Object> = {
  //get all object string keys
  [Key in Extract<keyof Object, string>]: Object[Key] extends Array<any> // if object key is array
    ? Key
    : Object[Key] extends object // if Object key is object
      ? `${Key}` | `${Key}.${NestedKey<Object[Key]>}` //recursive nested object fomatte
      : Key
}[Extract<keyof Object, string>]
