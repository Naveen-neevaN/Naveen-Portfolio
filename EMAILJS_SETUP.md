# EmailJS Setup Guide

The contact form now uses **EmailJS** to send emails directly to your inbox without needing a backend server.

## Step-by-Step Setup

### 1. Create an EmailJS Account
- Go to https://www.emailjs.com/
- Sign up with a free account (includes 200 emails/month)

### 2. Connect Your Email Service
- In the EmailJS dashboard, go to **Email Services**
- Click **Add Service**
- Choose **Gmail** (or your email provider)
- Authorize EmailJS to send emails from your account
- Save your **Service ID** (e.g., `service_xxxxxxx`)

### 3. Create an Email Template
- Go to **Email Templates** in the dashboard
- Click **Create New Template**
- Name it: `Contact Form Message`
- Set **Template ID**: `template_contact_message`

**Template Content:**
```
To: naveennagendiran321@gmail.com
Subject: New Contact Form Submission

Name: {{from_name}}
Email: {{from_email}}
Message:
{{message}}

---
Reply to: {{reply_to}}
```

### 4. Get Your Public Key
- Go to **Account** → **API Keys**
- Copy your **Public Key**
- It looks like: `abc123def456ghi789`

### 5. Update the Contact Component
Update `src/components/Contact.jsx` with your keys:

```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE'  // ← Replace this
const EMAILJS_SERVICE_ID = 'service_contact_form'
const EMAILJS_TEMPLATE_ID = 'template_contact_message'
```

Replace `YOUR_PUBLIC_KEY_HERE` with your actual Public Key from step 4.

### 6. Test Locally
- Run `npm run dev`
- Go to Contact section
- Submit the form
- Check your email at naveennagendiran321@gmail.com

## Important Notes

✅ Works on both **local development** and **production (GitHub Pages)**
✅ No backend server needed
✅ Free tier includes 200 emails/month
⚠️ Keep your Public Key visible (it's safe to expose in frontend code)

## Troubleshooting

If emails don't arrive:
1. Check your **Spam/Junk** folder
2. Verify the Service ID and Template ID are correct
3. Check the **Logs** in EmailJS dashboard for errors
4. Ensure Gmail has authorized EmailJS (check Gmail connected app)

## Disable API Route
The old `/api/storeMessage` route has been removed. No Excel files are created anymore.
