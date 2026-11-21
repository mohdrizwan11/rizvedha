# Supabase setup — the slow, click-by-click version

This is the beginner-friendly walkthrough. The short version is in
[`README.md`](./README.md#supabase-setup--establish-these-things-all-optional).

**You do not need any of this to study.** Without it the whole app works and
saves progress on the device. Supabase adds exactly two things:

1. **Google sign-in**, so progress follows you to another phone or laptop.
2. **Anonymous usage counts**, so you can see how many people opened the site.

There are three jobs:

| # | Job | Time | Where |
| --- | --- | --- | --- |
| 1 | Create the tables | ~2 min | Supabase → SQL Editor |
| 2 | Turn on Google sign-in | ~10 min | Google Cloud + Supabase |
| 3 | Tell Supabase the site address | ~1 min | Supabase → Authentication → URL Configuration |

Your project is already created:

- Dashboard: <https://supabase.com/dashboard/project/zpebfonidmviatxaosic>
- Project URL: `https://zpebfonidmviatxaosic.supabase.co`
- The public key is already inside `.env.local` in this folder. Do not touch it.

---

## 1. Create the tables (do this first)

1. Open the dashboard link above and sign in.
2. In the **left sidebar**, click **SQL Editor** (the icon looks like a database
   with a pencil).
3. Click **+ New query** (top right of the editor).
4. In this project folder, open `supabase/schema.sql` in Notepad or VS Code.
   Select **everything** (`Ctrl+A`) and copy (`Ctrl+C`).
5. Paste it into the big empty editor box in Supabase.
6. Click **Run** (or press `Ctrl+Enter`).

**What you should see:** a green banner saying
`Success. No rows returned`. That is correct — the script creates things but
returns no data.

### What that one paste created

| Object | What it is |
| --- | --- |
| `progress` | one private row per signed-in learner |
| `site_daily` | one row per device per day (anonymous) |
| `site_hits` | page views (anonymous) |
| `rv_hit()` | called by the app to record a visit |
| `rv_stats()` | returns the totals shown on the Account page |

It is safe to run the same file again later; every statement is written to be
re-runnable.

**How you know it worked:** open the site, then go to the top-right circle →
**You** → **Account**. The **Site usage** card should now show numbers. If it
still shows "Not available yet", wait a minute and refresh — or check that the
SQL editor did not stop on an error line (scroll the results panel).

---

## 2. Turn on Google sign-in

Supabase cannot create Google credentials for you; Google requires the owner's
account. This part is done in **two** dashboards, in this order.

### 2a. In Google Cloud Console

1. Go to <https://console.cloud.google.com/>.
2. Top bar → project dropdown → **New project** → name it `Riz Vedha` → **Create**.
   Wait a few seconds, then make sure that project is selected.
3. Open the menu → **APIs & Services** → **OAuth consent screen**
   (newer accounts call this **Google Auth Platform → Branding**).
4. Choose **External** → **Create**.
5. Fill:
   - **App name**: `Riz Vedha`
   - **User support email**: `kotnurumohammadrizwan@gmail.com`
   - **Developer contact email**: `kotnurumohammadrizwan@gmail.com`
6. Save through the remaining screens. You can skip scopes and test users for
   now, then come back.
7. While the app is in **Testing** mode, open **Audience** (or **Test users**) →
   **Add users** → add `kotnurumohammadrizwan@gmail.com` and any other Gmail you
   want to sign in with. Without this you get `Access blocked`.
8. Left menu → **Credentials** → **+ Create credentials** → **OAuth client ID**.
9. Application type: **Web application**. Name: `Riz Vedha web`.
10. Under **Authorised redirect URIs** click **Add URI** and paste exactly:

    ```
    https://zpebfonidmviatxaosic.supabase.co/auth/v1/callback
    ```

    No trailing slash. No spaces.
11. Click **Create**. A box shows the **Client ID** and **Client secret**.
    Keep this tab open — you need both in the next step.

### 2b. In Supabase

1. Dashboard → left sidebar → **Authentication**.
2. Click **Providers** (or **Sign In / Providers**).
3. Find **Google** in the list and click it.
4. Toggle **Enable Sign In with Google** on.
5. Paste the **Client ID** and **Client Secret** from Google.
6. Click **Save**.

There is a **Callback URL** shown on this same screen. It must read exactly:

```
https://zpebfonidmviatxaosic.supabase.co/auth/v1/callback
```

If it differs, fix the URI in Google Cloud (step 2a.10) to match it.

**How you know it worked:** the top-right circle → **You** now shows
**Sign in with Google** as a real button. Clicking it opens Google's account
chooser, then returns you to the site signed in.

---

## 3. Tell Supabase where the site lives

Without this, Google sends you back to `localhost` even on the live site.

1. Dashboard → **Authentication** → **URL Configuration**
   (older dashboards: **Authentication → Settings**).
2. **Site URL**: put the address people will actually use.
   - While testing locally: `http://localhost:5199`
   - After deploying: `https://rizvedha.vercel.app`
     (or your custom domain, once you have one)
3. **Redirect URLs** → **Add URL**, and add each of these on its own line:

   ```
   http://localhost:5199/**
   https://rizvedha.vercel.app/**
   ```

   The `/**` matters — it allows any page after the slash.
4. Click **Save**.

If you later change the domain, come back and update **both** fields.

---

## 4. Check everything, end to end

1. Open the site (`http://localhost:5199` while developing).
2. Top-right circle → **You** → **Sign in with Google**.
3. Pick your Gmail. You should land back on the site, signed in, with your
   avatar or initial in the circle.
4. Open a chapter, mark a section read, then refresh — the progress stays.
5. Circle → **Account** → **Site usage** shows unique learners, today, page
   views and 28-day views.
6. Open the site in a second browser or on your phone, sign in with the same
   Google account, and confirm the same progress appears.

### If something fails

| What you see | Likely cause | Fix |
| --- | --- | --- |
| `Access blocked: This app's request is invalid` | redirect URI mismatch | Google Cloud → Credentials → your client → add the exact `.../auth/v1/callback` URI |
| `Access blocked` / "app not verified" | you are not a test user | Google Auth Platform → Audience → add your Gmail |
| Returns to `localhost` on the live site | Site URL still local | Supabase → URL Configuration → set the live domain |
| Sign-in works, progress does not sync | table not created | re-run `supabase/schema.sql` |
| Site usage says "Not available yet" | same | re-run the SQL, refresh after a minute |
| Console 404 on `rv_hit` / `rv_stats` | same | same |
| Site usage counts stay at 0 | you are the only visitor today | it counts one device per day; open it on another device |

---

## Optional: hand the setup to me

If you would rather not click through the dashboards, I can do jobs **1** and
**3** for you through Supabase's management API, and job **2b** once you have
the Google values. I need three things:

1. A Supabase **Personal Access Token** — <https://supabase.com/dashboard/account/tokens>
   → **Generate new token** → name it `rizvedha-setup` → copy the `sbp_...`
   value. This is a password-equivalent secret: send it privately, and
   **revoke it** the moment setup is done.
2. The Google **Client ID** (`...apps.googleusercontent.com`).
3. The Google **Client Secret** (`GOCSPX-...`).

I still cannot create the Google OAuth client for you — that needs your Google
login. Everything else can be done with those values.

**Never commit these values.** `.env.local` is already git-ignored; tokens and
client secrets belong only in the dashboards or in a private message.
