<div align="center">

# 🌐 Interactive Portfolio
### 3D Canvas & GitHub-Synced Developer Showcase

<p align="center">
  <a href="https://interactive-portfolio-six-eta.vercel.app"><img src="https://img.shields.io/badge/Live-Production%20Site-0070F3?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Site" /></a>
  <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
</p>

```
  Interactive developer portfolio with GSAP animations, GitHub repository syncing,
  and Supabase-backed contact & analytics services.
```

---

</div>

## 📑 Table of Contents

- [Overview](#-overview)
- [Live Deployment](#-live-deployment)
- [Quick Start](#-quick-start)
- [Security & Environment](#-security--environment)

---

## 🌟 Overview

Built with TypeScript, Vite, GSAP, and Tailwind CSS, this portfolio dynamically surfaces project cards, language breakdowns, and interactive navigation with zero framework bloat.

---

## 🚀 Live Deployment

* **Production URL:** [https://interactive-portfolio-six-eta.vercel.app](https://interactive-portfolio-six-eta.vercel.app)
* **Hosting:** Vercel Edge Network ($0.00 Free Tier)

---

## 💻 Quick Start

```bash
git clone https://github.com/PTejasKr/interactive-portfolio.git
cd interactive-portfolio

cp .env.example .env
npm install
npm run dev
```

---

## 🛡️ Security & Environment

* Only public anon keys (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) should be exposed to the client bundle.
* Never commit `.env` or `.env.local` files to version control.
