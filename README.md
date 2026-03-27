# KAWAL RUPIAH

> **Setiap Rupiah Rakyat, Dikawal Rakyat Secara Adil.**

Proyek ini dibangun untuk pendaftaran **Hackathon X DIGDAYA 2026 - Bank Indonesia & PIDI**.

- **Problem Statement:** Penguatan Ketahanan dan Inovasi Keuangan
- **Sub Problem Statement:** Smart Belanja Daerah

---

## 🚀 Live Demo (Vercel)

Aplikasi telah di-deploy secara publik dan dapat diakses melalui link berikut:

| Akses | URL / Link Demo | Deskripsi |
|---|---|---|
| 🖥️ **Admin Dashboard** (Desktop) | [https://kawal-rupiah-app.vercel.app](https://kawal-rupiah-app.vercel.app) | POV Pemerintah/KPK. Peta anomali pengadaan nasional, Price Oracle LKPP, dan peringatan *mark-up* harga. |
| 📱 **Citizen App** (Mobile) | [https://kawal-rupiah-app.vercel.app/mobile](https://kawal-rupiah-app.vercel.app/mobile) | POV Warga. *Progressive Web App* (PWA) untuk Citizen Mining, lengkap dengan fitur verifikasi proyek, reputasi, dan anti-kolusi. |

> **Tips Penjurian:** Buka link Admin Dashboard di laptop/PC, dan buka Citizen App di layar HP Anda untuk merasakan pengalaman yang optimal.

---

## 🌟 Fitur Utama

1. **AI Price Oracle & Anomaly Detection**
   Membandingkan harga proyek APBD secara *real-time* dengan standar LKPP (e-Katalog) untuk mendeteksi *mark-up* atau kewajaran harga tak wajar.
2. **Citizen Mining (Audit oleh Warga)**
   Warga lokal diubah menjadi "Auditor Part-time" dengan konsep *micro-tasking*. Warga di lokasi proyek akan ditugaskan untuk memotret dan mengecek progres langsung di lapangan dengan *reward*.
3. **Anti-Collusion Framework (Zero-Trust)**
   Sistem penugasan *Citizen Mining* dilakukan secara acak (Random Assignment) silang-kecamatan. Didukung oleh algoritma pHash (deteksi foto duplikat), pencocokan EXIF/GPS, dan *staking* deposit. Jika warga curang, deposit hangus.
4. **Blockchain Audit Trail**
   Penyelesaian proyek, *payment disbursement*, dan konsensus verifikasi lapangan dicatat dalam buku besar *Distributed Ledger Technology (DLT)* / Hyperledger Fabric agar data *immutable*.

---

## 🛠 Tech Stack

Aplikasi prototype interaktif ini (Frontend) dibangun dengan:
- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS v4 + Lucide Icons
- **Mapping:** React-Leaflet (Interactive Topographic Map)
- **Charts:** Recharts (Data Visualization)
- **Deployment:** Vercel (Edge-ready)

---

## 💻 Menjalankan di Lokal

Jika Anda ingin menjalankan atau memodifikasi *code* di komputer lokal Anda:

1. Clone repository ini:
   ```bash
   git clone https://github.com/mridho002/kawal-rupiah-app.git
   cd kawal-rupiah-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Mulai development server:
   ```bash
   npm run dev
   ```
4. Buka `http://localhost:3000` di browser Anda.

---
*© 2026 Tim Kawal Rupiah. Dibangun untuk transparansi dan ketahanan ekonomi Indonesia.*
