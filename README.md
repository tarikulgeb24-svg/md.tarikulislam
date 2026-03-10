# Md. Tarikul Islam — Academic Portfolio Website

A world-class academic portfolio for Md. Tarikul Islam, MSc researcher in Genetic Engineering and Biotechnology, University of Rajshahi.

## 🌐 Live Site
Deploy to GitHub Pages: `https://<your-username>.github.io/<repo-name>`

---

## 🗂 File Structure

```
portfolio/
├── index.html        ← Main page (all sections)
├── styles.css        ← All styles, animations, layout
├── script.js         ← DNA animation, interactions, scroll reveal
├── assets/
│   └── (add your photo here as photo.jpg)
└── README.md
```

---

## 🚀 GitHub Pages Deployment

### Step 1 — Create a GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click **New repository**
3. Name it: `tarikul-islam` (or `<your-username>.github.io` for a root site)
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Upload Files
**Option A — Drag & Drop (Easy)**
1. In your new repo, click **Add file → Upload files**
2. Drag all 4 files: `index.html`, `styles.css`, `script.js`, `README.md`
3. Add the `assets/` folder with your photo
4. Click **Commit changes**

**Option B — Git CLI**
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings** tab
2. Scroll down to **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch, **/ (root)** folder
5. Click **Save**
6. Wait ~2 minutes, then visit: `https://<your-username>.github.io/<repo-name>`

---

## ✏️ How to Update Content

All content is in `index.html`. Search for the section you want to update:

| Section | Search for |
|---------|------------|
| Contact info | `tarikul.geb24@gmail.com` |
| Social links | `href="#"` (replace with your real URLs) |
| Photo | `portrait-initials` → replace with `<img>` tag |
| Publications | `pub-item` blocks |
| Awards | `award-item` blocks |

### Adding Your Photo
1. Save your photo as `assets/photo.jpg`
2. In `index.html`, find the `.portrait-frame` div
3. Replace the `portrait-initials` div with:
```html
<img src="assets/photo.jpg" alt="Md. Tarikul Islam" 
     style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
```

### Adding Social Media Links
Find these lines in `index.html` and replace `href="#"`:
```html
<a href="https://linkedin.com/in/YOUR-LINKEDIN" class="social-btn">in</a>
<a href="https://orcid.org/YOUR-ORCID-ID" class="social-btn">iD</a>
<a href="https://researchgate.net/profile/YOUR-PROFILE" class="social-btn">RG</a>
<a href="https://scholar.google.com/citations?user=YOUR-ID" class="social-btn">GS</a>
```

### Adding a CV Download
1. Save your CV as `assets/CV_Tarikul_Islam.pdf`
2. In `index.html`, change the "Get In Touch" button to:
```html
<a href="assets/CV_Tarikul_Islam.pdf" class="btn-outline" download>Download CV</a>
```

---

## 🎨 Design Features

- **Dark luxury aesthetic** — deep navy/teal color scheme
- **Animated DNA helix** — canvas-based scientific background
- **Custom cursor** — glowing teal cursor with trail
- **Scroll reveal animations** — staggered section reveals
- **Responsive** — works on mobile, tablet, desktop
- **Google Fonts** — Cormorant Garamond + Syne + DM Mono
- **No dependencies** — pure HTML/CSS/JS, no frameworks

---

## 📋 Sections Included

1. **Hero** — Name, tagline, disciplines, animated DNA background
2. **About** — Objectives, portrait placeholder, memberships
3. **Education** — MSc thesis + BSc project timeline
4. **Research** — ABCD Lab volunteer work, ongoing manuscript
5. **Skills** — 6 categories: Experimental, Tools, Computational, Software, Analysis, Soft Skills
6. **Publications** — 3 entries (published, in-prep, project)
7. **Training** — 2 trainings + 4 tutorials/courses
8. **Awards** — All 8 honors from 2011–2021
9. **Teaching & Volunteering** — Tutor, Class Rep, NGO volunteer
10. **Referees** — Dr. Abu Reza + Dr. Apurba Kumar Roy
11. **Contact** — Email form + social links

---

## 🛠 Customization Tips

**Change accent color:** In `styles.css`, change `--accent: #4af0c8` to any color

**Disable DNA animation:** In `script.js`, comment out the `draw()` call

**Change fonts:** In `index.html`, modify the Google Fonts import URL

---

*Built with pure HTML, CSS, and JavaScript. No frameworks. No dependencies.*
