# Kosha private alpha — Netlify and phone setup

## Important: not cleared for public release

The existing India map's licence and official boundary depiction are **unresolved release blockers**. Netlify Drop publishes an internet-accessible URL; an unshared URL is **not** access control. Do not share the link publicly, and do not deploy the map to a publicly reachable service if your private-use requirements prohibit that exposure. No site has been deployed by the assistant and there is no hosted URL yet.

## Deploy the prepared build (when your private-use conditions permit)

1. Download `kosha-alpha-site.zip` and extract it on a computer. Inside is a folder named `dist`; check that `dist/index.html` exists directly inside it.
2. Visit https://app.netlify.com/drop. If prompted, create or sign in to a free Netlify account.
3. Drag the **dist folder**, not the source folder or the ZIP, into the drop area. Netlify uploads the built files and displays an HTTPS site URL. Follow any account prompts needed to keep and manage the site.
4. Open that HTTPS URL on your phone. Do **not** post or share it publicly. Again, knowing the URL is sufficient to open an unprotected site; the URL alone is not private hosting.
5. On Android Chrome, open the browser menu and choose **Install app** or **Add to Home screen** if offered. On iPhone Safari, use Share → **Add to Home Screen**. Wording and availability vary by device and browser.
6. While online, open each chapter/tool you expect to need. After it has loaded, the app attempts to cache its assets for later offline use. Previously unvisited lazy-loaded pages may be unavailable offline; external source links need a connection. Test your own phone with airplane mode before relying on it.

The project was tested with a Chromium mobile-size browser simulation, including offline reopening of a visited chapter. Installation and offline behaviour on a physical phone and actual Netlify hosting were **not** tested.

## Build from source instead

1. Install a compatible Node.js and npm (the build was tested with the workspace's Node 20 environment).
2. Extract `kosha-alpha-source.zip`, open a terminal inside its `vedha` folder, and run:

   ```sh
   npm ci
   npm run build
   ```

3. Deploy the resulting `dist` folder as described above. Rebuild and redeploy the folder when the source changes. The lockfile is included; dependencies originally set to `latest` have been pinned to their installed versions.
4. The hosted app stores progress locally in each browser/device. To keep a copy, use Profile & Settings → Export progress. Installing on another phone does not automatically sync progress.

Netlify's current instructions: https://docs.netlify.com/deploy/create-deploys/ (see Drag and drop).
