# Contact Form Email Integration - Setup Instructions

## What Was Changed

✅ **Contact Page UI Updates:**
- GitHub and LinkedIn are now displayed as proper glass-styled boxes (same as email/phone)
- Changed placeholder from "Your name" to "name"
- Removed the separate "Elsewhere" section

✅ **Backend Email Service:**
- Created Express.js backend server in `/backend/` folder
- Configured Nodemailer for Gmail integration
- Added `/api/send-email` endpoint to handle form submissions

✅ **Frontend Integration:**
- Updated contact form to send real email requests to backend
- Added loading state while email is being sent
- Added success/error messages to user feedback
- Configured Vite proxy to route API requests to backend

## Next Steps to Enable Email Functionality

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Set Up Gmail App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already done
3. Go to "App passwords" section
4. Generate an app password for Mail
5. Copy the 16-character password

### 3. Configure Environment Variables
1. Create `.env` file in the `backend/` folder
2. Add your Gmail credentials:
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   PORT=5000
   ```

### 4. Start Both Servers

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm start
```

## How to Test

1. Navigate to the Contact page on your portfolio
2. Fill in the form with test data
3. Click "Send message"
4. You should receive an email in your Gmail inbox with the contact details

## File Structure

```
chrono-gate-showcase/
├── backend/
│   ├── server.js           (Express server with email handler)
│   ├── package.json        (Backend dependencies)
│   ├── .env                (Environment variables - create this)
│   ├── .env.example        (Template for .env)
│   ├── .gitignore          (Git ignore rules)
│   └── README.md           (Detailed setup guide)
└── src/
    └── routes/
        └── contact.tsx     (Updated contact form)
```

## Important Security Notes

- Never commit `.env` file to git
- Always use app-specific passwords, never your actual Gmail password
- The `.gitignore` file in backend prevents accidental credential exposure
- CORS is enabled to allow frontend communication

Let me know if you need any adjustments!
