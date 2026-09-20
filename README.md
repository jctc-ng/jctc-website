# JCTC Website — Updated 2026 Campaign Build

This is a **drop-in update for the existing GitHub Pages repository**:

`https://shausawa.github.io/jctc-website/`

It preserves the original single-page JCTC site concept but implements the September 2026 JCTC Cybercrime Awareness Campaign developer recommendations.

## Main changes
- Homepage repositioned around **CYBERCRIME IS A CRIME**
- Know the Conduct cards
- Interactive “Is This Cybercrime?” scenarios
- Real-life cybercrime schemes
- Don't Fall Victim / Don't Perpetrate section
- Day 1 and Day 2 clearly separated
- **No registration for Day 1**
- **Registration only for Day 2**
- Day 2 links to the existing Google Form
- Client-side “I’m Joining / I Will Attend / I Support” frame generator
- Victim-response guidance
- Evidence-preservation checklist
- Know the Law placeholder with legal-review disclaimer
- Campaign resources and awareness-card downloads
- Official JCTC social handles, including YouTube
- Mobile-first layout, keyboard focus, skip link and reduced-motion support
- Dynamic pre-event / live-event / post-event state
- Open Graph, X card, robots.txt and sitemap
- Privacy-conscious analytics hooks (no external analytics is connected yet)
- Only the supplied official JCTC logo is used; no member-agency logo is invented or regenerated

## How to update the existing GitHub repository
1. Open the `jctc-website` repository.
2. Upload/replace the files in the repository root with the files in this package.
3. Keep the `assets` folder exactly as provided.
4. Commit the change, e.g. `Implement 2026 campaign website recommendations`.
5. GitHub Pages should redeploy automatically.

## Current GitHub Pages URL
https://shausawa.github.io/jctc-website/

## Day 2 registration form
https://docs.google.com/forms/d/e/1FAIpQLSehMK2BRo-c7ApW1UpkfYBuAHIg1azyu5XtTMMCSb_aaMPcrw/viewform

## Important
The current Google Form previously created contains Day 1 / Day 2 / Both choices. The website correctly exposes registration **only for Day 2**, but the form itself should also be simplified to Day 2 only before wide public launch.

If an official custom domain is later activated, update:
- canonical URL in `index.html`
- Open Graph URL and image
- `robots.txt`
- `sitemap.xml`

Do **not** add a GitHub `CNAME` file until DNS for the approved custom domain is ready.


## Frame generator reliability update — 20 September 2026
- Uploaded photos are read with FileReader as data URLs for broader browser compatibility.
- A visible thumbnail confirms that the selected file loaded successfully.
- Horizontal and vertical controls redraw the canvas immediately.
- Panning is constrained so the image continues covering the frame.
- Default zoom is 115% so both positioning controls have useful movement.
- Reset Photo Position restores a centred 115% view.
- Text sizes automatically shrink where necessary.
- “SAY NO TO CYBERCRIME” and “DON'T FALL VICTIM. DON'T PERPETRATE.” have dedicated safe areas above the red footer.
- CSS and JavaScript use a version query so GitHub Pages visitors do not continue using a cached older script.
