import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, isLocale } from '@/i18n';
import { LegalPage, type LegalSection } from '@/components/sections/LegalPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: t.legal.terms.title, description: t.legal.terms.intro };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <LegalPage
      t={t}
      title={t.legal.terms.title}
      intro={t.legal.terms.intro}
      sections={Object.values(t.legal.terms.sections) as LegalSection[]}
    />
  );
}
