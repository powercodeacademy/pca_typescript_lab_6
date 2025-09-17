// Function that works with any type that has a length property
function logLength<T extends { length: number }>(item: T): void {
  console.log(item.length.toString())
}
