# Lab 6 — Generics, Constraints & Utility Types (TypeScript)

Welcome to **Lab 6** of the TypeScript Labs! This lab focuses on mastering **generics**, **type constraints**, and **utility types** — tools that allow you to write powerful, reusable, and flexible TypeScript code.

## 🏆 Learning Goals

- Define generic functions and classes
- Apply constraints to generics using `extends`
- Use built-in TypeScript utility types like `Partial`, `Readonly`, and `Pick`
- (Bonus) Create reusable helper functions using generics

## 🛠️ What to Do

- Complete the tasks in each `src/` file
- Run the matching tests in the `test/` folder
- You do **not** need to use `export` — tests use a sandbox to evaluate your code

## ✅ How to Run Tests

```bash
npm install
npm test
```

## 🗂️ Lab Structure & Tasks

### 🔹 section1_generics.ts

- Write a function `identity<T>(value: T): T`
- Call it with both a string and a number

### 🔹 section2_generic_classes.ts

- Create a generic class `Box<T>`
- It should:

  - Store a value of type `T`
  - Have a method `getValue()` that returns it

### 🔹 section3_type_constraints.ts

- Write a function `logLength<T extends { length: number }>(item: T)`
- It should print the `.length` of the item

### 🔹 section4_utility_types.ts

- Define a `User` type with `id`, `name`, and `email`
- Create the following using it:

  - `Partial<User>`
  - `Readonly<User>`
  - `Pick<User, "name">`

### ⭐ section5_bonus_generic_utils.ts

- Write a generic function `merge<T, U>(obj1: T, obj2: U): T & U`
- Write a generic function `wrapInArray<T>(value: T): T[]`

---

**Ready?** Open `src/section1_generics.ts` and start building reusable TypeScript code! 🧠
