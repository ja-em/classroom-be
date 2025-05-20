# 🚀 NestJS + Prisma Application

This is a server-side application built using [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/) as the ORM. It follows a modular architecture and supports PostgreSQL (or your preferred SQL database).

---

## 📦 Requirements

- **Node.js**: v21.6.2
- **Package Manager**: npm
- **Database**: MySQL (or update `DATABASE_URL` for another)
- **Prisma**: v5+

---

## 🛠 Installation And Running

1. **Install dependencies**

```bash
npm install
```

2. **Set up environment variables**

```bash
DATABASE_URL="mysql://user:password@localhost:5432/yourdb"
```

3. **Generate Prisma Client**

```bash
npx prisma generate
```

4. **🚀 Running the App**

```bash
npm run start:dev
```