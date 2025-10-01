# MasterCode - Code Snippet Manager

MasterCode is a modern web application for students & teachers to store, manage, and share code snippets. Built with React and styled with a sleek Cyber Neon theme, it provides an intuitive interface for organizing your code snippets with features like syntax highlighting, tags, and instant search.

## Features

- 🔐 **User Authentication**: Secure login and registration system
- 📝 **Snippet Management**: Create, edit, and delete code snippets
- 🎨 **Syntax Highlighting**: Support for multiple programming languages
- 🏷️ **Tag System**: Organize snippets with custom tags
- 🔍 **Search Functionality**: Quick search through your snippets
- 📊 **User Dashboard**: View your snippet statistics and activity
- 🌙 **Cyber Neon Theme**: Modern and eye-catching UI design
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack

### Frontend
- React
- React Router DOM
- Axios for API calls
- CSS with custom variables for theming

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/NalgondaLokesh/MasterCode.git
cd MasterCode
```

2. Install dependencies for frontend
```bash
cd mastercode
npm install
```

3. Install dependencies for backend
```bash
cd backend
npm install
```

4. Set up environment variables
Create `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Create `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

5. Start the development servers

For frontend:
```bash
cd mastercode
npm run dev
```

For backend:
```bash
cd backend
npm run dev
```

The frontend will be running on `http://localhost:5173` and the backend on `http://localhost:5000`.

## Usage

1. Register a new account or login
2. Create your first snippet using the "Create Snippet" button
3. Add title, description, code, and tags
4. View your snippets in the dashboard
5. Search, edit, or delete snippets as needed

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

NalgondaLokesh - [GitHub Profile](https://github.com/NalgondaLokesh)

Project Link: [https://github.com/NalgondaLokesh/MasterCode](https://github.com/NalgondaLokesh/MasterCode)

## Acknowledgments

- React Documentation
- MongoDB Documentation
- Express.js Documentation
- JWT Authentication Best Practices
