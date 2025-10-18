# 🧑‍💻 User Management UI

✨ **User Management UI** adalah aplikasi React sederhana untuk mengelola user dengan **CRUD**, **search**, dan **pagination**.

Dibuat sebagai bagian dari **Assessment Frontend Developer**.

---

## 🚀 Tech Stack

* ⚛️ **React 19** (Functional Components + Hooks)
* 📦 **React Query** untuk data fetching & state management
* 🎨 **Material UI (MUI v7)** untuk UI components
* 📝 **React Hook Form** untuk form handling
* 🎨 **Tailwind CSS v4** untuk utility-first styling & responsive utilities
* 🧪 **Zod** untuk schema validation (digunakan bersama React Hook Form)
* 💧 **Axios** untuk API requests (wrapper di folder `api/`)
* 🌐 **React Router v7** untuk routing
* 🛡️ **TypeScript** untuk type safety

---

## 📋 Fitur

* 📊 **Dashboard** Ringkasan visual Card dan Grafik
* 👀 Menampilkan daftar user dari API
* ➕ **Add User**
* ✏️ **Edit User**
* 🗑️ **Delete User**
* 🔍 **Search** user berdasarkan nama
* 📄 **Pagination** dinamis
* 🖥️ **Responsive**: mobile & desktop
* 👤 User avatar & menu dengan logout

---

## ⚙️ Instalasi & Menjalankan

1. **Clone repository**

```bash
git clone https://github.com/nazazulfiqi/indico-assessment.git
cd indico-assessment
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
```

3. **Jalankan project**

```bash
npm run dev
# atau
yarn dev
```

Aplikasi akan berjalan di:
`http://localhost:5173/`

---

## 🛠️ Implementation Highlights

* React + TypeScript
* React Query untuk data fetching & state lokal
* **CRUD** operations langsung terlihat di UI tanpa reload
* Pagination & search dinamis
* Material UI customization
* Responsive design untuk desktop & mobile
* Form handling menggunakan **React Hook Form**
* State update saat create/edit/delete user

---

## 🌐 API

* Digunakan API publik: [JSONPlaceholder - Users](https://jsonplaceholder.typicode.com/users)
* Data user baru hanya tersimpan di **state lokal** (mocked)

---

## 👤 Author

* **Naza Zulfiqi**
* 🌐 [www.nazazulfiqi.me](https://www.nazazulfiqi.me)
* 💻 [GitHub](https://github.com/nazazulfiqi)
* 🔗 [LinkedIn](https://www.linkedin.com/in/nazazulfiqi)
