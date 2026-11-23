'use client';

import * as React from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { Monitor, Pause, Play, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

/** How long each step stays before the next one. Long enough to read the step's line twice. */
const STEP_MS = 6500;

export type WalkthroughStep = {
  key: string;
  title: string;
  desc: string;
  side: 'app' | 'console';
  sideLabel: string;
  /** A phone shot is fitted to the stage's height; a console shot to its width. */
  device: 'phone' | 'console';
  /** Taller than the stage (the dashboard): pinned to the top and faded at the bottom. */
  tall?: boolean;
  visual: React.ReactNode;
};

/**
 * The walkthrough's moving part (24 November 2026), in place of a video.
 *
 * The real mockups, one at a time, moving on by themselves. A bar under the active step
 * fills, and its animation ending is what moves the step on, so the bar and the change can
 * never drift apart. It runs only while on screen and stops while the pointer or keyboard
 * focus is on it; choosing a step stops it there. With reduced motion it never starts.
 * Auto-moving content needs a way to stop it (WCAG 2.2.2), hence the pause button.
 *
 * Every visual is rendered once by the server and only shown or hidden here, so switching
 * costs nothing and the inactive ones are `inert`, out of the tab order and the reading.
 */
export function WalkthroughPlayer({
  steps,
  labels,
}: {
  steps: WalkthroughStep[];
  labels: { pause: string; play: string; progress: string };
}) {
  const reduce = useReducedMotion();
  const root = React.useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.35 });
  const [active, setActive] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [held, setHeld] = React.useState(false);
  const tabs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const id = React.useId();

  const autoplay = playing && !reduce;
  const running = autoplay && inView && !held;

  const choose = (index: number, focus = false) => {
    setActive(index);
    setPlaying(false);
    if (focus) tabs.current[index]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = steps.length - 1;
    const next =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? index === last ? 0 : index + 1
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? index === 0 ? last : index - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    choose(next, true);
  };

  return (
    <div
      ref={root}
      className="mt-14 grid gap-8 md:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-14"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(false);
      }}
    >
      {/* ---- The steps ---- */}
      <div>
        <div role="tablist" aria-orientation="vertical" className="flex flex-col gap-2">
          {steps.map((step, i) => {
            const selected = i === active;
            return (
              <button
                key={step.key}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`${id}-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${id}-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => choose(i)}
                onKeyDown={(event) => onKeyDown(event, i)}
                className={cn(
                  'group relative overflow-hidden rounded-3xl border px-5 py-4 text-start transition-colors duration-300',
                  selected
                    ? 'border-cream-300 bg-white shadow-lift'
                    : 'border-transparent hover:bg-white/60',
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      'grid size-8 shrink-0 place-items-center rounded-xl font-display text-[0.8rem] font-semibold tabular-nums transition-colors',
                      selected
                        ? step.side === 'app'
                          ? 'bg-leaf-600 text-white'
                          : 'bg-forest-800 text-cream-50'
                        : 'bg-cream-200 text-char-600',
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        'block font-display text-[1.02rem] font-semibold leading-snug',
                        selected ? 'text-forest-900' : 'text-char-600',
                      )}
                    >
                      {step.title}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'hidden shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold sm:inline-flex',
                      step.side === 'app' ? 'bg-leaf-100 text-leaf-700' : 'bg-forest-800/[0.07] text-forest-700',
                    )}
                  >
                    {step.side === 'app' ? (
                      <Smartphone className="size-3" strokeWidth={2.4} />
                    ) : (
                      <Monitor className="size-3" strokeWidth={2.4} />
                    )}
                    {step.sideLabel}
                  </span>
                </span>
                {selected ? (
                  <span className="mt-2 block ps-11 text-[0.93rem] leading-relaxed text-char-500">{step.desc}</span>
                ) : null}
                {/* The timer. Its end moves the step on. */}
                {selected && autoplay ? (
                  <span className="absolute inset-x-5 bottom-0 h-[3px] overflow-hidden rounded-full bg-cream-200" aria-hidden="true">
                    <span
                      key={active}
                      className="block h-full origin-left rounded-full bg-leaf-600 rtl:origin-right"
                      style={{
                        animation: `step-fill ${STEP_MS}ms linear forwards`,
                        animationPlayState: running ? 'running' : 'paused',
                      }}
                      onAnimationEnd={() => setActive((current) => (current + 1) % steps.length)}
                    />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 px-2">
          <p className="t-meta text-char-500" aria-live="polite">
            {labels.progress.replace('{n}', String(active + 1)).replace('{total}', String(steps.length))}
          </p>
          {reduce ? null : (
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? labels.pause : labels.play}
              className="grid size-10 place-items-center rounded-full border border-cream-300 bg-white text-forest-800 transition-colors hover:border-char-300"
            >
              {playing ? <Pause className="size-4" strokeWidth={2.2} /> : <Play className="size-4" strokeWidth={2.2} />}
            </button>
          )}
        </div>
      </div>

      {/* ---- The stage ----
          Above the steps on a phone, so the screen that changes is the one in view. */}
      <div className="relative order-first aspect-square overflow-hidden lg:order-none rounded-4xl border border-cream-300/70 bg-gradient-to-b from-cream-100 to-cream-200/70 shadow-lift sm:aspect-[4/3]">
        {steps.map((step, i) => {
          const selected = i === active;
          return (
            <div
              key={step.key}
              id={`${id}-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`${id}-tab-${i}`}
              aria-hidden={!selected}
              inert={!selected}
              className={cn(
                'absolute inset-0 flex justify-center p-4 transition-[opacity,transform] duration-500 ease-out sm:p-7',
                step.tall ? 'items-start' : 'items-center',
                selected ? 'opacity-100' : 'pointer-events-none scale-[0.985] opacity-0',
              )}
              style={
                step.tall
                  ? { maskImage: 'linear-gradient(to bottom, black 78%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent)' }
                  : undefined
              }
            >
              {step.device === 'phone' ? (
                <div className="aspect-[390/842] h-full">{step.visual}</div>
              ) : (
                <div className="w-full">{step.visual}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
