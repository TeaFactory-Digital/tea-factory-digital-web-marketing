# Photography

The site ships with no photographs. Every "photographic" backdrop is the vector
plantation scene in `src/components/PlantationScene.tsx`: layered ridges with
contour rows, mist and a low sun. It is sharp at any width, costs nothing to
load, and is honest: it does not pretend to be a particular estate.

## Dropping in real photographs

1. Put a wide, high-resolution image here as `plantation.jpg` (2400px wide or
   more; the hero crops it hard, so avoid anything with a subject near the
   edges).
2. Uncomment the `background-image` line in the `.photo-slot` rule in
   `src/app/globals.css`.

Every backdrop on the site picks it up at once (the hero, the interior page
heroes and the white-label banner), because they all render through
`PhotoBackdrop`, which layers `.photo-slot` over the vector scene. The colour
wash and grain stay, so a photograph will sit in the same palette as the rest of
the page rather than fighting it.

For a per-section photograph instead, pass a different class to `PhotoBackdrop`
and give that class its own `background-image`.

## What the photographs should show

Tea country, not tea product: terraced hillsides, plucking rows, morning mist,
a factory roofline at distance. Avoid stock images of teacups, loose leaf on
white backgrounds, or anything shot outside Sri Lanka's hill country. The
audience will know.
