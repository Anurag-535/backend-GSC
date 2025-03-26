# Feed a Life - Backend

## Project Description
Feed a Life is a platform designed to reduce food waste by connecting restaurants with surplus food to individuals and organizations in need.

## Features
- User Authentication (JWT)
- Restaurant Registration
- Food Donation Management
- Geolocation-based Food Tracking
- Advanced Search Capabilities

## Technology Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for Authentication
- Bcrypt for Password Hashing
- Helmet for Security
- Cors for Cross-Origin Resource Sharing

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account
- Google Cloud Platform Account (Optional)

### Installation Steps
1. Clone the repository
2. Install dependencies
```bash
npm install
```

3. Create a `.env` file with:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
PORT=5000
```

### Running the Application
```bash
# Development Mode
npm run dev

# Production Mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register`: User Registration
- `POST /api/auth/login`: User Login

### Donations
- `POST /api/donations`: Create Donation
- `GET /api/donations`: List Donations
- `GET /api/donations/search`: Search Donations

### Restaurants
- `POST /api/restaurants`: Register Restaurant
- `GET /api/restaurants`: List Restaurants

## Deployment
- Recommended Platforms: 
  - Google Cloud Run
  - Firebase
  - Heroku

## Google Solution Challenge Alignment
- Reduces Food Waste
- Supports UN Sustainable Development Goals
- Uses Geolocation for Efficient Food Distribution
- Promotes Community Collaboration

## Contributing
1. Fork the Repository
2. Create Feature Branch
3. Commit Changes
4. Push to Branch
5. Create Pull Request

## License
MIT License
