# Md. Tarikul Islam — Academic Portfolio Website

Academic portfolio website for Md. Tarikul Islam, M.S. student in Genetic Engineering and Biotechnology, University of Rajshahi. Research focus: structural bioinformatics, genetic disease mechanisms and molecular biology.

## 🌐 Live Site
Deploy to GitHub Pages: `https://<your-username>.github.io/<repo-name>`

---

## 🗂 File Structure

```
portfolio/
├── index.html        ← Main page (all sections)
├── styles.css        ← All styles, animations, layout
├── script.js         ← Mobile menu, contact form, scroll reveal, subtle DNA background
├── assets/
│   └── (optional extra files, e.g. CV PDF)
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
| Photo | `hero-photo` (the image file is `photo.jpeg`) |
| Publications | `pub-item` blocks |
| Awards | `award-item` blocks |

### Changing Your Photo
The hero photo is loaded from `photo.jpeg` in the main folder (`<img src="photo.jpeg" class="hero-photo">`).
To change it, upload a new image named `photo.jpeg` to the repo and replace the old one. A square image (about 600×600 px) works best.

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

- **Clean light theme** — white/gray backgrounds with a blue accent (`#1a56db`)
- **Subtle DNA helix** — faint canvas animation behind the hero section
- **Scroll reveal animations** — staggered fade-in of sections and cards
- **Responsive** — works on mobile, tablet and desktop, with a slide-down mobile menu
- **Working contact form** — see "Setting Up the Contact Form" below
- **Fonts** — Lora (headings), Inter (body), JetBrains Mono (labels), via Google Fonts
- **No dependencies** — pure HTML/CSS/JS, no frameworks

---

## 📬 Setting Up the Contact Form

The form works out of the box by opening the visitor's email app with their message filled in. To receive messages directly in your inbox instead:

1. Create a free account at [formspree.io](https://formspree.io) and make a new form
2. Copy your form ID (the part after `/f/` in the form URL, e.g. `xyzabcde`)
3. In `script.js`, find `FORMSPREE_ENDPOINT` and replace `YOUR_FORM_ID` with your ID
4. Commit the change — submissions will now arrive by email

Your email address is set in `CONTACT_EMAIL` at the top of the same block.

---

## 📋 Sections Included

1. **Hero** — Name, photo, tagline, research tags, profile links, faint DNA background
2. **About** — Objectives, personal details, memberships
3. **Education** — MSc thesis + BSc project timeline
4. **Research** — ABCD Lab volunteer work, ongoing manuscript
5. **Skills** — 6 categories: Experimental, Tools, Computational, Software, Analysis, Soft Skills
6. **Publications** — 3 entries (published, in-prep, project)
7. **Training** — 2 trainings + 4 tutorials/courses
8. **Awards** — All 8 honors from 2011–2021
9. **Teaching & Volunteering** — Tutor, Class Rep, NGO volunteer
10. **Referees** — Dr. Abu Reza + Dr. Apurba Kumar Roy
11. **Contact** — Email, social links and a contact form

---

## 🛠 Customization Tips

**Change accent color:** In `styles.css`, search for `#1a56db` (the blue accent) and replace it with your preferred color

**Change DNA background strength:** In `styles.css`, edit `opacity` in the `#dna-canvas` block (0.07 = faint). To disable it, remove the `<canvas id="dna-canvas">` line in `index.html`

**Change fonts:** In `index.html`, modify the Google Fonts link in the `<head>`

---

*Built with pure HTML, CSS, and JavaScript. No frameworks. No dependencies.*
