# Migration & Admin Dashboard Log

This document serves as a record of all the major changes and setups completed during the migration from Firebase to Supabase, and the creation of the Admin Dashboard.

## 1. Project Restructuring & Routing
*   Installed `react-router-dom` to handle multiple pages within the app.
*   Updated `App.tsx` to separate the main public wedding invitation (`/`) from the private admin area (`/admin`).

## 2. Admin Dashboard Creation
*   Created `src/pages/AdminDashboard.tsx`.
*   Designed a secure, clean dashboard adhering to the "royal" color palette (maroon, gold, cream).
*   Implemented live-updating metric cards: Total RSVPs, Attending, Estimated Guests, and Not Attending.
*   Built a data table that cleanly displays all guest submissions.

## 3. Firebase to Supabase Migration
*   Uninstalled the `firebase` package and deleted all Firebase-specific configuration files (`firebase.ts`, `firestore.rules`).
*   Installed `@supabase/supabase-js`.
*   Created `src/lib/supabase.ts` to initialize the database connection using environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
*   Refactored `src/components/RSVP.tsx` to use Supabase's `.insert()` API instead of Firebase's `addDoc`.

## 4. Database Setup & Security (Row Level Security)
*   Created the `rsvps` table in the Supabase PostgreSQL database.
*   Enabled Row Level Security (RLS) to ensure data privacy.
*   **Public Rule**: Anyone can anonymously submit data to the `rsvps` table.
*   **Admin Rule**: Only specific, hardcoded authenticated emails can read the data.

*SQL Script used to add multiple admins:*
```sql
DROP POLICY IF EXISTS "Allow admin read" ON rsvps;

CREATE POLICY "Allow admin read" ON rsvps 
FOR SELECT 
TO authenticated 
USING (
  auth.jwt() ->> 'email' IN (
    'ssripada16@gmail.com', 
    'partner@example.com' -- Replace with partner's email
  )
);
```

## 5. Google Authentication (OAuth)
*   Configured Google Cloud Console to generate OAuth Credentials (Client ID & Client Secret).
*   Enabled the Google Auth Provider in Supabase.
*   Passed the `{ redirectTo: window.location.origin + '/admin' }` option to `signInWithOAuth` so the user is brought straight back to the dashboard after logging in.

## 6. The "Secret" Admin Entrance
*   Updated `src/components/Footer.tsx`.
*   Wrapped the small gold Heart icon (`<Heart />`) in the footer with a React Router `<Link to="/admin">`.
*   This acts as a subtle, hidden button to access the login page without needing a visible "Admin Login" button on the beautiful wedding invitation.
