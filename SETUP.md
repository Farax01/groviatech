# Groviatech admin: setup

What you get: a locked-down `/admin` for allow-listed users who verify with an authenticator app, where you can edit
pricing, team profiles, projects and testimonials, upload project and team images, and read and manage leads. Visitors
can only submit leads. They can never read them.

Tested: type-checks and builds on Next.js 16; unauthenticated visits to `/admin/*` redirect to the login page; the
leads API rejects bad input. **Not tested against a live Supabase project**, so do the checks in step 9.

## 1. Create the Supabase project

1. Sign up at supabase.com and click **New project**.
2. Pick a region near your customers (for US customers, East US). Save the database password in your password manager.

## 2. Add the keys to your site

In the project, open **Project Settings → API** (or the **Connect** button). Copy the **Project URL** and the
**anon / publishable** key into `.env.local` in your site repo (see `.env.example`).
Never use the `service_role` / secret key in this app. It isn't needed.

## 3. Create the tables

Open **SQL Editor** and run these files in order:

1. `supabase/schema.sql`
2. `supabase/seed.sql` to load the example pricing tiers.
3. `supabase/content.sql` to add editable team members, projects, testimonials and the public image bucket.
4. `supabase/content-seed.sql` to load the existing site content. Seed testimonials are unpublished until permission is confirmed.
5. `supabase/pagespeed.sql` to add optional PageSpeed scores to projects.
6. `supabase/hardening.sql` to apply the database-side lead submission rate limit.
7. `supabase/leads-trash.sql` to enable soft-deleting and restoring leads.

If the main schema has already been applied to your existing Supabase project, run `supabase/leads-trash.sql` once in SQL Editor before using the Leads page.

Pricing, team, projects and testimonials can then be edited from the admin. The image bucket only accepts JPG, PNG and WebP files up to 5 MB.

## 4. Lock down sign-ups

In **Authentication**, find the sign-in settings (look under **Sign In / Providers**) and **turn off "Allow new users to sign up"**.
Confirm **Multi-Factor (TOTP)** is enabled in the same area. Menu names move around, so search the Authentication pages if you don't see them.

## 5. Create your owner login

1. **Authentication → Users → Add user → Create new user.** Use your email and a long unique password from your password manager. Tick **Auto Confirm User**.
2. In **SQL Editor**, allow-list yourself (put your email in):

```sql
insert into public.admin_users (user_id, role)
select id, 'owner' from auth.users where email = 'YOUR-EMAIL';
```

## 6. Add the files to your repo

This folder is a complete Next.js 16 project. In a terminal, change to the folder containing this `SETUP.md` and `package.json` (the project root), then:

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and replace the example values with your Supabase Project URL and anon / publishable key.
3. Run `npm run dev` and open `http://localhost:3000/admin/login`.

If you are adding these admin features to a different existing Next.js project instead, copy `app/`, `lib/` and `proxy.ts` into that project's root. If it uses a `src/` folder, put them in `src/` instead. Merge `app/api/leads` and `app/admin` with any existing `app/` folder. On **Next.js 15 or earlier**, rename `proxy.ts` to `middleware.ts` and the function `proxy` to `middleware`.

## 7. First login

Sign in. You'll be sent to a screen with a QR code. Scan it with an authenticator app, enter the 6-digit code, and you're in.
**Also save the text key shown under the QR code in your password manager.** Supabase doesn't give recovery codes,
so if you lose your phone, the fix is to delete the factor from the Supabase dashboard (Authentication → Users) and set it up again.

## 8. Connect the website

**Pricing page.** The site reads live tiers with `getPublishedTiers()` from `lib/pricing.ts`; use `/admin/pricing` to edit them.

**Team, projects and testimonials.** Manage these under `/admin/team`, `/admin/projects` and `/admin/testimonials`. Published
changes appear on the public pages; project screenshots and team photos are uploaded to the `site-images` bucket.

**PageSpeed tests.** Add a Google PageSpeed Insights API key as `PAGESPEED_API_KEY` in `.env.local` and in your deployment's
environment variables. In Google Cloud, enable the PageSpeed Insights API for the key's project. The project editor's
**Run PageSpeed now** button fills in the scores for the selected device; review them and press **Save** to store them. Without
the key, scores can still be entered manually.

**Pricing API helper.** For another page that needs live tiers, use `getPublishedTiers()` from `lib/pricing.ts`:

```tsx
// app/pricing/page.tsx
import { getPublishedTiers } from "@/lib/pricing";
export const revalidate = 60; // also refreshed instantly when you save in the admin
export default async function Pricing() {
  const web = await getPublishedTiers("web_dev"); // 'sme_security' | 'ai_startup'
  // render with your own card component; fall back to static copy if web.length === 0
}
```

**Contact and audit forms.** POST JSON to `/api/leads`:

```ts
await fetch("/api/leads", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    name,
    email,
    company,
    interest,
    message,
    source: "contact page",
    website: honeypotValue,
  }),
});
```

Add a hidden input named `website` to the form (CSS-hidden, `tabindex="-1"`). Real people leave it empty, and bots fill it in.
This replaces the mailto step in your pricing builder, so every request lands in `/admin/leads`.
New enquiries are also emailed to `LEAD_NOTIFICATION_EMAIL` with the visitor's address set as Reply-To. To enable email:

1. Create a Resend account and an API key in its dashboard.
2. Add `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, and `LEADS_FROM_EMAIL` to `.env.local` and your deployment environment. Keep `RESEND_API_KEY` private; do not use a `NEXT_PUBLIC_` prefix.
3. For testing, `onboarding@resend.dev` can send only to the email address associated with your Resend account. To notify a different inbox or send in production, verify a domain in Resend and set `LEADS_FROM_EMAIL` to an address on that domain.

The recipient can reply directly to each notification; the reply will go to the visitor who submitted the form. If email delivery is not configured or fails, the lead is still saved in `/admin/leads`, and the visitor is told the email notification did not go through.

## 9. Check it's locked down

- Open `/admin` in a private window. You should land on the login page.
- Check that visitors can't read leads (put your URL and anon key in):
  `curl "YOUR-URL/rest/v1/leads?select=*" -H "apikey: YOUR-ANON-KEY"`. It must return `[]`.
- Submit a test lead through your form, then confirm it appears under `/admin/leads`.
- Add a draft team member or project and confirm it is not shown publicly until published.

## 10. Deploy

Add the two env vars in **Vercel → Project → Settings → Environment Variables**, then redeploy.
In Vercel's firewall settings, add a rate limit on `/api/leads` so it can't be spammed.

## Things to know

- **Free-plan pausing:** as far as I know, free Supabase projects pause after about a week without activity. Since your pricing page reads from it,
  check the current policy, and keep static fallback copy on the pricing page so it never shows empty.
- **Adding people later:** insert a row into `admin_users` with role `sales` or `editor`. The database already supports the roles, but
  the admin screens treat every allow-listed user as a full admin. Role-based screens are a small follow-up when you hire.
- **Cyan color:** the admin uses `--cyan: #1fb5e0` in `app/admin/admin.css`. Swap in your site's exact value.
