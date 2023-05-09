## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev
```

## Playground

[Link to playground](http://localhost:3000/graphql)

Flow:

> Create user

```graphql
mutation CreateUser {
  createUser(
    input: {
      name: "nnngfhg2"
      age: 19
      email: "aaaom@ggg.co"
      password: "ghdfhf"
    }
  ) {
    id
    name
  }
}
```

> Create product

```graphql
mutation CreateProduct {
  createProduct(input: { name: "NAME", price: 22.88 }) {
    id
    name
    price
  }
}
```

> Add product to user

```graphql
mutation AddProductToUser {
  addProductToUser(userId: "", productId: "")
}
```

> Get user with products

```graphql
query {
  users {
    id
    name
    order {
      name
      price
    }
  }
}
```
