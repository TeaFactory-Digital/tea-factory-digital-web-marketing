import * as React from 'react';

/**
 * The hill-country scene behind the bill summary, from the app's
 * `TeaLandscape.tsx` and `TeaBreeze.tsx`: a sun glow, two ranges, two banks of
 * mist, a near slope cut with tea rows, and six sprigs of two leaves and a bud
 * swaying along the foot of the card.
 *
 * Everything is white at the app's own low opacities; the cuts (tea rows and
 * leaf veins) are the brand primary, so the scene follows a white-label
 * palette. Positions are fractions of the card, as in the app, and the motion is
 * CSS (`.breeze-*` in `globals.css`), which stops under reduced motion exactly
 * as the app draws the scene still.
 */
export function TeaBreeze() {
  return (
    <div
      className="breeze pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]"
      aria-hidden="true"
    >
      {/* Sun glow: 0.34H across, breathing between 1 and 1.08. */}
      <div
        className="breeze-sun absolute aspect-square"
        style={{
          height: '34%',
          right: '20%',
          bottom: '44.6%',
          background:
            'radial-gradient(circle closest-side, rgb(255 255 255 / 0.10) 42%, transparent 42%), radial-gradient(circle closest-side, rgb(255 255 255 / 0.12) 45%, rgb(255 255 255 / 0) 100%)',
        }}
      />

      <Range
        className="breeze-drift-far"
        viewBox="0 0 400 120"
        height="72%"
        opacity={0.09}
        d="M0 120 L0 78 L18 70 L34 74 L52 58 L66 64 L84 44 L98 52 L112 46 L130 28 L146 40 L160 36 L176 50 L196 30 L214 16 L232 32 L248 26 L266 42 L284 34 L300 46 L318 30 L336 40 L352 36 L370 52 L386 48 L400 56 L400 120 Z"
      />

      <Mist className="breeze-mist-far" height="16%" bottom="38.5%" />

      <Range
        className="breeze-drift-mid"
        viewBox="0 0 400 100"
        height="55%"
        opacity={0.12}
        d="M0 100 L0 64 L22 56 L44 62 L70 42 L92 54 L118 46 L140 58 L168 36 L190 48 L214 40 L240 56 L268 38 L292 50 L316 44 L344 58 L372 46 L400 54 L400 100 Z"
      />

      <Mist className="breeze-mist-near" height="12%" bottom="27%" />

      <Range
        className="breeze-drift-near"
        viewBox="0 0 400 70"
        height="36%"
        opacity={0.13}
        d="M0 70 L0 40 Q70 16 150 30 Q230 44 300 26 Q350 14 400 24 L400 70 Z"
        rows={[
          'M0 50 Q70 28 150 41 Q230 54 300 37 Q350 26 400 35',
          'M0 58 Q70 38 150 50 Q230 62 300 46 Q350 36 400 44',
          'M0 66 Q70 48 150 59 Q230 70 300 55 Q350 46 400 53',
        ]}
      />

      {SPRIGS.map((sprig, i) => (
        <Sprig key={i} {...sprig} />
      ))}
    </div>
  );
}

