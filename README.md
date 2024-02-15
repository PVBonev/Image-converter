# 🖼️ Alex and Petko Image Converter 🖼️

This project is a web application that features a React frontend and a Python Flask backend.

## Features 🌟

The application provides the following image processing features:
- Grayscale filter 🌚
- Monochrome filter ⚪⚫
- Gaussian blur 🌫️
- Inverse of colors 🔄

## Getting Started 🚀

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Python
- Flask

### Installation 📦

1. Clone the repository
2. Navigate to the project directory
3. Install the required dependencies for the frontend with `npm install`
4. Install the required dependencies for the backend with `pip install -r requirements.txt`

### Running the Application 🏃

To run the frontend, use the following command:
```
npm start
```
The frontend will be available at `http://localhost:3000` 🌐
To run the backend, use the following command:
```
npm run start-api
```
The backend will be hosted at `http://localhost:5000` 🌐

### Docker 🐳

A Dockerfile is provided in the `api` folder to create a Docker container for the backend. To build the Docker image, navigate to the directory and run:
```
docker build -t image-converter-api .
```

### Authors ✍️

* Aleksandar Hristov
* Petko Bonev