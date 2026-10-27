# [Your Name] · Portfolio

> One line about you: what you do and the kind of work you want next.

**Live site:** [your-site.com](#) · **Built with** HTML, CSS and plain JavaScript (no frameworks, no build step)

<!-- Add a screenshot: save it as screenshot.png in this folder and keep the line below -->
<!-- ![Portfolio preview](screenshot.png) -->

---

## Contents

1. [Overview](#overview)
2. [Project structure](#project-structure)
3. [Page sections](#page-sections)
4. [How it works](#how-it-works)
5. [Features](#features)
6. [Customising](#customising)
7. [Run it locally](#run-it-locally)
8. [Deploy](#deploy)
9. [Contact](#contact)

---

## Overview

A one-page personal portfolio with a terminal-style intro. It covers who I am, what I work
with, what I've built, my coding practice and GitHub activity, my journey, my writing and
how to reach me.

All the content is plain HTML in `index.html`: open it, find the section, change the text.
The JavaScript only adds behaviour.

---

## Project structure

```
portfolio/
├── index.html        All the content: header, ten sections, footer
├── css/
│   └── style.css     Colours, fonts, layout, light and dark themes, animations
├── js/
│   └── script.js     Behaviour only (menu, theme, typing intro, bars, GitHub numbers ...)
└── README.md
```

| File | Job | You edit it when |
| --- | --- | --- |
| `index.html` | Every word, link and card on the page, with `EDIT` comments where your details go | You update anything on the site |
| `css/style.css` | Design tokens on `:root`, then styles grouped by section | You change colours, fonts or layout |
| `js/script.js` | Reads the page and adds the moving parts | Rarely: you don't need it for your details |

---

## Page sections

The page scrolls top to bottom in this order. Each one is a `<section>` with its own ID.

| # | Section | ID | Shows |
| --- | --- | --- | --- |
| 1 | Hero | `#home` | A typed terminal line, status badge, name, role, tagline, Résumé button |
| 2 | About | `#about` | Bio paragraphs, focus tags, education and certification cards |
| 3 | Skills | `#skills` | Skill groups (Programming, Frameworks, Tools ...) |
| 4 | Projects | `#projects` | Project cards: category, feature count, description, tags, View and Code links, optional note |
| 5 | Problem solving | `#practice` | LeetCode-style profile: easy / medium / hard bars, stat tiles, activity squares |
| 6 | Open source | `#github` | Repos, followers, stars, years; language bar; pinned repositories |
| 7 | Journey | `#journey` | A timeline of milestones, ending on what's next |
| 8 | Writing | `#blog` | Article cards with category, read time and year |
| 9 | Milestones | `#recognition` | Awards, rankings, certifications, community work |
| 10 | Contact | `#contact` | Call to action, email with Copy button, social links |

The header holds the logo (`~/handle`), the section menu, the theme toggle and a menu
button for phones. The footer year updates by itself.

---

## How it works

```
 index.html (your content)          js/script.js (behaviour)
 ┌──────────────────────────┐        ┌────────────────────────────────────┐
 │ <section data-menu=...>  │  ───▶  │ builds the menu from data-menu     │
 │ "120/830" on each bar    │  ───▶  │ sets each bar's length             │
 │ data-pct on languages    │  ───▶  │ draws the language bar             │
 │ data-user on #github     │  ───▶  │ swaps in live GitHub numbers       │
 │ data-icon="github"       │  ───▶  │ draws the icon                     │
 └──────────────────────────┘        └────────────────────────────────────┘
```

---

## Features

- **Edit in one file:** all the content is in `index.html`, with comments showing where.
- **Light and dark theme:** follows the visitor's system setting; the toggle remembers their choice.
- **Responsive:** one centred column; grids collapse on tablets and phones, with a mobile menu.
- **Menu builds itself** from the sections and highlights the one on screen.
- **Live GitHub stats:** the numbers you write show first, then update from GitHub on your website.
- **Copy email** button with a toast message.
- **Accessible:** semantic sections, labelled buttons, and no animations for visitors who turn on reduced motion.
- **No dependencies:** only Google Fonts (Bricolage Grotesque, Figtree, IBM Plex Mono).

---

## Customising

| To | Do this in `index.html` |
| --- | --- |
| Change any text | Edit the words between the tags |
| Add a project, article, milestone, skill group or timeline step | Copy one whole card (for a project, `<article>` to `</article>`), paste it below the last, change its text |
| Remove something | Delete that card, tag or link |
| Remove a section | Delete it from `<section ...>` to `</section>`; its menu link goes too |
| Rename or hide a menu link | Change the section's `data-menu="..."`, or remove it to keep the section off the menu |
| Coding practice bars | Change `120/830` (solved/total); the bar length follows |
| Languages | Change the name, the `%` text and `data-pct` to match |
| GitHub live numbers | Put your username in `data-user` on the `#github` section |
| Icons | `data-icon=` `github`, `linkedin`, `x`, `code`, `mail`, `globe`, `trophy`, `star`, `badge` or `users` |
| Colours or fonts | `:root` variables in `css/style.css` (`--accent`, `--bg`, `--fg`, `--font-*`) |

---

## Run it locally

No install needed.

- **VS Code:** install the **Live Server** extension, right-click `index.html`, choose **Open with Live Server**.
- **Or** open `index.html` in a browser (the live GitHub numbers load best through a server).
- **Or** from this folder: `python -m http.server` and visit `http://localhost:8000`.

---

## Deploy

Upload the whole `portfolio` folder to any static host:

| Host | How |
| --- | --- |
| GitHub Pages | Push to a repo, then Settings > Pages > deploy from the main branch |
| Netlify | Drag the folder onto app.netlify.com/drop |
| Vercel | Import the repo; no build command, output folder is the root |

---

## Contact

**[Your Name]** · [you@example.com](mailto:you@example.com) · [LinkedIn](#) · [GitHub](#)

© [Year] [Your Name]. All rights reserved.
