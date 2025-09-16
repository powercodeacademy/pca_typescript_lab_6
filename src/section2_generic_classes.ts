// TASK:
// Create a generic class `Box<T>`
// It should:
// - store a value of type T
// - have a method `getValue()` that returns the value

// Your code here 👇

class Box<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}
