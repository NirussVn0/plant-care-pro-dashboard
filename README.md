# 🌿 PlantCare Pro

<div align="center">

![PlantCare Pro](https://img.shields.io/badge/PlantCare-Pro-007969?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTExIDIwQTcgNyAwIDAgMSA5LjggNi4xQzE1LjUgNSAxNyA0LjQ4IDE5IDIuMWMuMy40LjUuOC41IDEuMmEzLjk4IDMuOTggMCAwIDEtMS4yNiAyLjlhMTcuMzggMTcuMzggMCAwIDEtLjc0IDYuNzNBNyA3IDAgMCAxIDExIDIweiIvPjxwYXRoIGQ9Ik0yIDIxYzAtMy4yMiAxLjQzLTUuODggMy42OS03Ljg5YTcuMDcgNy4wNyAwIDAgMCAyIDQuMkE4LjQzIDguNDMgMCAwIDAgMiAyMXoiLz48cGF0aCBkPSJNMTEgMjBWNiIvPjwvc3ZnPg==)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

**Your Personal Plant Care Assistant** 🌱

Keep your indoor jungle thriving with smart reminders, care tracking, and expert tips.

[Demo](#demo) • [Features](#features) • [Getting Started](#getting-started) • [Tech Stack](#tech-stack) • [License](#license)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌿 **My Jungle** | Track all your plants in one beautiful dashboard |
| 📅 **Smart Scheduling** | Never miss a watering day with the interactive calendar |
| 📊 **Care History** | Log and review your plant care activities over time |
| 📚 **Encyclopedia** | Browse a comprehensive database of plant species |
| 🌙 **Dark Mode** | Beautiful UI that adapts to your preference |
| 🔐 **Demo Login** | Quick demo access without account setup |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/NirussVn0/PlantCarePro.git

# Navigate to project directory
cd PlantCarePro/plant-care-pro

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="120">

**Framework**

![Next.js](https://img.shields.io/badge/-Next.js-000?style=flat&logo=next.js)

</td>
<td align="center" width="120">

**Language**

![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

</td>
<td align="center" width="120">

**Styling**

![Tailwind](https://img.shields.io/badge/-Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

</td>
<td align="center" width="120">

**Animation**

![Anime.js](https://img.shields.io/badge/-Anime.js-F74C4C?style=flat)

</td>
</tr>
</table>

### Architecture

```
src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
│   ├── dashboard/          # Dashboard-specific components
│   ├── jungle/             # My Jungle page components
│   ├── schedule/           # Calendar & scheduling
│   ├── encyclopedia/       # Plant database components
│   ├── logs/               # Care history components
│   ├── layout/             # Header, Footer, etc.
│   └── ui/                 # Generic UI primitives
├── contexts/               # React Context providers
├── services/               # Data services (Service Factory pattern)
├── models/                 # TypeScript interfaces
└── lib/                    # Utilities and helpers
```

---

## 📸 Screenshots

| Dashboard | My Jungle |
|-----------|-----------|
| Overview with daily tasks and stats | Manage your plant collection |

| Schedule | Encyclopedia |
|----------|--------------|
| Interactive calendar with reminders | Browse plant species database |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with 💚 by [NirussVn0](https://github.com/NirussVn0)**

© 2026 NirussVn0. All rights reserved.

</div>
