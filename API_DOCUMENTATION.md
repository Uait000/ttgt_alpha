# API Documentation

## Overview

This API provides endpoints for managing news, events, vacancies, citizen appeals, and comments for the educational center website.

**Base URL:** `https://qffszoqxgxknekcnwipe.supabase.co/functions/v1`

**Authentication:** Bearer token using `VITE_SUPABASE_ANON_KEY`

---

## 1. News API

### Get All News
```
GET /news-api
```

**Query Parameters:**
- `category` (optional): Filter by category (`education`, `achievements`, `news`, `events`)
- `limit` (optional, default: 10): Number of items to return
- `offset` (optional, default: 0): Pagination offset

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "News Title",
      "slug": "news-title",
      "excerpt": "Short description",
      "content": "Full content",
      "category": "news",
      "author": "Author Name",
      "images": ["url1", "url2"],
      "views": 100,
      "likes": 25,
      "published": true,
      "published_at": "2025-01-15T00:00:00Z",
      "created_at": "2025-01-15T00:00:00Z",
      "updated_at": "2025-01-15T00:00:00Z"
    }
  ],
  "count": 50,
  "limit": 10,
  "offset": 0
}
```

### Get Single News
```
GET /news-api/:slug
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "title": "News Title",
    "slug": "news-title",
    "excerpt": "Short description",
    "content": "Full content",
    "category": "news",
    "author": "Author Name",
    "images": ["url1", "url2"],
    "views": 101,
    "likes": 25,
    "published": true,
    "published_at": "2025-01-15T00:00:00Z",
    "created_at": "2025-01-15T00:00:00Z",
    "updated_at": "2025-01-15T00:00:00Z"
  }
}
```

### Like News
```
POST /news-api/:id/like
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "likes": 26
  }
}
```

---

## 2. Appeals API

### Create Citizen Appeal
```
POST /appeals-api
```

**Request Body:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+7 123 456 7890",
  "subject": "Question about admission",
  "message": "I would like to know more about..."
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+7 123 456 7890",
    "subject": "Question about admission",
    "message": "I would like to know more about...",
    "status": "new",
    "created_at": "2025-01-15T00:00:00Z"
  },
  "message": "Appeal submitted successfully. We will contact you soon."
}
```

---

## 3. Content API

### Get Vacancies
```
GET /content-api?resource=vacancies
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Position Title",
      "department": "Department Name",
      "description": "Job description",
      "requirements": "Requirements text",
      "salary_range": "50000-70000",
      "contact_info": "hr@example.com",
      "active": true,
      "created_at": "2025-01-15T00:00:00Z"
    }
  ]
}
```

### Get Events
```
GET /content-api?resource=events
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Event Title",
      "description": "Event description",
      "location": "Main Hall",
      "start_date": "2025-02-01T10:00:00Z",
      "end_date": "2025-02-01T12:00:00Z",
      "image_url": "https://example.com/image.jpg",
      "registration_link": "https://example.com/register",
      "created_at": "2025-01-15T00:00:00Z"
    }
  ]
}
```

### Get Comments
```
GET /content-api?resource=comments&news_id=:newsId
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "news_id": "uuid",
      "author_name": "Jane Doe",
      "author_email": "jane@example.com",
      "content": "Great article!",
      "approved": true,
      "created_at": "2025-01-15T00:00:00Z"
    }
  ]
}
```

### Create Comment
```
POST /content-api?resource=comments
```

**Request Body:**
```json
{
  "news_id": "uuid",
  "author_name": "Jane Doe",
  "author_email": "jane@example.com",
  "content": "Great article!"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "news_id": "uuid",
    "author_name": "Jane Doe",
    "author_email": "jane@example.com",
    "content": "Great article!",
    "approved": false,
    "created_at": "2025-01-15T00:00:00Z"
  },
  "message": "Comment submitted for moderation"
}
```

---

## Database Schema

### Tables

#### `news`
- `id` (uuid, primary key)
- `title` (text)
- `slug` (text, unique)
- `excerpt` (text)
- `content` (text)
- `category` (text): education, achievements, news, events
- `author` (text)
- `images` (jsonb): Array of image URLs
- `views` (integer)
- `likes` (integer)
- `published` (boolean)
- `published_at` (timestamptz)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

#### `comments`
- `id` (uuid, primary key)
- `news_id` (uuid, foreign key)
- `author_name` (text)
- `author_email` (text, optional)
- `content` (text)
- `approved` (boolean)
- `created_at` (timestamptz)

#### `events`
- `id` (uuid, primary key)
- `title` (text)
- `description` (text)
- `location` (text, optional)
- `start_date` (timestamptz)
- `end_date` (timestamptz, optional)
- `image_url` (text, optional)
- `registration_link` (text, optional)
- `created_at` (timestamptz)

#### `citizen_appeals`
- `id` (uuid, primary key)
- `full_name` (text)
- `email` (text)
- `phone` (text, optional)
- `subject` (text)
- `message` (text)
- `status` (text): new, in_progress, resolved
- `created_at` (timestamptz)

#### `vacancies`
- `id` (uuid, primary key)
- `title` (text)
- `department` (text)
- `description` (text)
- `requirements` (text, optional)
- `salary_range` (text, optional)
- `contact_info` (text, optional)
- `active` (boolean)
- `created_at` (timestamptz)

---

## Security

All tables have Row Level Security (RLS) enabled:

- **Public read access** to published news, approved comments, events, and active vacancies
- **Public write access** for creating appeals and comments (subject to moderation)
- Comments and appeals require moderation before being displayed publicly

---

## Usage Example (JavaScript)

```javascript
import { newsApi, appealsApi, contentApi } from './services/api';

// Get all news
const { data: news } = await newsApi.getAll({ category: 'education', limit: 6 });

// Get single news
const { data: article } = await newsApi.getBySlug('news-slug');

// Like news
await newsApi.like(articleId);

// Submit appeal
await appealsApi.create({
  full_name: 'John Doe',
  email: 'john@example.com',
  subject: 'Question',
  message: 'My question...'
});

// Get vacancies
const { data: vacancies } = await contentApi.getVacancies();

// Get events
const { data: events } = await contentApi.getEvents();

// Get comments
const { data: comments } = await contentApi.getComments(newsId);

// Create comment
await contentApi.createComment({
  news_id: newsId,
  author_name: 'Jane Doe',
  content: 'Great article!'
});
```

---

## Error Handling

All endpoints return errors in the following format:

```json
{
  "error": "Error message"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error
