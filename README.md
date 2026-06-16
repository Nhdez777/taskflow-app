# TaskFlow

A full-stack task management app with real-time collaboration, drag-and-drop kanban boards, and a clean interface that stays out of your way.

Built this because I kept bouncing between Notion, Trello, and sticky notes. Wanted something minimal but actually functional.

![TaskFlow Demo](https://via.placeholder.com/800x400/f8f9fa/6c757d?text=TaskFlow+Screenshot)

## features

- **kanban boards** — drag and drop tasks between columns, reorder within columns
- **real-time sync** — changes appear instantly across open tabs (WebSocket)
- **user auth** — JWT-based login/signup with hashed passwords
- **labels & due dates** — filter and sort tasks by priority or deadline
- **dark mode** — because obviously

## tech stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, TypeScript, TailwindCSS |
| Backend | Node.js, Express |
| Database | PostgreSQL + Prisma ORM |
| Auth | JWT + bcrypt |
| Real-time | Socket.IO |
| Deployment | Railway (backend), Vercel (frontend) |

## getting started

```bash
# clone the repo
git clone https://github.com/Nhdez777/taskflow-app.git
cd taskflow-app

# install dependencies
npm install

# set up environment variables
cp .env.example .env
# fill in your DATABASE_URL, JWT_SECRET

# run database migrations
npx prisma migrate dev

# start dev servers (runs both frontend + backend)
npm run dev
```

App runs at `http://localhost:3000`.

## project structure

```
taskflow-app/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Board.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   └── Column.tsx
│   │   ├── hooks/
│   │   │   ├── useBoard.ts
│   │   │   └── useSocket.ts
│   │   └── pages/
├── server/              # Express backend
│   ├── routes/
│   ├── middleware/
│   └── prisma/
│       └── schema.prisma
└── README.md
```

## api routes

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/boards
POST   /api/boards
GET    /api/boards/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

## things i want to add

- [ ] team workspaces / invite system
- [ ] email notifications for due dates
- [ ] task comments & attachments
- [ ] mobile app (React Native maybe)

## lessons learned

- Prisma makes database work so much less painful
- WebSockets and React state need careful coordination to avoid ghost updates
- CSS-in-JS vs Tailwind: I've switched to Tailwind and not looking back

---

made with way too much coffee ☕
