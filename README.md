# TypeScript Lesson 6: Generics, Constraints & Utility Types

Welcome to your sixth TypeScript lab! In the previous lessons, you learned about basic types, objects, arrays, type aliases, union types, interfaces, tuples, enums, and classes. Now we're going to explore some of TypeScript's most powerful features: **generics**, **type constraints**, and **utility types**.

You already know how to write functions and classes in TypeScript, but what if you want to write code that works with any type? What if you want to create reusable components that maintain type safety? Or what if you want to transform existing types into new ones? That's where generics and utility types come in—they give you the flexibility to write truly reusable code while keeping TypeScript's type safety.

Think of it like this: in regular TypeScript, you write code for specific types. With generics, you write code that adapts to whatever type you give it—like having a universal adapter that works with any plug, but still knows exactly what kind of plug it is.

## Learning Objectives

By the end of this lab, you'll be comfortable with:

- Writing generic functions and classes that work with any type
- Using type constraints to limit what types can be used with generics
- Leveraging built-in utility types like `Partial`, `Readonly`, and `Pick`
- Creating your own reusable generic utility functions

## Getting Started

First, clone this repository to your local machine and install the required dependencies:

```bash
npm install
npm test
```

You should see test output showing which tests are passing and failing. Don't worry if tests are failing initially - that's expected! You'll be implementing the code to make them pass.

---

## Generics: Code That Adapts to Any Type

In regular TypeScript, you might write a function like this:

```typescript
function getFirstString(items: string[]): string {
  return items[0]
}

function getFirstNumber(items: number[]): number {
  return items[0]
}
```

But what if you want to get the first item from any array, regardless of type? You'd have to write a separate function for each type, which gets repetitive fast. That's where **generics** come in.

Generics let you write code that works with any type while maintaining type safety. You use angle brackets `<T>` to define a type parameter:

```typescript
function getFirst<T>(items: T[]): T {
  return items[0]
}

// Now you can use it with any type
let firstString = getFirst<string>(["hello", "world"]) // Type: string
let firstNumber = getFirst<number>([1, 2, 3]) // Type: number
let firstBoolean = getFirst<boolean>([true, false]) // Type: boolean

// TypeScript can even infer the type for you
let firstString2 = getFirst(["hello", "world"]) // TypeScript knows this is string[]
let firstNumber2 = getFirst([1, 2, 3]) // TypeScript knows this is number[]
```

The `<T>` is like a placeholder that gets replaced with the actual type when you call the function. TypeScript keeps track of this relationship, so if you pass in a `string[]`, you get back a `string`. If you pass in a `number[]`, you get back a `number`.

Here's a simple generic function that just returns whatever you give it:

```typescript
function identity<T>(value: T): T {
  return value
}

// Works with any type
let result1 = identity("hello") // Type: string
let result2 = identity(42) // Type: number
let result3 = identity([1, 2, 3]) // Type: number[]
```

### Practice: Generic Functions

**Your Task**: Open `src/section1_generics.ts` and complete the following:

1. Create an `identity` function that:

   - Takes a generic type parameter `T`
   - Takes a parameter `value` of type `T`
   - Returns the same value of type `T`

2. Test the function with different types

**Expected behavior**:

```typescript
console.log(identity("hello")) // "hello"
console.log(identity(42)) // 42
console.log(identity([1, 2, 3])) // [1, 2, 3]
```

**Hint**: Use angle brackets `<T>` to define the generic type parameter. The function will work with any type you give it.

---

## Generic Classes: Blueprints That Adapt

Just like functions, classes can be generic too. This is incredibly useful when you want to create containers or wrappers that can hold any type of data.

Here's how you might create a simple box that can hold any type:

```typescript
class Box<T> {
  private value: T

  constructor(value: T) {
    this.value = value
  }

  getValue(): T {
    return this.value
  }

  setValue(newValue: T): void {
    this.value = newValue
  }
}

// Now you can create boxes for different types
let stringBox = new Box<string>("hello")
let numberBox = new Box<number>(42)
let booleanBox = new Box<boolean>(true)

console.log(stringBox.getValue()) // "hello"
console.log(numberBox.getValue()) // 42
console.log(booleanBox.getValue()) // true
```

The `<T>` in the class definition means "this class can work with any type T." When you create an instance with `new Box<string>("hello")`, TypeScript knows that `getValue()` will return a `string`, and `setValue()` expects a `string` parameter.

Generic classes are perfect for:

- Creating reusable containers (like arrays, stacks, or queues)
- Building data structures that work with any type
- Implementing patterns like the Repository pattern
- Creating type-safe wrappers around external libraries

