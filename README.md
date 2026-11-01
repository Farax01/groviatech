This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin area

The admin area is part of this app at `/admin`. Its dashboard, lead inbox, pricing editor, team, projects and testimonials editors, sign-in and MFA setup are under `app/admin`. The admin stylesheet is integrated at `app/admin/admin.css`.

To configure it:

1. Copy the workspace-level `..\.env.example` to `.env.local` in this folder and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your Supabase project. Do not use a service-role key in the app.
2. In Supabase SQL Editor, run `supabase/schema.sql`, `supabase/seed.sql`, `supabase/content.sql`, `supabase/content-seed.sql` and `supabase/hardening.sql`, in that order.
3. Create an account in Supabase Auth. Add its user ID to `public.admin_users` from SQL Editor, for example:

   ```sql
   insert into public.admin_users (user_id, role)
   values ('<AUTH_USER_ID>'::uuid, 'owner');
   ```

4. Start this app with `npm run dev`, then open [http://localhost:3000/admin/login](http://localhost:3000/admin/login). After signing in, register and verify an authenticator app to access admin features.

The database policies require an allow-listed user and MFA verification for admin data. Manage allowlisted accounts through Supabase SQL Editor; the app does not provide public admin signup.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
