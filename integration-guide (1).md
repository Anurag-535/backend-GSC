# Feed a Life - Full Stack Integration Guide

## Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account
- Web Browser
- Code Editor (VS Code recommended)

## Project Restructuring

### Recommended Project Structure
```
feed-a-life/
│
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   └── index.js (new file for API interactions)
│
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── app.js
│   └── package.json
│
└── README.md
```

## Setup Steps

1. Create Project Folders
```bash
mkdir feed-a-life
cd feed-a-life
mkdir frontend backend
```

2. Move Existing Frontend Files
- Move your existing HTML, CSS, and JS files into the `frontend/` directory

3. Backend Setup
```bash
cd backend
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken cors helmet axios
npm install -D nodemon
```

4. Create `.env` File in Backend
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

5. Update Frontend API Interaction
Create `frontend/index.js`:

```javascript
// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Fetch wrapper with error handling
async function apiFetch(endpoint, options = {}) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        return response.json();
    } catch (error) {
        console.error('API Error:', error);
        alert(error.message);
        throw error;
    }
}

// User Registration
async function registerUser(userData) {
    try {
        const response = await apiFetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        
        // Store token and user info
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        alert('Registration Successful!');
        navigateToPage('home');
    } catch (error) {
        console.error('Registration Failed', error);
    }
}

// User Login
async function loginUser(loginData) {
    try {
        const response = await apiFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify(loginData)
        });
        
        // Store token and user info
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        alert('Login Successful!');
        navigateToPage('home');
    } catch (error) {
        console.error('Login Failed', error);
    }
}

// Food Donation Submission
async function submitFoodDonation(donationData) {
    try {
        const response = await apiFetch('/donations', {
            method: 'POST',
            body: JSON.stringify(donationData)
        });
        
        alert('Food Donation Posted Successfully!');
        updateFoodListings();
    } catch (error) {
        console.error('Donation Submission Failed', error);
    }
}

// Update existing form submissions in app.js
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    registerForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = {
            name: formData.get('full-name'),
            email: formData.get('email'),
            password: formData.get('password'),
            userType: formData.get('user-type')
        };
        
        await registerUser(userData);
    });

    const loginForm = document.getElementById('login-form');
    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password')
        };
        
        await loginUser(loginData);
    });

    const foodDonationForm = document.getElementById('food-donation-form');
    foodDonationForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const donationData = {
            category: formData.get('food-category'),
            description: formData.get('food-description'),
            quantity: formData.get('quantity'),
            pickupTime: formData.get('pickup-time')
        };
        
        await submitFoodDonation(donationData);
    });
});
```

6. Update `index.html`
Add script reference:
```html
<script src="index.js"></script>
```

7. Update Backend `app.js` for CORS
```javascript
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true
}));
```

## Running the Application

### Terminal 1 (Backend)
```bash
cd backend
npm start  # Or npm run dev
```

### Terminal 2 (Frontend)
Use a simple local server like `live-server`
```bash
npm install -g live-server
cd frontend
live-server
```

## Deployment Considerations
- Use MongoDB Atlas for database
- Deploy backend on Heroku/Google Cloud
- Host frontend on Netlify/Vercel
- Set up environment variables

## Troubleshooting
- Ensure CORS is properly configured
- Check MongoDB connection string
- Verify all dependencies are installed
- Validate API endpoint URLs
```

## Configuration Files
I've included the following key files:
1. Backend setup
2. Frontend API interaction layer
3. Detailed integration guide

### Key Integration Points
- Added `index.js` for API interactions
- Updated form submissions to use async API calls
- Implemented token-based authentication
- Added error handling for API requests

### Recommended Next Steps
1. Implement refresh token mechanism
2. Add loading indicators during API calls
3. Create more robust error handling
4. Implement logout functionality

Would you like me to elaborate on any specific aspect of the integration or discuss deployment strategies?

The integration approach provides:
- Seamless connection between frontend and backend
- Secure authentication
- Error handling
- Token management
- Modular API interaction

Would you like me to clarify or expand on any part of the implementation?