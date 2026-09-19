import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * The photographic backdrop, drawn rather than photographed.
 *
 * Real plantation photography is the intent. Drop a file at
 * /public/images/plantation.jpg and uncomment the `.photo-slot` rule in
 * globals.css and it layers over this. Until then this scene renders: terraced
 * ridges with contour rows, mist between them, and a low sun. It is vector, so
 * it is sharp at any width and costs nothing to load.
 */
export function PlantationScene({
  className,
  variant = 'dusk',
}: {
  className?: string;
  variant?: 'dusk' | 'morning' | 'aerial';
}) {
  const id = React.useId().replace(/:/g, '');

  const palette =
    variant === 'morning'
      ? { sky: ['#276143', '#3a7d55', '#5f9c6c'], ridge: ['#11351f', '#164326', '#1d5532', '#276b3e'] }
      : variant === 'aerial'
        ? { sky: ['#14402a', '#1d5738', '#2e7549'], ridge: ['#0c2718', '#123520', '#194628', '#215733'] }
        : { sky: ['#123a22', '#1a4f30', '#2f7248'], ridge: ['#0a2416', '#0f331e', '#164327', '#1d5330'] };

  return (
    <svg
      className={cn('h-full w-full', className)}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.sky[0]} />
          <stop offset="55%" stopColor={palette.sky[1]} />
          <stop offset="100%" stopColor={palette.sky[2]} />
        </linearGradient>

        <radialGradient id={`${id}-sun`} cx="0.76" cy="0.24" r="0.42">
          <stop offset="0%" stopColor="#f0dcae" stopOpacity="0.42" />
          <stop offset="45%" stopColor="#c69b3f" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#c69b3f" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`${id}-mist`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dcefd0" stopOpacity="0" />
          <stop offset="50%" stopColor="#dcefd0" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#dcefd0" stopOpacity="0" />
        </linearGradient>

        {/* Tea rows: fine contour hatching that follows each ridge. */}
        <pattern id={`${id}-rows`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
          <rect width="14" height="14" fill="none" />
          <path d="M0 7h14" stroke="#dcefd0" strokeOpacity="0.2" strokeWidth="1.4" />
        </pattern>

        <pattern id={`${id}-rows-fine`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-4)">
          <path d="M0 4.5h9" stroke="#dcefd0" strokeOpacity="0.15" strokeWidth="1" />
        </pattern>

        <clipPath id={`${id}-clip-a`}>
          <path d="M0 470 C 210 402, 402 452, 616 436 C 858 418, 1046 356, 1440 404 L1440 900 L0 900 Z" />
        </clipPath>
        <clipPath id={`${id}-clip-b`}>
          <path d="M0 604 C 262 530, 486 600, 742 566 C 1004 532, 1208 470, 1440 528 L1440 900 L0 900 Z" />
        </clipPath>
        <clipPath id={`${id}-clip-c`}>
          <path d="M0 760 C 300 672, 560 748, 842 706 C 1098 668, 1268 618, 1440 664 L1440 900 L0 900 Z" />
        </clipPath>
      </defs>

      {/* Sky and sun */}
      <rect width="1440" height="900" fill={`url(#${id}-sky)`} />
      <rect width="1440" height="900" fill={`url(#${id}-sun)`} />

      {/* Distant ridges */}
      <path
        d="M0 352 C 168 302, 306 338, 452 322 C 640 300, 790 246, 972 274 C 1136 298, 1290 276, 1440 300 L1440 470 L0 470 Z"
        fill={palette.ridge[3]}
        opacity="0.55"
      />
      <path
        d="M0 404 C 196 366, 352 398, 528 380 C 736 358, 900 314, 1104 340 C 1252 358, 1348 344, 1440 356 L1440 520 L0 520 Z"
        fill={palette.ridge[2]}
        opacity="0.7"
      />

      {/* Mist between ridges */}
      <rect y="400" width="1440" height="130" fill={`url(#${id}-mist)`} />

      {/* Terrace A */}
      <g clipPath={`url(#${id}-clip-a)`}>
        <rect y="380" width="1440" height="520" fill={palette.ridge[2]} />
        <rect y="380" width="1440" height="520" fill={`url(#${id}-rows-fine)`} />
      </g>

      <rect y="540" width="1440" height="110" fill={`url(#${id}-mist)`} opacity="0.8" />

      {/* Terrace B */}
      <g clipPath={`url(#${id}-clip-b)`}>
        <rect y="500" width="1440" height="400" fill={palette.ridge[1]} />
        <rect y="500" width="1440" height="400" fill={`url(#${id}-rows)`} />
      </g>

      {/* Terrace C: nearest, densest rows */}
      <g clipPath={`url(#${id}-clip-c)`}>
        <rect y="620" width="1440" height="280" fill={palette.ridge[0]} />
        <rect y="620" width="1440" height="280" fill={`url(#${id}-rows)`} opacity="0.85" />
        {/* A footpath cutting between the blocks */}
        <path
          d="M318 900 C 366 812, 452 760, 560 720"
          stroke="#dcefd0"
          strokeOpacity="0.1"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Bottom settle */}
      <rect y="820" width="1440" height="80" fill={palette.ridge[0]} opacity="0.5" />
    </svg>
  );
}

/**
 * Photographic backdrop wrapper: the scene, an optional real photo layered on
 * top via `.photo-slot`, a colour wash and a grain pass.
 */
export function PhotoBackdrop({
  variant = 'dusk',
  overlay = 'from-forest-950/45 via-forest-950/32 to-forest-950/72',
  scrim = 'from-forest-950/88 via-forest-950/42 to-transparent',
  className,
  photoPosition = '50% 50%',
  photoBlur = 0,
  photoOpacity = 1,
}: {
  variant?: 'dusk' | 'morning' | 'aerial';
  /** Vertical wash: sets the overall darkness of the scene. */
  overlay?: string;
  /** Horizontal wash: keeps the text side readable without flattening the rest. */
  scrim?: string;
  className?: string;
  /**
   * Which part of the photograph survives the crop. A tall hero shows only a
   * narrow slice of a wide plantation shot, so each section frames its own:
   * behind copy you want leaf texture, in a banner you want the person.
   */
  photoPosition?: string;
  /**
   * Softens the photograph where it is only atmosphere. It also hides the
   * upscaling in a backdrop that is wider on screen than the source file.
   */
  photoBlur?: number;
  photoOpacity?: number;
}) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <PlantationScene variant={variant} className="absolute inset-0 scale-105" />
      <div
        className="photo-slot absolute inset-0"
        style={{
          backgroundPosition: photoPosition,
          opacity: photoOpacity,
          // Scaled up so a blurred layer does not show soft edges at the crop.
          ...(photoBlur ? { filter: `blur(${photoBlur}px)`, transform: 'scale(1.05)' } : {}),
        }}
      />
      <div className={cn('absolute inset-0 bg-gradient-to-b', overlay)} />
      <div className={cn('absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l', scrim)} />
      <div className="grain" />
    </div>
  );
}
