# Personal Site

Personal site built with [Astro](https://astro.build).

## Development

```sh
bun install
bun run dev
```

## Content

- Site config (name, links, URL): `src/consts.ts`
- Intro: `src/content/intro.mdx`
- Notes: `src/content/notes`

## Scripts

```sh
bun run note:create "Title" "Description"   # draft note
bun run portrait:create photo.jpg           # dithered portrait, macOS
bun run image:dither photo.jpg              # dithered image for a note
```

## Credits

Based on [Twoism](https://github.com/esafev/twoism) by esafev.
