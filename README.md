# Elysia with Bun runtime

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun create elysia ./elysia-example
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

model Department {
id Int @id @default(autoincrement())
name String
status String @default("active") // active, inactive
createdAt DateTime @default(now())
Section Section[]
}

model Section {
id Int @id @default(autoincrement())
name String
departmentId Int
department Department @relation(fields: [departmentId], references: [id])
status String @default("active") // active, inactive
createdAt DateTime @default(now())
}
