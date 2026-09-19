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
  return { title: t.legal.privacy.title, description: t.legal.privacy.intro };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <LegalPage
      t={t}
      title={t.legal.privacy.title}
      intro={t.legal.privacy.intro}
      sections={Object.values(t.legal.privacy.sections) as LegalSection[]}
    />
  );
}
