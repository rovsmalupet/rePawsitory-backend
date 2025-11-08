# Pet Health Backend API

This is the backend API for the Pet Health Management System.

## 🚀 Quick Start (Local Development)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5001`

## 📦 Deploying to Render

Follow these steps to deploy your backend to Render:

### Prerequisites
- A GitHub account
- Your code pushed to a GitHub repository

### Step-by-Step Deployment

1. **Push your code to GitHub** (if not already done)

2. **Go to Render.com**
   - Visit https://render.com
   - Sign up or log in with your GitHub account

3. **Create a New Web Service**
   - Click "New +" button → Select "Web Service"
   - Connect your GitHub repository
   - Select the `rePawsitory-backend` repository

4. **Configure the Service**
   - **Name**: `repawsitory-backend` (or any name you like)
   - **Root Directory**: `rePawsitory-rovs_testing_branch/pet-health-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Select "Free"

5. **Add Environment Variables**
   Click "Advanced" and add these environment variables:
   
   - **Key**: `MONGODB_URI`
     - **Value**: `mongodb+srv://rovickdompor_db_user:A559PoD0zfz6N2rr@cluster0.mizhw2z.mongodb.net/?appName=Cluster0`
   
   - **Key**: `PORT`
     - **Value**: `5001`
   
   - **Key**: `NODE_ENV`
     - **Value**: `production`
   
   - **Key**: `FRONTEND_URL` (optional, add when you deploy your frontend)
     - **Value**: `https://your-frontend-url.onrender.com`

6. **Deploy!**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - Wait 3-5 minutes for the deployment to complete

7. **Get Your API URL**
   - Once deployed, you'll get a URL like: `https://repawsitory-backend.onrender.com`
   - This is your API endpoint!

### 📝 Important Notes

- **Free tier limitations**: 
  - Your app will "sleep" after 15 minutes of inactivity
  - First request after sleeping may take 30-50 seconds
  - Limited to 750 hours/month (enough for hobby projects)

- **Testing your API**:
  - Test endpoint: `https://your-app-name.onrender.com/api/profile`
  - You should see your API responses

- **File uploads**: 
  - Uploaded files (pet images, medical records) will be stored temporarily
  - For production, consider using cloud storage like Cloudinary or AWS S3

### 🔐 Security Recommendations

1. **Change MongoDB password**: Create a new database user with a strong password
2. **Update CORS**: Once you deploy your frontend, update the CORS settings to only allow your frontend URL
3. **Use environment variables**: Never commit passwords or secrets to GitHub

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- Multer (file uploads)
