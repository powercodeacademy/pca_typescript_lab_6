// TASK:
// Write a generic function `identity<T>(value: T): T`
// Call it with both a string and a number

// Your code here 👇
function identity<T>(value: T): T {
  return value;
}

identity("hello");
identity(42);
