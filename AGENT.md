# CCV Newsletter Archive — Agent Instructions

You are an agent that maintains the newsletter archive in this repository. Your job is to take a newsletter URL from the user and add a corresponding entry to `newsletters.json`.

This is a static site (`index.html` + `style.css` + `script.js` reading from `newsletters.json`). There is no build step and no backend — editing `newsletters.json` is the entire job.

## Trigger

Run this workflow whenever the user provides a newsletter URL and asks you to add it to the archive.

## Workflow

1. **Fetch the newsletter content** at the given URL.
2. **Extract the following fields:**
   - `title` — the newsletter's headline/subject.
   - `date` — the publication date, formatted as `YYYY-MM-DD`.
   - `description` — a short (1–3 sentence) summary of the newsletter's content, written in the same language as the newsletter itself.
   - `image` — the cover image (see image rule below).
   - `link` — the newsletter URL exactly as provided by the user.
3. **Apply the title rule** (see below).
4. **Apply the image rule** (see below).
5. **Insert the new entry** at the very top of the JSON array in `newsletters.json` (index 0), so entries stay ordered newest → oldest.
6. **Validate** that `newsletters.json` is still valid JSON after the edit (proper commas, no trailing comma on the last array item, etc.).
7. Report back to the user which entry was added and ask them to confirm before committing, unless they've said to commit automatically.

## Rules

### Title
- If the extracted title contains "Cultura con vos" in any capitalization (e.g. "cultura con vos", "CULTURA CON VOS"), replace that phrase with "CCV".
- Leave the rest of the title unchanged.
- Example: `"Cultura con vos #1: Buenos Aires en invierno"` → `"CCV #1: Buenos Aires en invierno"`.

### Cover image
- **Do not scan the newsletter or pick a candidate image yourself.** Ask the user which image they want as the cover ("¿qué imagen querés de portada?") and wait for their answer — they may describe it (e.g. "la de los barquitos en Tigre", "la del paisaje de montañas") or point you to it directly.
- Once the user tells you which image, find it in the newsletter content and download it.
- Save it locally in the repo under `images/` (e.g. named by the entry's `date`, like `images/2026-08-24.png`), and set the `image` field to that local path — do NOT store the remote `img-cache.net`/Brevo URL, since it is ephemeral and can 404 once the sender's account cache is purged.
- If the user's description matches more than one image, or you can't find a match, show them the candidates and ask which one, rather than guessing.

### Entry format
Every entry in `newsletters.json` must be an object with exactly these fields, in this order:

```json
{
  "title": "",
  "date": "",
  "description": "",
  "image": "",
  "link": ""
}
```

### Ordering
- New entries always go at the **beginning** of the array (index 0).
- Never reorder or remove existing entries.
- The array must remain sorted newest-first by `date`.

### Scope
- Only edit `newsletters.json`.
- Do not modify `index.html`, `style.css`, or `script.js` unless the user explicitly asks you to.
- Do not rewrite or "clean up" existing entries unless explicitly asked — only add the new one.

## Edge cases

- If the date cannot be determined from the content, ask the user rather than guessing.
- If the page has no extractable images at all, leave `image` as an empty string and flag this to the user instead of inventing a URL.
- If a link to the same newsletter already exists in `newsletters.json`, warn the user instead of adding a duplicate.
