# Restaurant-Website-Demo
This is a demo website of a Restaurant.
# Golden Fork

A responsive front-end website for a meal-subscription service. Visitors can browse meals, filter by diet, build a personalised meal plan with a short quiz, compare pricing plans, and open a login page.

> **Note:** this is a front-end demo. The login and the contact form are simulated in the browser, and there is no backend or database.

## Features

- Meal gallery with diet filters (High Protein, Vegan, Vegetarian)
- Meal-plan generator: choose a diet, goal, allergies and daily calories to get a suggested plan (rule-based, runs in the browser)
- Pricing plans that send visitors to the login page
- Login page with a simulated sign-in that remembers your initials in `localStorage`
- Contact form with validation
- Responsive layout built with Tailwind CSS

## Tech stack

- HTML5
- Tailwind CSS 3 (built with the Tailwind CLI and PostCSS)
- JavaScript (ES6+)
- Font Awesome icons

## Run locally

```bash
git clone <your-repo-url>
cd <your-repo-folder>
npm install
npm run build:css
```

Then open `index.html` in your browser, or use the **Live Server** extension in VS Code.

While editing styles, run `npm run watch:css` to rebuild `style.css` automatically.

## Project structure

```text
.
├── index.html            Home page
├── login.html            Login page
├── script.js             Meals, plan generator, login and contact logic
├── style.css             Built Tailwind output (committed so the site works on GitHub Pages)
├── src/styles.css        Tailwind source styles
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Deployment

Hosted with GitHub Pages: **Settings > Pages > Deploy from a branch > `main` / root**.
Run `npm run build:css` and commit the updated `style.css` before pushing, because GitHub Pages does not run the Tailwind build.
