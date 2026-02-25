# Thaqva Masjid

A modern **mosque website** built with **HTML, CSS, and vanilla JavaScript** for Thaqva Masjid in Kozhikode, Kerala. The site features live prayer time countdowns, real-time Salah schedules fetched from an external API, smooth GSAP animations, and full bilingual support in English and Malayalam.

---

## Overview

This is a **single-page frontend website** designed to serve the Thaqva Masjid community. Visitors can view the masjid's story, check today's prayer times pulled live from the **azantimes.in** API, watch a real-time countdown to the next Salah, and find the masjid on an embedded Google Map.

The site is fully responsive, accessible, and requires no backend, build tools, or frameworks.

---

## Features

### Live Prayer Times
- Fetches today's Salah schedule in real-time from the **azantimes.in** API
- Covers all six daily timings: Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha
- Automatically highlights the current and upcoming prayer in the table
- Displays the date-labeled schedule in a clean, readable format

---

### Live Countdown Timer
- Real-time second-by-second countdown to the next Salah
- Automatically advances to the next prayer once the current one begins
- Animated digit transitions powered by GSAP
- Prayer strip below the timer highlights the upcoming prayer across all six timings

---

### Bilingual Support (English ↔ Malayalam)
- Full translation of all static and dynamic content
- Language toggle button injected into the navbar (EN / ML)
- User preference saved to **LocalStorage** and restored on next visit
- MutationObservers keep dynamically rendered prayer names (table, strip, countdown) in sync with the selected language

---

### GSAP Animations
- Smooth entrance animation for the navbar and hero section on page load
- Scroll-triggered reveal animations for the About section, Countdown, and Prayer Times
- Staggered card animations and slide-in text blocks for visual polish

---

### Responsive Design
- Optimized for desktop, tablet, and mobile devices
- Hamburger navigation menu for small screens
- Accessible markup with ARIA roles, labels, and keyboard navigation support

---

### Location
- Embedded interactive Google Map showing the masjid's exact location
- Direct link to Google Maps for directions

---

## Technologies Used

- HTML5
- CSS3 (Responsive Layout + Custom Properties + Animations)
- JavaScript (ES6+, IIFE modules)
- GSAP 3 + ScrollTrigger
- azantimes.in Prayer Times API
- Google Maps Embed API
- Google Fonts (Amiri + Inter)
- Web Storage API (LocalStorage)

---

## Project Structure

```text
├── index.html       # Page structure and all sections
├── style.css        # Styling, responsive design, and animations
├── script.js        # Prayer API, countdown timer, GSAP animations, navbar logic
├── translator.js    # Bilingual (EN/ML) translation module and language toggle UI
```

---

## Setup & Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/thaqva-masjid.git
   ```
   **OR** download the project as a `.zip` file and extract it.

2. Open `index.html` in any modern web browser.

No build tools, package managers, or server setup required.

> **Note:** Prayer times are fetched from a live external API. An internet connection is required for the prayer times and countdown features to function.

---

## Implementation Details

- Prayer data is fetched from `azantimes.in` and normalized from 12-hour to 24-hour format internally for accurate countdowns
- Countdown timer uses `setInterval` at 1-second intervals and recalculates the next prayer dynamically
- The `translator.js` module runs as a standalone IIFE — it does not modify `script.js` and instead uses `MutationObserver` to intercept dynamically rendered prayer names and translate them after the API populates the DOM
- GSAP ScrollTrigger is used for all scroll-based reveals, with staggered animations for cards and text blocks
- Active navbar link is tracked via scroll position offsets relative to each section

---

## Limitations

- Prayer times are specific to **Kozhikode North Assembly Constituency** and are not configurable from the UI
- Language options are limited to English and Malayalam
- No backend, CMS, or database — content is static
- Prayer times refresh only on page load, not automatically at midnight

---

## License

This project is **open-source** and intended for educational and portfolio use.

---

## Author

Designed and developed by **Zaman Siraj** as a portfolio project for Thaqva Masjid.

Built to demonstrate:
- API integration and real-time data rendering
- GSAP animation and scroll interaction
- Multilingual UI with dynamic DOM translation
- Accessible and responsive frontend design
- Vanilla JavaScript modular architecture
