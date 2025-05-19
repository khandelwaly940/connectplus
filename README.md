# Connect+

A personalized roadmap generation web application that helps users create custom learning paths based on their time, skill level, and preferences.

## Tech Stack
- Backend: Django REST Framework
- Frontend: React
- Database: PostgreSQL
- Styling: Tailwind CSS

## Setup Instructions

### Backend Setup
1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up PostgreSQL database and update settings.py with your database credentials

4. Run migrations:
```bash
python manage.py migrate
```

5. Start the development server:
```bash
python manage.py runserver
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Features
- User authentication
- Personalized roadmap generation
- Customizable learning paths
- Progress tracking
- Resource recommendations 