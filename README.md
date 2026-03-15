# Video Thumbnail Gallery – Frontend

## Tech Stack

* React
* Vite
* Material UI
* React Query
* Axios
* React Router

## Features

* Video gallery display
* Search videos by title
* Filter videos by tags
* Video detail page
* Video player
* Thumbnail selection
* Responsive UI

## How to Run Frontend

### 1. Clone Repository

git clone https://github.com/yourusername/video-thumbnail-frontend.git

cd video-thumbnail-frontend

### 2. Install Dependencies

npm install

### 3. Start Development Server

npm run dev

Frontend will run at:

http://localhost:5173

## Backend Connection

The frontend connects to the backend API at:

http://localhost:5000/api

You can configure this inside:

src/services/api.js

## Environment Variables

No environment variables required for frontend.

## Project Structure

src
components
pages
services
App.jsx
main.jsx

## Notes

This frontend application consumes APIs from the backend service to fetch videos, thumbnails, and update the primary thumbnail.


# Short Design Note

## Overall Architecture

The application follows a **client–server architecture**.

The **frontend** is developed using React and communicates with the backend through REST APIs. It provides features such as displaying the video gallery, searching videos by title, filtering by tags, viewing video details, and selecting a primary thumbnail.

The **backend** is built using Node.js and Express.js. It handles API requests for uploading videos, fetching video data, generating thumbnails, and selecting a primary thumbnail. The backend also manages communication with the database.

**MongoDB** is used as the database to store video metadata and thumbnail information. Uploaded videos and generated thumbnails are stored locally in the server’s file system.

The workflow is:

1. User interacts with the React frontend.
2. Frontend sends API requests to the backend.
3. Backend processes the request and interacts with MongoDB.
4. Backend returns the required data to the frontend.
5. Frontend renders the gallery or video detail page.

---

## Database Schema

Two main collections are used:

### Video

Fields:

* `title` – video title
* `description` – video description
* `tags` – array of tags
* `videoUrl` – stored video file path
* `primaryThumbnail` – reference to selected thumbnail
* `createdAt` – upload timestamp

### Thumbnail

Fields:

* `videoId` – reference to the related video
* `url` – path of thumbnail image
* `timestamp` – time position in the video

Each video can have **multiple thumbnails**, but only one can be selected as the **primary thumbnail**.

---

## Thumbnail Generation

Thumbnail generation is implemented using **real extraction**.

When a video is uploaded, the backend uses a video processing tool (such as FFmpeg) to extract frames from the video at specific timestamps. These frames are saved as image files and stored on the server.

The generated thumbnails are then saved in the database with references to the video. The frontend allows the user to choose one of these thumbnails as the **primary thumbnail**.

---

## Trade-offs / Shortcuts

Due to time constraints, a few simplifications were made:

* Videos and thumbnails are stored locally instead of using cloud storage like AWS S3.
* Thumbnail generation is handled during upload rather than using a background job queue.
* Authentication and user management are not implemented.
* Basic validation and error handling are included but could be expanded further.

These decisions helped focus on implementing the core functionality within the available time.


