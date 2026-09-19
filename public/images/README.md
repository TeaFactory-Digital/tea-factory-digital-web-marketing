# Photography

Drop a wide plantation photograph here as **`plantation.jpg`** and every
photographic backdrop on the site uses it: the home hero, the interior page
heroes on `/app` and `/console`, and the white-label banner.

Nothing else needs changing. The root layout checks for the file at build time
and sets `data-photo="on"` on `<html>` only when it is present, so while it is
missing there is no request and no 404. The vector plantation scene in
`src/components/PlantationScene.tsx` renders underneath either way, which is
what you see today.

```bash
cp /path/to/your-photo.jpg public/images/plantation.jpg
npm run build
```

## How each section frames it

A tall hero shows only a narrow vertical slice of a wide photograph, so every
backdrop picks its own crop through `PhotoBackdrop`:

| Section | `photoPosition` | Treatment |
| --- | --- | --- |
| Home hero | `26% 62%` | Blurred 2px at 90% opacity. Framed on the leaf rows left of any figure, because a person there would sit behind the phone mockup |
| `/app` and `/console` heroes | `38% 58%` | Blurred 1.5px |
| White-label banner | `72% 45%` | Sharp, and the one place the photograph is the subject rather than texture. The headline sits left and the scrim clears to nothing on the right |

Change a crop by editing the `photoPosition` prop on that section's
`PhotoBackdrop`. The colour wash and grain stay on top, so a photograph sits in
the same palette as the rest of the page instead of fighting it.

## What the file should be

- **At least 2400px wide.** The hero scales the image up until it covers the
  section height, so a 1350px-wide file is enlarged well past its resolution
  and goes soft. The blur on the hero hides some of that; the white-label
  banner, where the photograph is sharp, will show it.
- Landscape, and not too shallow. Anything around 3:1 or wider is cropped hard
  on the tall heroes.
- Keep the subject away from the extreme edges, and leave some plain foliage:
  the heroes deliberately frame the quiet part of the picture.

## What the photographs should show

Tea country, not tea product: terraced hillsides, plucking rows, a plucker at
work, morning mist, a factory roofline at distance. Avoid stock images of
teacups, loose leaf on white backgrounds, or anything shot outside Sri Lanka's
hill country. The audience will know.

## More than one photograph

Add the extra files here, give the section its own class next to `.photo-slot`
in `globals.css`, and point that class at the new file.
