// Generic function that merges two objects
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 }
}

// Generic function that wraps any value in an array
function wrapInArray<T>(value: T): T[] {
  return [value]
}
