// Define a User type
type User = {
  id: number
  name: string
  email: string
}

// Create utility type examples
type PartialUser = Partial<User>
type ReadonlyUser = Readonly<User>
type UserName = Pick<User, "name">

// Create instances to demonstrate the utility types
let partialUser: PartialUser = { id: 1, name: "Alice" }
let readonlyUser: ReadonlyUser = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
}
let pickUser: UserName = { name: "Charlie" }
