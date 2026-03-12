# Connect+ Frontend

## Environment

Create a `.env` file in this folder when you want to point the frontend at a different backend:

```bash
cp .env.example .env
```

Available variable:

```bash
REACT_APP_API_URL=https://connectplus-7zyd.onrender.com
```

Notes:

- Set the value to the backend origin only. The app will append `/api` automatically.
- If `REACT_APP_API_URL` is omitted, the frontend falls back to the current production backend.

## Scripts

In this directory, run:

```bash
npm install
npm start
npm run build
npm run deploy
```

`npm run deploy` publishes the built app to GitHub Pages.
