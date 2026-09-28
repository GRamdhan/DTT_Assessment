# 🏠 DTT House Listings: Vue 3 assessment

A house-listing web app I built for the **DTT front-end developer assessment**. Users can browse, search, create, edit and delete house listings through the DTT REST API.

![Vue](https://img.shields.io/badge/Vue-3-42b883?logo=vue.js&logoColor=white)
![Vuex](https://img.shields.io/badge/Vuex-4-42b883)
![Vue Router](https://img.shields.io/badge/Vue_Router-4-42b883)
![ESLint](https://img.shields.io/badge/code_style-ESLint_%2B_Prettier-4B32C3?logo=eslint)

## Features

- **Overview of all listings** with image, price, size, bedrooms, bathrooms, construction year and garage.
- **Search by category**: city, description, price or size, plus a clear button.
- **Detail page** for each listing.
- **Create a listing** with a form and an image upload with preview.
- **Edit a listing**, including replacing the image.
- **Delete a listing** after a confirmation dialog.
- **Central state management** with Vuex (actions for all API calls, getters for filtering, and caching of fetched houses).
- **Client-side routing** with Vue Router, with a catch-all route that redirects to the home page.

## Tech stack

| Layer | Tools |
|---|---|
| Framework | Vue 3 (Options API and Composition API) |
| State | Vuex 4 |
| Routing | Vue Router 4 |
| API | DTT Houses REST API (`fetch`, `FormData` for multipart uploads) |
| Tooling | Vue CLI 5, Babel, ESLint, Prettier |

## Project structure

```
src/
├── api.js            # Reads the API key from environment variables
├── store/index.js    # Vuex store: state, getters, mutations, actions (API calls)
├── router/index.js   # Routes: home, detail, create, edit, about
├── views/            # HomePage, HousePage, CreateHouse, EditHouse, AboutPage
└── components/       # AppHeader (navigation)
```

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Add your API key (never commit this file)
cp .env.example .env.local
#    then edit .env.local and set VUE_APP_DTT_API_KEY

# 3. Run the development server
npm run serve

# Production build / lint
npm run build
npm run lint
```

## Security note: handling API keys

The first version of this project had the API key **hardcoded in the source**. I later moved it to an environment variable (`VUE_APP_DTT_API_KEY` in a git-ignored `.env.local`) and removed the old build output that contained it.

What I took away from this:

- **Secrets don't belong in source control.** Once a key has been committed, it stays in the git history, so the right fix is to **rotate the key**, not just delete it from the code.
- **Environment variables alone don't hide a key in a front-end app.** Vue CLI bakes them into the JavaScript bundle at build time, so anyone can read them in the browser. For production, API calls that need a secret should go through a small **backend proxy** that keeps the key on the server.
