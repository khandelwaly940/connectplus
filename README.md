# [ConnectPlus](https://khandelwaly940.github.io/connectplus/)

A modern learning platform with a Django backend and React frontend.

---

## 🚀 Features

- User registration and login
- Personalized learning roadmaps
- Weekly progress tracking
- Dashboard with stats
- Profile and settings pages
- ...and more!

---

## 🛠️ Tech Stack

- **Backend:** Django, Django REST Framework, PostgreSQL
- **Frontend:** React, Material-UI

---

## ⚡ Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/connectplus.git
cd connectplus
```

### 2. Backend Setup

```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
# Set up your .env file (see .env.example)
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup

```sh
cd ../frontend
npm install
# Set up your .env file (see .env.example)
npm start
```

---

## 🌐 Deployment

- **Frontend:** Hosted on GitHub Pages ([link](https://khandelwaly940.github.io/connectplus/))
- **Backend:** Hosted on Render ([link](https://your-backend.onrender.com))

---

## 📄 Documentation

- [Features](#features)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🔗 API Endpoints

| Endpoint                | Method | Description                |
|-------------------------|--------|----------------------------|
| `/api/register/`        | POST   | Register a new user        |
| `/api/token-auth/`      | POST   | Obtain auth token (login)  |
| `/api/roadmaps/`        | GET    | List user roadmaps         |
| ...                     | ...    | ...                        |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📧 License

[CC BY-NC 4.0](LICENSE) — No commercial use allowed. 