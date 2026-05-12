# Supabase & Google OAuth Setup Guide

This guide outlines the steps to configure your Supabase environment variables and set up Google Authentication.

## Part 1: Finding Your Supabase Environment Variables

You need these keys to connect your local project to your Supabase database. They should be placed in your `.env.local` file.

1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your project.
3. In the left-hand navigation menu, click on the **Settings gear icon** at the very bottom.
4. Click on **API** (under the "Configuration" heading).
5. On this page, locate:
   *   **Project URL:** Copy this and paste it as `VITE_SUPABASE_URL` in your `.env.local`.
   *   **Project API keys:** Look for the key with the **`anon`** and **`public`** tags. Copy this and paste it as `VITE_SUPABASE_ANON_KEY` in your `.env.local`.

---

## Part 2: Setting up Google Authentication

To allow users (like the Admin) to log in with Google, you must link Supabase with a Google Cloud project.

### Step 2.1: Get your Supabase Callback URL
1. In your Supabase Dashboard, go to **Authentication** (the lock icon in the left menu).
2. Under the "CONFIGURATION" section on the left, click **Sign In / Providers**.
3. Click on **Google** in the list of providers to expand its settings.
4. Toggle **Enable Google Auth** to the ON position.
5. Under the "Callback URL (for OAuth)" section, **copy the URL** (it usually looks like `https://<project-ref>.supabase.co/auth/v1/callback`). 
6. Keep this Supabase tab open.

### Step 2.2: Create Google Cloud Credentials
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one from the top dropdown menu.
3. Search for **"OAuth consent screen"** in the top search bar and click it.
   *   Choose **External** and click **Create**.
   *   Fill in the mandatory fields: App name, User support email, and Developer contact information. Click **Save and Continue** through the remaining steps.
4. Go to **Credentials** in the left sidebar.
5. Click **+ CREATE CREDENTIALS** at the top and select **OAuth client ID**.
6. Set the **Application type** to **Web application**.
7. Scroll down to the **Authorized redirect URIs** section (do NOT use "Authorized JavaScript origins").
8. Click **+ ADD URI**.
9. **Paste the Callback URL** you copied from Supabase in Step 2.1.
10. Click **Create**.
11. A modal will appear displaying your **Client ID** and **Client Secret**. Keep this open.

### Step 2.3: Connect Google to Supabase
1. Go back to your open **Supabase Dashboard** tab (Authentication -> Sign In / Providers -> Google).
2. Paste the **Client ID** from Google into the Supabase "Client ID" field.
3. Paste the **Client Secret** from Google into the Supabase "Client Secret" field.
4. Click the **Save** button at the bottom of the section.

Your Google Authentication is now fully configured! You can now use `signInWithOAuth({ provider: 'google' })` in your application.