### Practice: Generic Classes

**Your Task**: Open `src/section2_generic_classes.ts` and complete the following:

1. Create a `Box<T>` class with:

   - `value`: private property of type `T`
   - `constructor(value: T)` that sets the value
   - `getValue()`: method that returns the value

2. Test the class with different types

**Expected behavior**:

```typescript
console.log(stringBox.getValue()) // "hello"
console.log(numberBox.getValue()) // 42
console.log(booleanBox.getValue()) // true
```

**Hint**: Use `<T>` in the class definition to make it generic. The class can hold any type you specify.

---

## Type Constraints: Limiting What Types Are Allowed

Sometimes you want your generic code to work with any type, but you need to ensure that type has certain properties. For example, what if you want to write a function that works with any object that has a `length` property?

That's where **type constraints** come in. You use the `extends` keyword to limit what types can be used with your generic:

```typescript
function logLength<T extends { length: number }>(item: T): void {
  console.log(`The length is: ${item.length}`)
}

// These all work because they have a length property
logLength("hello") // string has length
logLength([1, 2, 3]) // array has length
logLength({ length: 5, data: "test" }) // object with length property

// This would cause an error:
// logLength(42) // Error: number doesn't have length property
```

The `T extends { length: number }` means "T can be any type, but it must have a `length` property that's a number." TypeScript will check this at compile time and give you an error if you try to use a type that doesn't meet the constraint.

Here's another example with a more complex constraint:

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

let person = { name: "Alice", age: 25, email: "alice@example.com" }

let name = getProperty(person, "name") // Type: string
let age = getProperty(person, "age") // Type: number
let email = getProperty(person, "email") // Type: string

// This would cause an error:
// let invalid = getProperty(person, "invalid") // Error: "invalid" is not a key of person
```

Type constraints are perfect for:

- Ensuring generic types have specific properties
- Creating type-safe property access
- Building APIs that work with objects that share common interfaces
- Preventing runtime errors by catching type mismatches at compile time

### Practice: Type Constraints

**Your Task**: Open `src/section3_type_constraints.ts` and complete the following:

1. Write a `logLength` function that:

   - Takes a generic type parameter `T` that extends `{ length: number }`
   - Takes a parameter `item` of type `T`
   - Prints the length of the item

2. Test the function with different types that have a length property

**Expected behavior**:

```typescript
logLength("hello") // "The length is: 5"
logLength([1, 2, 3]) // "The length is: 3"
logLength({ length: 5, data: "test" }) // "The length is: 5"

// This would cause an error:
// logLength(42) // Error: number doesn't have length property
```

**Hint**: Use `T extends { length: number }` to constrain the generic type. This ensures the type has a `length` property.

---

## Utility Types: Transforming Existing Types

Sometimes you want to take an existing type and create a new type based on it. Maybe you want all properties to be optional, or you want to make everything readonly, or you want to pick only certain properties. TypeScript provides **utility types** for these common transformations.

Let's start with a basic `User` type:

```typescript
type User = {
  id: number
  name: string
  email: string
}
```

Now let's see how utility types can transform this:

### Partial<T> - Make All Properties Optional

```typescript
type PartialUser = Partial<User>
// Equivalent to:
// type PartialUser = {
//   id?: number
//   name?: string
//   email?: string
// }

// Perfect for update operations
function updateUser(id: number, updates: Partial<User>): void {
  // Only update the properties that are provided
  console.log(`Updating user ${id} with:`, updates)
}

updateUser(1, { name: "Alice" }) // Only updating name
updateUser(2, { email: "bob@example.com" }) // Only updating email
updateUser(3, { name: "Charlie", email: "charlie@example.com" }) // Updating multiple fields
```

### Readonly<T> - Make All Properties Read-Only

```typescript
type ReadonlyUser = Readonly<User>
// Equivalent to:
// type ReadonlyUser = {
//   readonly id: number
//   readonly name: string
//   readonly email: string
// }

// Perfect for data that shouldn't be modified
function displayUser(user: ReadonlyUser): void {
  console.log(`User: ${user.name} (${user.email})`)
  // user.name = "Hacked" // Error: Cannot assign to 'name' because it is a read-only property
}
```

### Pick<T, K> - Select Specific Properties

```typescript
type UserName = Pick<User, "name">
// Equivalent to:
// type UserName = {
//   name: string
// }

type UserContact = Pick<User, "name" | "email">
// Equivalent to:
// type UserContact = {
//   name: string
//   email: string
// }

