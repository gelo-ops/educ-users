# 📘 README

## 🧩 Project Overview

This project is a **Next.js + TypeScript** web app implementing:

- A **User Management Table** with:
    - Server-side pagination and sorting (Prisma)
    - Add, Edit, Delete operations with modals
    - Loading and error handling
- **Reusable UI components**:
    - DataTable
    - Modal dialogs
    - Form fields
    - Buttons
- **Prisma ORM** for database access
- **MUI (Material UI)** for styling

---

## 🏗️ Folder Structure

# 📘 README

## 🏗️ Project Folder Structure

```plaintext
src/
  app/
    (pages)/
      users/
        component/
          UsersTable.tsx        // Main table component
          types.ts              // User types
  component/
    DataTable/                  // Reusable DataTable
      index.tsx
      TableHead.tsx
      TableBody.tsx
      Pagination.tsx
      types.ts
    DefaultModal.tsx            // Reusable modal component
    FormField.tsx               // Reusable input field with loading
    Button.tsx                  // Reusable button
  hooks/
    useUsersTable.ts            // User fetching, sorting, CRUD hooks
    useAddUser.ts               // Hook to add users
    useEditUser.ts              // Hook to edit users
    useDeleteUser.ts            // Hook to delete users
  lib/
    prisma.ts                   // Prisma client instance
```

---

## ⚙️ Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/) (or any other Prisma-supported DB)
- [Material UI](https://mui.com/)

---

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
2. **Set up environment variables**

Create a .env:

DATABASE_URL=postgresql://username:password@localhost:5432/mydb

3. **Generate Prisma client**

npx prisma generate

4. **Run database migrations**

npx prisma migrate dev --name init

5. **Start the dev server**

npm run dev

