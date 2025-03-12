# Vue Project README

Welcome to the Vue Project! This document provides instructions on how to set up and run the project locally on your machine. Please follow the steps below carefully to ensure a smooth setup process.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16.x or higher recommended)
- **npm** (version 8.x or higher) or **yarn** (optional package manager)
- A code editor such as **Visual Studio Code** (recommended)

## Installation

1. **Clone the Repository**  
   Start by cloning this repository to your local machine using the following command:

git clone <repository-url>

Replace `<repository-url>` with the actual URL of the repository.

2. **Navigate to the Project Directory**  
   Change into the project directory:

cd <project-folder-name>

Replace `<project-folder-name>` with the name of the folder created during cloning.

3. **Install Dependencies**  
   Install the required dependencies using npm

npm install

## Configuration

This project requires an environment variable to connect to the backend API. Follow these steps to configure it:

1. **Create a `.env` File**  
   In the root directory of the project, create a file named `.env`.

2. **Add the Environment Variable**  
   Open the `.env` file in your text editor and add the following line:

VITE_APP_BACKEND_URL=<your-backend-url>

Replace `<your-backend-url>` with the actual URL of your backend API (e.g., `http://localhost:3000` or `https://api.example.com`).

Example:

VITE_APP_BACKEND_URL=https://my-backend-api.com

**Note:** Do not commit the `.env` file to version control if it contains sensitive information. Ensure it is listed in your `.gitignore` file.

## Running the Project

Once the dependencies are installed and the environment variable is configured, you can run the project locally.

1. **Start the Development Server**  
   Use the following command to start the Vue development server:

npm run dev

2. **Access the Application**  
   Open your browser and navigate to:

http://localhost:5173/

The port number (e.g., `5173`) may vary depending on your setup. Check the terminal output after running the command to confirm the correct port.

## Building for Production

To create a production-ready build of the project, run:

npm run build

The compiled files will be output to the `dist` directory, which can then be deployed to a web server.

## Troubleshooting

- **Missing Environment Variable**: If you see an error related to `VITE_APP_BACKEND_URL`, ensure the `.env` file is correctly set up and the variable is defined.
- **Port Conflicts**: If the default port is in use, Vite will automatically switch to another port. Check the terminal for the updated URL.
- **Dependency Issues**: Run `npm install` or `yarn install` again if you encounter module-related errors.

## Additional Notes

Thanks for giving me this opportunity! I went a little short on time, and I can assure you that many of my skills were not fully showcased due to this rush to complete it on time. I’d be happy if you decide to take the
next step to explore my skills further and allow me to explain them in greater detail.

For any questions or support, feel free to reach out.
