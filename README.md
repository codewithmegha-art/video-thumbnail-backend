# Video Thumbnail Gallery – Backend

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* FFmpeg (for thumbnail extraction)
* Multer (file upload)

## Features

* Upload video
* Generate thumbnails automatically
* Store video metadata
* Retrieve video gallery
* Select primary thumbnail

## How to Run Backend

### 1. Clone Repository

git clone https://github.com/yourusername/video-thumbnail-backend.git

cd video-thumbnail-backend

### 2. Install Dependencies

npm install

### 3. Setup Environment Variables

Create a .env file in the root directory.

Example:

PORT=5000
MONGO_URI=mongodb://localhost:27017/video-gallery

### 4. Start Server

npm start

Server runs at:

http://localhost:5000

## API Endpoints

GET /api/videos
Fetch all videos

GET /api/videos/:id
Fetch video details and thumbnails

POST /api/videos/upload
Upload a video file

POST /api/videos/:id/thumbnails/select
Select primary thumbnail

## Database Schema

### Video

* title (String)
* description (String)
* tags (Array)
* videoUrl (String)
* primaryThumbnail (ObjectId)
* createdAt (Date)

### Thumbnail

* videoId (ObjectId)
* url (String)
* timestamp (Number)

## Thumbnail Generation

When a video is uploaded, FFmpeg extracts frames at different timestamps and saves them as thumbnail images. These thumbnails are stored on the server and referenced in the database.

## Trade-offs / Shortcuts

* Local file storage is used instead of cloud storage (AWS S3).
* Thumbnail generation is synchronous for simplicity.
* Basic validation implemented due to time constraints.

## Folder Structure

controllers
models
routes
uploads
server.js

## Notes

The backend exposes REST APIs consumed by the frontend application to display videos and thumbnails.

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


