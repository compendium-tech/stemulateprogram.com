# Supabase Setup Guide

This supabase folder contains the necessary SQL schemas, policies, and email templates for your Supabase project. Follow these steps to set up your
database and authentication securely:

## Database Schema and Policies:

- Navigate to your Supabase project dashboard in your web browser.
- Go to the SQL Editor section.
- Open `database/schema.sql` from this folder in a text editor. Copy its entire content.
- Paste the copied SQL into the Supabase SQL Editor and run it. This will create the necessary tables for your application.
- Next, open files in `policies` folder in a text editor. Copy their contents one by one. Paste each policy's content into the Supabase SQL Editor and run them. These policies will establish row-level security, ensuring users can only access data they are authorized to view or modify.

## hCaptcha Integration (Authentication Attack Security):

- If you haven't already, sign up for an account on hCaptcha.
- Obtain your hCaptcha site key and secret key.
- In your Supabase project dashboard, go to the Authentication section.
- Select the Attack Protection tab (or similar security settings).
- Paste your hCaptcha secret token into the designated field to enable captcha protection for your authentication flows.
- Change `HCAPTCHA_SITE_KEY` variable in `/src/globals.ts`.

## Custom Email Templates (Optional):

- If you wish to customize the authentication emails (e.g., signup confirmation, magic links), you can use the provided templates.
- In your Supabase project dashboard, go to the Authentication section.
- Select the Email Templates tab.
- Open `auth/email` in a code editor. Copy the content of each HTML file and paste it into the corresponding email template field in the Supabase dashboard. This will replace the default email templates with your custom versions.