// Perfect for creating focused interfaces
function sendEmail(user: Pick<User, "name" | "email">): void {
  console.log(`Sending email to ${user.name} at ${user.email}`)
}
```

Utility types are perfect for:

- Creating flexible update operations with `Partial`
- Protecting data from modification with `Readonly`
- Creating focused interfaces with `Pick`
- Building type-safe APIs that work with subsets of data
- Transforming types for different use cases

### Practice: Utility Types

**Your Task**: Open `src/section4_utility_types.ts` and complete the following:

1. Define a `User` type with:

   - `id`: number
   - `name`: string
   - `email`: string

2. Create examples of utility types:

   - `PartialUser`: using `Partial<User>`
   - `ReadonlyUser`: using `Readonly<User>`
   - `UserName`: using `Pick<User, "name">`

3. Create variables that demonstrate each utility type

**Hint**: Use `Partial<T>`, `Readonly<T>`, and `Pick<T, K>` to transform your base type.

---

## Bonus: Creating Your Own Generic Utilities

Once you understand generics, you can create your own utility functions that work with any type. Here are some common patterns:

### Merging Objects

```typescript
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 }
}

let person = { name: "Alice", age: 25 }
let contact = { email: "alice@example.com", phone: "555-1234" }

let fullProfile = merge(person, contact)
// Type: { name: string, age: number, email: string, phone: string }
```

### Wrapping Values in Arrays

```typescript
function wrapInArray<T>(value: T): T[] {
  return [value]
}

let wrappedString = wrapInArray("hello") // Type: string[]
let wrappedNumber = wrapInArray(42) // Type: number[]
let wrappedObject = wrapInArray({ name: "test" }) // Type: { name: string }[]
```

### Creating Type-Safe Object Keys

```typescript
function getKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}

let person = { name: "Alice", age: 25, email: "alice@example.com" }
let keys = getKeys(person) // Type: ("name" | "age" | "email")[]
```

These utility functions are perfect for:

- Creating reusable helper functions
- Building type-safe data transformation pipelines
- Implementing common patterns in a type-safe way
- Creating libraries that work with any type

### Practice: Custom Generic Utilities (Bonus Challenge)

**Your Task**: Open `src/section5_bonus_generic_utils.ts` and complete the following:

1. Create a `merge` function that:

   - Takes two generic type parameters `T` and `U`
   - Takes two parameters `obj1` of type `T` and `obj2` of type `U`
   - Returns a combined object of type `T & U`

2. Create a `wrapInArray` function that:

   - Takes a generic type parameter `T`
   - Takes a parameter `value` of type `T`
   - Returns an array containing that value

3. Test both functions

**Expected behavior**:

```typescript
let fullProfile = merge(person, contact)
console.log(fullProfile.name) // "Alice"
console.log(fullProfile.email) // "alice@example.com"

let wrappedString = wrapInArray("hello")
let wrappedNumber = wrapInArray(42)

console.log(wrappedString) // ["hello"]
console.log(wrappedNumber) // [42]
```

**Hint**: Use the spread operator `...` to merge objects. Use square brackets `[value]` to create an array.

---

## Why This Matters

Generics, type constraints, and utility types are essential for writing maintainable TypeScript code. They let you:

- **Write reusable code** - Create functions and classes that work with any type
- **Maintain type safety** - Get compile-time errors instead of runtime bugs
- **Build flexible APIs** - Create interfaces that adapt to different use cases
- **Transform types safely** - Use utility types to create new types from existing ones
- **Prevent common errors** - Use constraints to ensure types have required properties
- **Create powerful abstractions** - Build generic utilities that work across your entire codebase

These concepts are especially important when building applications with complex data models, creating reusable components, or working with external APIs where you need to transform data between different formats.

---

### Common Troubleshooting

**"Type 'X' does not satisfy the constraint 'Y'"**

- Check that your generic type meets the constraint requirements
- Make sure the type you're using has the required properties

**"Generic type 'T' is not assignable to parameter of type 'U'"**

- Verify that your generic type parameters are used correctly
- Check that the types you're passing match what the function expects

**"Property 'X' does not exist on type 'Y'"**

- Make sure you're using the correct type constraint
- Verify that the type you're working with has the expected properties

**"Cannot find name 'T'"**

- Make sure you've declared your generic type parameter with `<T>`
- Check that you're using the generic syntax correctly

**Tests failing?**

- Make sure you're using explicit type annotations where needed
- Check that your generic functions and classes are defined correctly
- Verify that you're calling your functions with the expected types
- Ensure your utility type examples are properly defined
- Make sure you're using the correct syntax for type constraints
