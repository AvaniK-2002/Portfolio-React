# EmailJS Setup Guide

This guide will help you set up EmailJS to enable real-time email functionality for your contact form.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create an Email Service

1. Go to the **Email Services** section in your dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the authentication steps
5. **Copy the Service ID** - you'll need this later

## Step 3: Create an Email Template

1. Go to the **Email Templates** section
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Contact Form Message from {{from_name}}

Hi {{to_name}},

You have received a new message from your portfolio contact form:

From: {{from_name}} <{{from_email}}>
Timestamp: {{timestamp}}

Message:
{{message}}

Reply to: {{reply_to}}

---
This message was sent from your portfolio website contact form.
```

4. **Copy the Template ID** - you'll need this later

## Step 4: Get Your Public Key

1. Go to the **Account** section
2. Copy your **Public Key**

## Step 5: Configure Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```
   cp .env.example .env
   ```

2. Open the `.env` file and replace the placeholder values:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_actual_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
   ```

## Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to the Contact page
3. Fill out the form and submit
4. Check your email for the test message

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 50 emails per day
- Unlimited email templates

## Troubleshooting

### Emails not sending?
- Check that your EmailJS credentials are correct
- Verify your email service is properly authenticated
- Check the browser console for error messages
- Ensure your template variables match exactly

### Getting "Template not found" error?
- Double-check your Template ID
- Make sure the template is published (not in draft mode)

### Getting "Service not found" error?
- Verify your Service ID
- Make sure the service is active and properly configured

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Public key can be exposed in frontend code, but keep service ID and template ID secure

## Alternative Solutions

If you prefer not to use EmailJS, you can also consider:
- **Formspree**: https://formspree.io/
- **Netlify Forms**: https://docs.netlify.com/forms/ (if deploying to Netlify)
- **Formsubmit**: https://formsubmit.co/
- Custom backend with Node.js/Express

## Support

For EmailJS-specific issues:
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/