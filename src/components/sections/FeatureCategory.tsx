import * as React from 'react';
import {
  BellRing,
  Banknote,
  CalendarDays,
  CircleDashed,
  CreditCard,
  FileSignature,
  FileText,
  HandCoins,
  HelpCircle,
  History,
  Inbox,
  Landmark,
  Megaphone,
  MessageSquareText,
  Newspaper,
  Package,
  Paperclip,
  PieChart,
  PiggyBank,
  SlidersHorizontal,
  Sprout,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { Section, SectionHeading } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/card';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { sections } from '@/lib/routes';
import { cn } from '@/lib/utils';

type Item = { title: string; desc: string };
type Tone = 'leaf' | 'gold' | 'forest' | 'char';

const toneRing: Record<Tone, string> = {
  leaf: 'bg-leaf-100 text-leaf-700 group-hover:bg-leaf-600 group-hover:text-white',
  gold: 'bg-gold-200/55 text-gold-600 group-hover:bg-gold-500 group-hover:text-forest-950',
  forest: 'bg-forest-800/8 text-forest-700 group-hover:bg-forest-800 group-hover:text-cream-50',
  char: 'bg-cream-200 text-char-700 group-hover:bg-char-800 group-hover:text-cream-50',
};

/** One category block: a label, a sentence, and its six capabilities. */
export function FeatureCategory({
  index,
  title,
  description,
  items,
  icons,
  tone,
}: {
  index: string;
  title: string;
  description: string;
  items: Item[];
  icons: LucideIcon[];
  tone: Tone;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,2fr)] lg:gap-12">
      <Reveal className="lg:sticky lg:top-28 lg:self-start">
        <Eyebrow className="mb-3">{index}</Eyebrow>
        <h3 className="t-h3 font-semibold text-forest-900">{title}</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-char-500">{description}</p>
        <span className="mt-6 block h-px w-16 bg-leaf-500" />
      </Reveal>

      <Stagger className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3" step={0.055}>
        {items.map((item, i) => {
          const Icon = icons[i];
          return (
            <StaggerItem key={item.title}>
              <div className="group h-full rounded-3xl border border-cream-300/70 bg-white p-6 shadow-[0_1px_2px_rgb(4_21_14/0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-leaf-300 hover:shadow-lift">
                <span
                  className={cn(
                    'grid size-10 place-items-center rounded-2xl transition-colors duration-300',
                    toneRing[tone],
                  )}
                >
                  <Icon className="size-[18px]" strokeWidth={1.9} />
                </span>
                <h4 className="mt-5 font-display text-[1.02rem] font-semibold leading-snug text-forest-900">
                  {item.title}
                </h4>
                <p className="mt-2 text-[0.87rem] leading-relaxed text-char-500">{item.desc}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}

export function Features({ t }: { t: Dictionary }) {
  const f = t.features;

  const groups = [
    {
      index: '01',
      title: f.money.title,
      description: f.money.description,
      tone: 'leaf' as const,
      items: Object.values(f.money.items) as Item[],
      icons: [FileText, CalendarDays, TrendingUp, PieChart, PiggyBank, Landmark],
    },
    {
      index: '02',
      title: f.credit.title,
      description: f.credit.description,
      tone: 'gold' as const,
      items: Object.values(f.credit.items) as Item[],
      icons: [Banknote, HandCoins, Sprout, Package, SlidersHorizontal, History],
    },
    {
      index: '03',
      title: f.requests.title,
      description: f.requests.description,
      tone: 'forest' as const,
      items: Object.values(f.requests.items) as Item[],
      icons: [Landmark, CreditCard, MessageSquareText, Paperclip, CircleDashed, Inbox],
    },
    {
      index: '04',
      title: f.communication.title,
      description: f.communication.description,
      tone: 'char' as const,
      items: Object.values(f.communication.items) as Item[],
      icons: [Newspaper, Megaphone, BellRing, History, HelpCircle, FileSignature],
    },
  ];

  return (
    <Section id={sections.features} tone="white">
      <div className="shell">
        <Reveal>
          <SectionHeading eyebrow={f.eyebrow} title={f.heading} description={f.subtitle} />
        </Reveal>

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-24">
          {groups.map((group) => (
            <FeatureCategory key={group.index} {...group} />
          ))}
        </div>
      </div>
    </Section>
  );
}
