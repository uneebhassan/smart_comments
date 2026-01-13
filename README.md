# Smart Comments Blog

A social-media-style blog platform with **AI-powered comment moderation**. Comments are automatically classified as **safe** or **needs review**, flagged comments are highlighted, and moderators can review them in a dedicated view.

---

## 🚀 Architecture & Design Choices

### Backend (Django)

* **Framework:** Django + Django REST Framework
* **Apps:** `posts` (handles Post and Comment models)
* **Models:**

  * `Post`: title, body
  * `Comment`: author, text, post (FK), created_at, flagged
* **Endpoints:**

  * `GET /api/posts/` – list posts (lightweight feed)
  * `GET /api/posts/<id>/` – retrieve post with comments
  * `POST /api/posts/<id>/comments/` – add comment (moderation applied)
* **Design Decisions:**

  * Lightweight post listing for fast feed
  * Detailed post retrieval for moderator or post view
  * Modular app structure supports future features like likes, replies, and user profiles

### Frontend (React + TypeScript)

* **Architecture:** Component-based, feature folders, reusable components
* **Styling:** CSS Modules for scoped, modular styles
* **Key Components:**

  * `PostCard` – shows post summary and flagged comment count
  * `Comment` – highlights flagged comments
  * `PostDetail` – full post with comments and add-comment form
  * `Moderator` – lists all flagged comments
* **Design Decisions:** Clear separation of **reusable components** and **feature-based components**, modular and scalable for future enhancements

---

## 🤖 AI Integration Approach

* **Moderation API:** External service used to classify comment text
* **Flow:**

  1. User submits comment via frontend
  2. Backend calls the moderation API
  3. Backend sets `flagged=True` if API returns `needs_review`
  4. Frontend highlights flagged comments and shows them in moderator view
* **Why Backend Integration:** Centralized moderation ensures consistency and security; frontend only consumes the `flagged` field

---

## ⚡ Scaling, Testing & Monitoring

### Scaling

* **Backend:** PostgreSQL/MySQL, Redis caching, async moderation API calls with Celery
* **Frontend:** Lazy-loading, code splitting, infinite scroll for post feed, deploy via CDN

### Testing

* **Backend:** Unit tests for models and serializers, API tests with DRF test client, mock moderation API calls
* **Frontend:** Unit tests with React Testing Library + Jest, snapshot tests, end-to-end tests with Cypress

### Monitoring

* **Backend:** Log moderation API errors, monitor flagged comments metrics with Prometheus/Grafana, track exceptions with Sentry
* **Frontend:** Track frontend errors with Sentry, monitor API response times and performance

---

## 💡 Improvements With More Time

* **Backend:**

  * User authentication and roles
  * Approve/delete flagged comments
  * Batch moderation API calls for high traffic
  * Analytics dashboard for moderators

* **Frontend:**

  * Real-time comment updates with WebSockets
  * Infinite scroll and pagination for social-feed style
  * Likes, replies, and user profiles
  * Dark/light mode support
  * Moderator actions (approve, delete, override flagged comments)

---

## 📂 Project Structure

```
smart_comments/
├── backend/   # Django REST API, models, serializers, views
├── frontend/  # React + TypeScript, CSS Modules
└── README.md  # This file
```

---

## ⚙️ Setup Instructions

### Backend

```bash
cd backend
python -m venv venv
# Activate virtualenv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # follow prompts to create admin user
python manage.py runserver
```

* Open [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/) to log in with your superuser credentials.
* From the **admin panel**, go to **Posts** and click **Add Post** to create a new blog post.
* You can also manage comments directly from the admin interface.

### Frontend

```bash
cd frontend
npm install
npm start
```

* Open [http://localhost:3000](http://localhost:3000) to view posts and comments.
* Use **Moderator View** to filter flagged comments.

---

This README documents the **architecture, AI integration, scaling, testing, monitoring, and potential improvements** for the Smart Comments blog platform.
