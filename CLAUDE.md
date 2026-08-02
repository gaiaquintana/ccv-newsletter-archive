# Cultura con vos — Newsletter Archive

Static site: `index.html` + `style.css` + `script.js` render entries from `newsletters.json`. No build step, no backend.

## Adding newsletter entries

When extracting or creating a newsletter entry from a newsletter URL (populating the `image` field in `newsletters.json`):

- Ignore the first image found in the newsletter.
- Always use the second image as the newsletter cover image.
- If there is no second image, use the first available image as a fallback.

When extracting the newsletter title from a newsletter URL (populating the `title` field in `newsletters.json`):

- If the title contains "Cultura con vos" in any capitalization format, replace it with "CCV".
- The final title stored in `newsletters.json` should always use "CCV" instead of "Cultura con vos".
- Keep the rest of the title unchanged.

Example: `"Cultura con vos #1: Buenos Aires en invierno"` becomes `"CCV #1: Buenos Aires en invierno"`.
