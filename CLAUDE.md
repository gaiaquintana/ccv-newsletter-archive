# Cultura con vos — Newsletter Archive

Static site: `index.html` + `style.css` + `script.js` render entries from `newsletters.json`. No build step, no backend.

## Edition numbering

Cards display an "N.º" badge computed in `script.js`, not stored in `newsletters.json`. Numbering is chronological by `date`: the oldest entry is edition #1, and each newer entry gets the next number up. The site still displays newest-first (top to bottom), so the highest number appears at the top and #1 at the bottom.

## Adding newsletter entries

When extracting or creating a newsletter entry from a newsletter URL (populating the `image` field in `newsletters.json`):

- Ignore the first image found in the newsletter.
- Use the first subsequent image that does NOT have a red play-button circle overlay (i.e. is not a video thumbnail) as the cover image.
- If every image after the first has a red play-button circle (no plain photo available), ask the user how to proceed instead of guessing — do not silently fall back to a video thumbnail or a tiny footer/social icon.

When extracting the newsletter title from a newsletter URL (populating the `title` field in `newsletters.json`):

- Do NOT include "Cultura con vos", "CCV", or any edition number/prefix (e.g. "CCV #1 -") in the title — the edition number is already shown separately on the card as the blue "N.º" badge (see Edition numbering above).
- Store just the descriptive part of the title, unchanged otherwise.

Example: `"Cultura con vos #1: Buenos Aires en invierno"` becomes `"Buenos Aires en invierno"`.

## Writing descriptions

The `description` field must be written in first person, in Gaia's own voice — not a third-person summary. Match her style as seen in the actual newsletter text: casual, voseo (vos/podés/querés), warm, with personal anecdotes and occasional rhetorical questions to the reader. Base the description on the newsletter's real body text, not just a dry list of facts.
