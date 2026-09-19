import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, Mail, MapPin, Phone } from 'lucide-react';
import { getDictionary, isLocale } from '@/i18n';
import { DemoForm } from '@/components/sections/DemoForm';
import { Eyebrow } from '@/components/ui/card';
import { Reveal } from '@/components/ui/motion';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: t.demo.title, description: t.demo.subtitle };
}

export default async function DemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  const asideItems = Object.values(t.demo.aside.items);

  return (
    <div className="relative bg-cream-100 pb-24 pt-32 md:pb-32 md:pt-40">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-cream-200/70 to-transparent"
        aria-hidden="true"
      />

      <div className="shell relative">
        <Reveal className="max-w-2xl">
          <Eyebrow className="mb-4">{t.demo.eyebrow}</Eyebrow>
          <h1 className="t-h2 font-semibold text-forest-900">{t.demo.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-char-500">{t.demo.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-10">
          <Reveal>
            <DemoForm t={t} />
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="lg:sticky lg:top-28">
              <div className="rounded-4xl border border-cream-300/70 bg-white p-7 shadow-lift">
                <h2 className="font-display text-lg font-semibold text-forest-900">
                  {t.demo.aside.title}
                </h2>
                <ul className="mt-5 space-y-3.5">
                  {asideItems.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-leaf-100 text-leaf-700">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className="text-[0.92rem] leading-relaxed text-char-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-4xl bg-forest-900 p-7 text-cream-100">
                <p className="t-eyebrow text-leaf-300">{t.footer.contact.title}</p>
                <div className="mt-4 space-y-3">
                  <a
                    href={`mailto:${t.footer.contact.email}`}
                    className="flex items-center gap-2.5 text-[0.92rem] transition-colors hover:text-leaf-300"
                  >
                    <Mail className="size-4 shrink-0 text-leaf-400" strokeWidth={2} />
                    {t.footer.contact.email}
                  </a>
                  <a
                    href={`tel:${t.footer.contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2.5 text-[0.92rem] transition-colors hover:text-leaf-300"
                  >
                    <Phone className="size-4 shrink-0 text-leaf-400" strokeWidth={2} />
                    {t.footer.contact.phone}
                  </a>
                  <p className="flex items-center gap-2.5 text-[0.92rem] text-cream-100/70">
                    <MapPin className="size-4 shrink-0 text-leaf-400" strokeWidth={2} />
                    {t.footer.contact.country}
                  </p>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
