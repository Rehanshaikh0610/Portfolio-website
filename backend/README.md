# Backend Setup Guide

This backend handles email sending for the portfolio contact form.

## Prerequisites

- Node.js (v14 or higher)
- Gmail account with 2FA enabled

## Setup Instructions

### 1. Create a Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if not already enabled
3. Go to "App passwords" (under 2-Step Verification)
4. Select "Mail" and "Windows Computer" (or your device)
5. Google will generate a 16-character password - copy this

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and update:
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=your-app-password
   PORT=5000
   ```

### 3. Install Dependencies

```bash
cd backend
npm install
```

### 4. Start the Backend Server

For development with auto-reload:
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will run on `http://localhost:5000`

## How It Works

1. Frontend sends form data to `/api/send-email`
2. Backend validates the data
3. Email is sent to your Gmail account with the contact details
4. User receives confirmation on the frontend

## Testing

Test the endpoint using curl:
```bash
curl -X POST http://localhost:5000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

## Important Notes

- Do NOT use your actual Gmail password
- Always use an app-specific password
- Keep `.env` file in `.gitignore` (already configured)
- For production, consider using environment variables from your hosting provider

## Troubleshooting

**Issue: "Invalid login credentials"**
- Verify EMAIL_USER and EMAIL_PASSWORD are correct
- Check that 2FA is enabled on your Gmail account
- Generate a new app password if needed

**Issue: Backend not receiving requests**
- Ensure backend is running on port 5000
- Check that frontend Vite proxy is configured correctly
- Verify CORS is enabled in server.js
