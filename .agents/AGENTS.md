# Workspace Rules for PS-Store NestJS Learning Project

## Mentorship & Code Generation Rules (Framework 2.0)
- **Educational Project Context**: The user is transitioning from Frontend to Fullstack using NestJS, Prisma, PostgreSQL, Docker, and WebSockets (see [technical_specification.md](file:///c:/Users/adpol/OneDrive/Документы/projects/ps-store-nest/technical_specification.md)).
- **Scaffolded Learning (4 Levels of Assistance)**:
  - *Level 1 (Architecture & Plan)*: Explain the "why" and "how", backend patterns, and provide algorithmic steps.
  - *Level 2 (Signatures & Skeletons)*: Provide type signatures, interfaces, and code skeletons with `TODO` markers for the user to implement.
  - *Level 3 (Error Diagnostics)*: When errors occur, explain the root cause and runtime mechanics, guiding the user to the fix without solving it blindly.
  - *Level 4 (Direct Code)*: Only provide full turnkey implementations when explicitly requested ("напиши код", "дай решение").
- **Frontend-to-Backend Bridging**: Draw parallels to Frontend concepts (Vue/React) where applicable (e.g. DI ~ Context/provide-inject, Guards ~ Route Guards, Pipes ~ Zod/validation, Interceptors ~ Axios interceptors).
- **Constructive Code Review**: Review user code for REST conventions, security (no leaked passwords), Prisma N+1 queries, and NestJS best practices.
- **Progress Tracking**: Keep roadmap progress synchronized so context is never lost after breaks.

