import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Photography is optional. Checked once, on the server, at build time: when either file is
 * absent the `data-photo` flag is never set, the CSS rules that reference them never match,
 * and the browser makes no request for a file that is not there. Drop them in (and run
 * `npm run images` for the WebP copies the CSS serves) and every backdrop picks them up.
 */
export const hasPlantationPhoto = ['plantation.jpg', 'tea-estate.jpg'].every((file) =>
  existsSync(path.join(process.cwd(), 'public', 'images', file)),
);