function Range({
  className,
  viewBox,
  height,
  opacity,
  d,
  rows,
}: {
  className: string;
  viewBox: string;
  height: string;
  opacity: number;
  d: string;
  rows?: string[];
}) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      className={`${className} absolute bottom-0`}
      style={{ left: '-12%', width: '124%', height }}
    >
      <path d={d} fill="#ffffff" fillOpacity={opacity} />
      {rows?.map((row) => (
        <path
          key={row}
          d={row}
          fill="none"
          stroke="var(--color-app-primary)"
          strokeOpacity={0.35}
          strokeWidth={2.2}
          strokeDasharray="5 3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

function Mist({ className, height, bottom }: { className: string; height: string; bottom: string }) {
  return (
    <div
      className={`${className} absolute left-0`}
      style={{
        width: '70%',
        height,
        bottom,
        background: 'radial-gradient(ellipse closest-side, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0))',
      }}
    />
  );
}

type SprigSpec = {
  size: number;
  left?: number;
  right?: number;
  bottom: number;
  lean: number;
  half: number;
  delay: number;
  opacity: number;
  mirrored: boolean;
};

/** The app's six sprigs, in its own numbers. */
const SPRIGS: SprigSpec[] = [
  { size: 104, left: -14, bottom: -30, lean: 8, half: 2100, delay: 200, opacity: 0.14, mirrored: false },
  { size: 128, left: 52, bottom: -46, lean: 6, half: 2800, delay: 700, opacity: 0.12, mirrored: true },
  { size: 82, left: 128, bottom: -24, lean: 9, half: 1900, delay: 1000, opacity: 0.1, mirrored: false },
  { size: 96, right: 140, bottom: -32, lean: 7, half: 2400, delay: 300, opacity: 0.12, mirrored: true },
  { size: 112, right: 70, bottom: -40, lean: 8, half: 2200, delay: 500, opacity: 0.11, mirrored: false },
  { size: 150, right: -6, bottom: -34, lean: 6, half: 2600, delay: 0, opacity: 0.16, mirrored: true },
];

const LEAF = 'M20 100 C6 82 1 50 20 2 C39 50 34 82 20 100 Z';
const VEINS = 'M20 97 L20 8 M20 76 L10 64 M20 76 L30 64 M20 56 L11 44 M20 56 L29 44 M20 36 L14 27 M20 36 L26 27';

/** Two leaves and a bud, swaying about the foot of its stem. */
function Sprig({ size, left, right, bottom, lean, half, delay, opacity, mirrored }: SprigSpec) {
  const w = size * 0.75;
  const motion = (amp: number, rest: number, period: number, extra: number) =>
    ({
      '--rest': `${rest}deg`,
      '--amp': `${amp}deg`,
      animationDuration: `${Math.round(period * 1.07)}ms`,
      animationDelay: `${-(delay + extra)}ms`,
    }) as React.CSSProperties;

  return (
    <div
      className="absolute"
      style={{ left, right, bottom, width: w, height: size, opacity, transform: mirrored ? 'scaleX(-1)' : undefined }}
    >
      <div className="breeze-sway absolute inset-0 origin-bottom" style={motion(lean, 0, half, 0)}>
        <svg viewBox="0 0 75 100" className="absolute inset-0 size-full">
          <path
            d="M37 100 C35 80 40 60 37 38 C35 28 37 18 38 10"
            fill="none"
            stroke="#ffffff"
            strokeWidth={2.4}
            strokeLinecap="round"
          />
        </svg>
        <Leaf
          height={size * 0.44}
          left={w / 2 - size * 0.17}
          bottom={size * 0.42}
          style={motion(10, -52, half * 0.55, 150)}
        />
        <Leaf
          height={size * 0.38}
          left={w / 2 - size * 0.06}
          bottom={size * 0.55}
          style={motion(9, 48, half * 0.6, 400)}
        />
        <Leaf
          bud
          height={size * 0.2}
          left={w / 2 - size * 0.03}
          bottom={size * 0.82}
          style={motion(6, 4, half * 0.45, 250)}
        />
      </div>
    </div>
  );
}

function Leaf({
  height,
  left,
  bottom,
  bud = false,
  style,
}: {
  height: number;
  left: number;
  bottom: number;
  bud?: boolean;
  style: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 40 100"
      preserveAspectRatio="none"
      className="breeze-leaf absolute origin-bottom"
      style={{ height, width: height * (bud ? 0.3 : 0.4), left, bottom, ...style }}
    >
      <path d={LEAF} fill="#ffffff" />
      {bud ? null : (
        <path
          d={VEINS}
          fill="none"
          stroke="var(--color-app-primary)"
          strokeOpacity={0.7}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
