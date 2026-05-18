Simple Express.js backend project using TypeScript for learning basic routing, controllers, req.params, req.body, and clean folder structure.

```
Express_Typescript
├─ package-lock.json
├─ package.json
├─ prisma
│  ├─ migrations
│  │  ├─ 20260513084325_init_product_table
│  │  │  └─ migration.sql
│  │  ├─ 20260515114752_create_user_relation
│  │  │  └─ migration.sql
│  │  ├─ 20260518084458_add_user_point
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ prisma.config.ts
├─ README.md
├─ src
│  ├─ controllers
│  │  ├─ productController.ts
│  │  └─ userController.ts
│  ├─ index.ts
│  ├─ lib
│  │  └─ prisma.ts
│  ├─ middleware
│  │  ├─ apikeyMiddleware.ts
│  │  └─ logMiddleware.ts
│  └─ routes
│     ├─ index.ts
│     ├─ productRoute.ts
│     └─ userRoutes.ts
└─ tsconfig.json

```