# Image slots

Drop real Heaven Furniture Mart photos into this folder using the **exact filenames**
below. They appear on the page with **zero code changes** and **zero layout shift** —
every slot already has its aspect ratio locked in CSS.

Until a file exists, the slot renders a warm placeholder with a brass hairline frame
and the filename printed inside it, so you can see at a glance what is still missing.

## Slots

| # | Filename | Target size | Ratio | Status | Subject |
|---|---|---|---|---|---|
| 1 | `hero.jpg` | 2200 × 1058 | ~2.08:1 | in place | Furniture-forward re-crop: sofas, marble coffee table, framed art. The ceiling/chandelier band was cropped out entirely (kept only the source's y=480–1696 range) so the hero shows furniture rather than roof line — the earlier 16:9 crop couldn't do this because a 16:9 window of this source is dominated by ceiling with almost no room to shift. Runs as the hero's background image behind the headline, not a separate figure below it. |
| 2 | `collection-living.jpg` | 1200 × 1200 | 1:1 | in place | Carved sofas, cream upholstery, marble floor |
| 3 | `collection-bedroom.jpg` | 1200 × 1200 | 1:1 | in place | Emerald velvet bed, gold-framed art |
| 4 | `collection-dining.jpg` | 1200 × 1200 | 1:1 | in place | Marble table, burgundy studded chairs |
| 5 | `collection-office.jpg` | 918 × 918 | 1:1 | in place, **weak** | Modern white desk. Cool grey daylight — clashes with the warm set beside it. Low resolution (1080px source, heavily compressed). Worth replacing. |
| 6 | ~~`bespoke-1.jpg`~~ | — | — | **replaced by video** | The bespoke slot is now a self-hosted 9:16 clip, not a photo. See the Video table below. |
| 7 | `proof-showroom.jpg` | 1600 × 1066 | 3:2 | in place | The showroom **building** — red signage, furniture visible through both window rows. Cropped from the original to drop the pavement rubble and the neighbouring alley. Slot ratio changed 8:5 → 3:2 to match the crop. |
| 8 | `logo-mark.png` | 528 × 196 | ~2.69:1 | in place | The real Heaven Furniture Mart logo. Originally the fix for a near-empty "Who We Are" section; that section no longer exists on its own (folded into Social Proof's masthead — see the notes there), so this now lives at the top of Social Proof instead. Trimmed from `source-images/heavenfurniturelogo.jpg` (a 1024×1024 tile with a lot of dead space around the mark) with a safety margin so no letter touches the crop edge. The dark teal card is the client's own brand colour, kept as supplied rather than re-toned to the page's `--charcoal`. |
| 9 | `logo-black.png` | 263 × 105 | ~2.51:1 | in place | Header wordmark, background removed. Extracted from `source-images/croplogo1.jpg` (a "We Are Hiring" poster) — that source has a flat cream backdrop, so this one keyed out cleanly with a plain colour-fuzz transparency. Replaces the type-set "Heaven / Furniture Mart" lockup that used to sit in the header. |
| 10 | `logo-white.png` | 190 × 70 | ~2.71:1 | in place | Footer wordmark, background removed. Extracted from `source-images/croplogowhite.jpg`, where the white lettering sits over a photograph rather than a flat colour — a simple colour key would have caught picture-frame and wall texture too. Built as a hand-made alpha mask instead: an HSB saturation+brightness threshold isolates the gold "A", a luminance threshold isolates the white letters, the two are combined and applied as the alpha channel over the original crop. Sits on the dark footer, where the header's black version would be invisible. |
| 11 | `why-staff.jpg` | 1200 × 996 | ~1.20:1 | in place | Team photo from the International Furniture Fair booth (matches the milestone in Social Proof). Sits blurred and veiled behind the left column of Why Choose, confined to ~46% of the section width and faded to solid ivory well before the list column begins — that column's body text always sits on plain ivory. Blurred deliberately: an earlier sharp pass put faces directly under the headline at full clarity, which read as an accident rather than a deliberate backdrop. Cropped from `source-images/staff.jpg`. |

The collection cards were switched from the originally planned 4:5 portrait to **1:1
square** to match the supplied photography — those compositions run edge to edge, so
a portrait crop clipped furniture on both sides.

Originals as supplied are preserved untouched in `source-images/` at the project root.
That folder is **not** part of the deployable site — don't upload it.

All slots use `object-fit: cover`, so anything at roughly the right ratio crops
gracefully — but matching the ratio avoids losing edges you care about.

## Where to get them

From the brief — real Heaven photos live on their own channels:

- Facebook — <https://facebook.com/HeavenFurnitureMart>
- Instagram — <https://instagram.com/heaven_furniture_ltd>
- YouTube — <https://youtube.com/@HeavenFurnitureMart> (pause and screengrab for stills)

The brief permits AI touch-up — background removal, upscaling, lighting, cropping —
as long as the result still looks clean and real, not distorted or obviously fake.
It also notes there is no rule against other images, but that **real Heaven photos
will always look more credible than generic stock**.

## Practical notes

- **Format:** keep the `.jpg` extension. If you only have `.png` or `.webp`, either
  convert, or update the `src` in `index.html` — there are 7 references.
- **Weight:** aim for under ~300 KB each. The page is otherwise ~50 KB, and "clean
  and fast" is one of the judged criteria. Quick pass over the whole folder:
  ```bash
  mogrify -strip -quality 82 -resize '2400x2400>' *.jpg
  ```
- **Consistency beats individual quality.** Pick photos with a similar white balance
  and light direction — a set that looks shot on one day reads as a brand, a mixed
  set reads as a marketplace. This matters most across the four `collection-*` cards,
  which sit side by side.
- **Alt text** is already written for each slot in `index.html`. If a photo shows
  something meaningfully different from what the alt text describes, update it.

## Video

| File | Size | Where | Notes |
|---|---|---|---|
| `../video/bespoke.mp4` | 720 × 1280, 13.9s, 1.8 MB | Bespoke section | Instagram reel — CNC router cutting timber. Self-hosted, muted loop, deferred until it scrolls into view. Poster is `bespoke-poster.jpg`, a frame pulled from the clip itself. |
| `bespoke-poster.jpg` | 720 × 1280 | Bespoke section | Poster frame extracted from the clip |
| `showroom-tour-poster.jpg` | 1280 × 720 | Virtual tour | 16:9 crop of the living-room interior, used as a click-to-play facade for YouTube video `qEwoJWbXSTs`. **Not** YouTube's own thumbnail — that is a title card with a script font, a second yellow and a stray graphic that fought the palette. |

The tour makes **no request to YouTube until the visitor clicks play**; the player is
injected on click via `youtube-nocookie.com`.
