# Adonis 6 + GraphQL

This is proof of concept of Adonis 6 with GraphQL.

The aim of this project is to show how to integrate GraphQL with Adonis 6.
Key features:
- single source of truth for schema:
  - validation schemas
  - GraphQL schemas
  - typescript type schemas
  - database schemas

1. For requests, we can use zod as source of truth for validation, type and graphql schema.
2. For response, we can use adonis db model as source of truth for graphql schema.
