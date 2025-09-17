// Generic function that returns whatever you give it
function identity<T>(value: T): T {
  return value
}

// Call the function with different types
identity("hello")
identity(42)
