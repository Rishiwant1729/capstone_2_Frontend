# CritiCore Frontend - Book Management Dashboard

A modern React-based frontend for uploading PDFs, managing books, and viewing AI-generated summaries.

## 🚀 Features

- ✅ **User Authentication**: Signup, login, and session management
- ✅ **Book Upload**: Upload PDF files with metadata
- ✅ **Dashboard**: View and manage all uploaded books
- ✅ **Summary View**: Read generated summaries for each book
- ✅ **User Profile**: View and manage user information
- ✅ **Protected Routes**: Secure pages requiring authentication
- ✅ **Responsive Design**: Works on desktop and mobile devices

## 📋 Tech Stack

- **Framework**: React 19.x
- **Build Tool**: Vite 7.x
- **Routing**: React Router v7
- **HTTP Client**: Fetch API
- **Styling**: CSS-in-JS (scoped styles)
- **State Management**: React Hooks (useState, useEffect)

## 📄 Pages

### Public Pages
- **Home** (`/`) - Landing page with features
- **Login** (`/login`) - User login
- **Signup** (`/signup`) - User registration

### Protected Pages
- **Dashboard** (`/dashboard`) - View all uploaded books
- **Upload** (`/upload`) - Upload new books
- **Book Details** (`/books/:id`) - View book summary
- **Profile** (`/profile`) - User profile management

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd capstone_2_Frontend-rishi
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file:
```env
VITE_API_URL=http://localhost:5001/
```

4. **Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📂 Project Structure

```
capstone_2_Frontend-rishi/
├── src/
│   ├── App.jsx                 # Main app with routes
│   ├── main.jsx                # Entry point
│   ├── index.css               # Global styles
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # Login page
│   │   ├── Signup.jsx          # Signup page
│   │   ├── BooksList.jsx       # Dashboard
│   │   ├── BookDetails.jsx     # Summary view
│   │   ├── Upload.jsx          # Upload page
│   │   └── Profile.jsx         # Profile page
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── hooks/
│   │   └── useAuth.js          # Authentication hook
│   ├── components/
│   │   └── LoadingSpinner.jsx  # Loading component
│   └── utils/
│       └── protectedRoute.jsx  # Protected route wrapper
├── public/
├── index.html
├── vite.config.js
└── package.json
```

## 🔌 API Integration

The frontend connects to the backend API through the service layer (`src/services/api.js`):

### Available API Functions

```javascript
import {
  signup,
  login,
  getProfile,
  uploadBook,
  getBooks,
  getBookSummary,
  deleteBook
} from './services/api';
```

### Authentication Flow

1. User signs up or logs in
2. JWT token stored in `localStorage`
3. Token included in all authenticated requests
4. Protected routes check for token presence

## 🎨 Styling

The app uses inline CSS-in-JS for component-specific styles:
- Clean, modern design
- Gradient backgrounds
- Card-based layouts
- Responsive grid systems
- Smooth animations and transitions

## 🔐 Protected Routes

Protected routes use the `ProtectedRoute` component which:
- Checks for authentication token
- Shows loading spinner while checking
- Redirects to login if not authenticated
- Allows access if authenticated

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Build for Production

```bash
# Build the app
npm run build

# Preview the build
npm run preview
```

The build output will be in the `dist/` directory.

## 🌐 Deployment

The frontend can be deployed to:
- **Vercel** (recommended for Vite)
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

### Vercel Deployment

```bash
npm install -g vercel
vercel
```

### Environment Variables

Make sure to set `VITE_API_URL` in your deployment platform's environment variables.

## 🧪 Development

```bash
# Run development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing

### Development
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `eslint` - Code linting

## 🎯 Features Roadmap

- [ ] Add search functionality
- [ ] Implement book categories/tags
- [ ] Add pagination for book lists
- [ ] Implement AI-powered summary regeneration
- [ ] Add export summary feature
- [ ] Implement dark mode
- [ ] Add book sharing capabilities

## 📄 License

MIT

## 👨‍💻 Author

Rishi Kumar
