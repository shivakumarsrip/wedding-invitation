# Complete Supabase & Admin Setup Guide

This document contains all the step-by-step instructions required to set up the database, authentication, and admin features from scratch. 

---

## 1. Setting Up the Supabase Database

To create the database table to hold your RSVPs:
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your project.
3. Click on the **SQL Editor** (`</>` icon) in the left sidebar.
4. Click **New Query**.
5. Paste the following SQL script and click **Run**:

```sql
CREATE TABLE rsvps (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  guests text NOT NULL,
  attendance text NOT NULL CHECK (attendance IN ('yes', 'no')),
  message text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security) so people can't read data without logging in
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anyone on the internet to submit an RSVP to the table
CREATE POLICY "Allow public insert" ON rsvps 
FOR INSERT 
TO public 
WITH CHECK (true);
```

---

## 2. Setting Up Google OAuth

To allow you to log in to the admin dashboard:

### Get your Supabase Callback URL
1. In your Supabase Dashboard, go to **Authentication** (lock icon) -> **Sign In / Providers** (under CONFIGURATION).
2. Click **Google** and toggle **Enable Google Auth** to ON.
3. Copy the **Callback URL (for OAuth)** (e.g., `https://<project-ref>.supabase.co/auth/v1/callback`).

### Create Google Cloud Credentials
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Search for **"OAuth consent screen"**. Select **External** and click **Create**. Fill in App Name, Support Email, and Developer Email, then save.
3. Go to **Credentials** in the left sidebar.
4. Click **+ CREATE CREDENTIALS** -> **OAuth client ID**.
5. Select **Web application**.
6. Under **Authorized redirect URIs**, click **+ ADD URI** and paste your Supabase Callback URL.
7. Click **Create** and copy the **Client ID** and **Client Secret**.

### Link to Supabase
1. Go back to Supabase (Authentication -> Sign In / Providers -> Google).
2. Paste the **Client ID** and **Client Secret**.
3. Click **Save**.

---

## 3. Authorizing Admin Accounts (Including Partners)

Now you must tell the database *who* is allowed to read the RSVP data. 
Go back to the **Supabase SQL Editor**, paste the following script, and hit **Run**. Replace the email addresses with your actual Google emails:

```sql
-- First, remove any existing read policy
DROP POLICY IF EXISTS "Allow admin read" ON rsvps;

-- Create the new rule allowing specific emails
CREATE POLICY "Allow admin read" ON rsvps 
FOR SELECT 
TO authenticated 
USING (
  auth.jwt() ->> 'email' IN (
    'ssripada16@gmail.com', 
    'partner@example.com' -- Replace with your partner's email!
  )
);
```

---

## 4. The Admin Login Page & Secret Button

### The Admin Page (`src/pages/AdminDashboard.tsx`)
The dashboard uses `react-router-dom` to sit on the `/admin` path. 
When the login button is clicked, it runs:
```javascript
supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/admin` // Ensures you don't get kicked back to the home page!
  }
});
```

### The Secret Login Button (`src/components/Footer.tsx`)
To access `/admin` without a big ugly "Login" button on your beautiful invitation, we turned the gold heart in the footer into a secret link.

In your code, it looks like this:
```jsx
import { Link } from 'react-router-dom';

// ... inside the Footer component ...
<div className="w-16 h-16 bg-cream/10 rounded-full flex items-center justify-center mx-auto mb-6">
  <Link to="/admin">
    <Heart className="w-8 h-8 text-royal-gold fill-royal-gold hover:scale-110 hover:drop-shadow-lg transition-all cursor-pointer" />
  </Link>
</div>
```
