# Todo Application

This Todo application is full MERN based build, consists of a backend service, a frontend client, and a MongoDB database, all managed using Docker and Docker Compose. The backend is built with Express (Node.js), the frontend with React, and MongoDB is used for data storage.

## Project Structure

- **Backend Service**: Node.js server for the API.
- **Frontend Service**: React application for the user interface.
- **MongoDB Service**: Database service for storing application data.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/mugeshtn/TodoAppDockerised.git

#build and start the service
docker compose up --build

#stop the service
docker compose down
```
**Access in local browser**: localhost:5173


