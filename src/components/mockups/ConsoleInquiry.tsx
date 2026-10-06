import * as React from 'react';
import {
  ArrowUpRight,
  BellRing,
  Building2,
  CalendarClock,
  Hourglass,
  Lock,
  MessageSquare,
  Plus,
  Send,
  Smartphone,
  UserCheck,
  X,
} from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { cn } from '@/lib/utils';
import { INQUIRY_THREAD, formatAge } from '@/lib/sample-data';
import { ConsoleCard, ConsoleFrame, ConsoleShell } from './ConsoleChrome';

export const INQUIRY_SHOT = { width: 1280, height: 900 } as const;

/**
 * One inquiry in the office console (M10), reproduced from
 * `modules/inquiries/InquiryDetailScreen.tsx`: the conversation as a chat,
 * the supplier on the left and the office on the right in the brand colour,
 * the reply box under the last message with the office's common answers as
 * chips, and the side column with the supplier, who is handling it, and the
 * notes only the office reads.
 *
 * It is the same conversation the phone mockup shows from the supplier's side
 * (`InquiryThread.tsx`), read from the counter. Dates are the console's
 * `formatDate` / `formatDateTime` (en-GB, Colombo time) in every language,
 * because the console formats them that way whatever language it is in.
 */
export function ConsoleInquiry({ t, className }: { t: Dictionary; className?: string }) {
  const c = t.console.inquiry;
  const th = t.thread;
  const bodies: Record<(typeof INQUIRY_THREAD.messages)[number]['body'], string> = {
    question: th.messages.question,
    checking: c.suggestChecking,
    thanks: th.suggest.thanks,
    update: th.suggest.update,
  };

  return (
    <ConsoleFrame width={INQUIRY_SHOT.width} height={INQUIRY_SHOT.height} className={className}>
      <ConsoleShell t={t} active="inquiries">
        {/* PageHeader with a breadcrumb and the status badge as its action */}
        <header className="flex items-end justify-between gap-[12px]">
          <div className="min-w-0">
            <p className="mb-[2px] text-[12px] leading-[16px] text-app-text-secondary">{c.title}</p>
            <p className="text-[22px] font-semibold leading-[30px]">{th.subject}</p>
            <p className="mt-[2px] text-[14px] leading-[20px] text-app-text-secondary">
              {c.from.replace('{name}', t.bill.supplierName).replace('{code}', INQUIRY_THREAD.supplierCode)}
            </p>
          </div>
          <span className="rounded-full bg-app-warning-muted px-[8px] py-[2px] text-[12px] font-medium leading-[16px] text-app-warning">
            {c.statusOpen}
          </span>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-3 gap-[16px]">
          {/* ── Conversation ─────────────────────────────────────────────── */}
          <ConsoleCard
            title={c.conversation}
            className="col-span-2 min-h-0"
            bodyClassName="flex min-h-0 flex-1 flex-col gap-[16px]"
          >
            <dl className="grid grid-cols-3 gap-[12px]">
              <Fact icon={CalendarClock} label={c.receivedLabel} value={INQUIRY_THREAD.receivedAt} />
              <Fact icon={Smartphone} label={c.channelLabel} value={c.channelApp} />
              <Fact icon={Hourglass} label={c.waitingLabel} value={formatAge(INQUIRY_THREAD.ageHours)} />
            </dl>

            <ol className="flex min-h-0 flex-1 flex-col justify-end gap-[4px] overflow-hidden rounded-[16px] bg-app-surface-variant/50 p-[12px]">
              {INQUIRY_THREAD.messages.map((m, i) => {
                const office = m.author === 'office';
                const newDay = i === 0 || INQUIRY_THREAD.messages[i - 1].day !== m.day;
                const latestOffice = office && !INQUIRY_THREAD.messages.slice(i + 1).some((n) => n.author === 'office');
                return (
                  <React.Fragment key={i}>
                    {newDay ? (
                      <li className="my-[8px] self-center">
                        <span className="rounded-full bg-app-surface px-[12px] py-[2px] text-[12px] leading-[16px] text-app-text-secondary shadow-[0_1px_3px_rgb(0_0_0/0.1)]">
                          {INQUIRY_THREAD.consoleDays[m.day]}
                        </span>
                      </li>
                    ) : null}
                    <li className={cn('mt-[8px] flex items-end gap-[8px]', office && 'flex-row-reverse')}>
                      <span
                        className={cn(
                          'grid size-[33.75px] shrink-0 place-items-center rounded-full text-[12px] font-semibold',
                          office ? 'bg-app-primary text-white' : 'bg-app-primary-muted text-app-primary',
                        )}
                      >
                        {office ? <Building2 className="size-[16px]" strokeWidth={2} /> : 'KW'}
                      </span>
                      <div className={cn('flex max-w-[75%] flex-col gap-[2px]', office && 'items-end')}>
                        <span className="px-[4px] text-[12px] font-semibold leading-[16px] text-app-text-secondary">
                          {office ? INQUIRY_THREAD.officeName : t.bill.supplierName}
                        </span>
                        <div
                          className={cn(
                            'rounded-[11.25px] px-[12px] pb-[4px] pt-[8px] shadow-[0_1px_3px_rgb(0_0_0/0.1)]',
                            office
                              ? 'rounded-br-[6px] bg-app-primary text-white'
                              : 'rounded-bl-[6px] border border-app-border bg-app-surface',
                          )}
                        >
                          <p className="text-[16px] leading-[24px]">{bodies[m.body]}</p>
                          <p
                            className={cn(
                              'mt-[2px] text-right text-[12px] leading-[16px]',
                              office ? 'text-white/80' : 'text-app-text-secondary',
                            )}
                          >
                            {m.time}
                          </p>
                        </div>
                        {latestOffice ? (
                          <span className="mt-[2px] inline-flex items-center gap-[4px] rounded-full bg-app-success-muted py-[2px] pl-[8px] pr-[2px] text-[12px] font-medium leading-[16px] text-app-success">
                            <BellRing className="size-[12px]" strokeWidth={2} />
                            {c.pushSent}
                            <InfoDot />
                          </span>
                        ) : null}
                      </div>
                    </li>
                  </React.Fragment>
                );
              })}
              <li className="mt-[4px] flex items-center gap-[8px] self-start pl-[41px] text-[12px] leading-[16px] text-app-text-secondary">
                <span className="size-[7.5px] rounded-full bg-app-warning" />
                {c.awaitingReply}
              </li>
            </ol>

            {/* ReplyComposer: DecisionNoteField, then Close / count / Send */}
            <div className="flex flex-col gap-[8px] border-t border-app-divider pt-[16px]">
              <div className="flex flex-col gap-[4px]">
                <span className="flex items-center gap-[2px] text-[14px] font-medium leading-[20px]">
                  {c.replyLabel}
                  <span className="grid size-[18.75px] place-items-center text-app-text-secondary">
                    <InfoDot />
                  </span>
                </span>
                <div className="h-[100px] rounded-[10px] border border-app-border bg-app-surface px-[12px] py-[8px] text-[14px] leading-[1.5] text-app-text-secondary">
                  {c.replyPlaceholder}
                </div>
                <div className="mt-[8px] flex flex-wrap items-center gap-[4px]">
                  <span className="text-[12px] leading-[16px] text-app-text-secondary">{c.noteSuggestions}</span>
                  {[c.suggestReceived, c.suggestCheckingLabel, c.suggestVisit, c.suggestCall, c.suggestSorted].map(
                    (label) => (
                      <span
                        key={label}
                        className="inline-flex h-[33.75px] items-center gap-[4px] rounded-[10px] border border-app-border bg-app-surface px-[12px] text-[14px] font-medium leading-[20px]"
                      >
                        <Plus className="size-[12px]" strokeWidth={2.2} />
                        {label}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between gap-[8px]">
                <span className="inline-flex h-[41.25px] items-center gap-[8px] rounded-[10px] px-[16px] text-[16px] font-medium leading-[22px]">
                  <X className="size-[16px]" strokeWidth={2} />
                  {c.close}
                </span>
                <span className="flex items-center gap-[12px]">
                  <span className="text-[12px] leading-[16px] text-app-text-secondary">
                    {c.replyCount.replace('{count}', '0').replace('{min}', '20')}
                  </span>
                  <span className="inline-flex h-[41.25px] items-center gap-[8px] rounded-[10px] bg-[#C2CCC9] px-[16px] text-[16px] font-medium leading-[22px] text-[#7C8783]">
                    <Send className="size-[16px]" strokeWidth={2} />
                    {c.sendReply}
                  </span>
                </span>
              </div>
            </div>
          </ConsoleCard>

          {/* ── Side column ─────────────────────────────────────────────── */}
          <div className="flex min-h-0 flex-col gap-[16px] overflow-hidden">
            <ConsoleCard title={c.supplier} bodyClassName="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[12px]">
                <span className="grid size-[41.25px] shrink-0 place-items-center rounded-full bg-app-primary-muted text-[16px] font-semibold text-app-primary">
                  KW
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-[16px] font-medium leading-[24px]">{t.bill.supplierName}</span>
                  <span className="text-[12px] leading-[16px] text-app-text-secondary tabular-nums">
                    {INQUIRY_THREAD.supplierCode}
                  </span>
                </span>
              </div>
              <div className="flex flex-col gap-[4px] text-[14px] font-medium leading-[20px] text-app-primary">
                <span className="inline-flex items-center gap-[4px]">
                  {c.supplierLink}
                  <ArrowUpRight className="size-[16px]" strokeWidth={2} />
                </span>
                <span className="inline-flex items-center gap-[4px]">
                  <MessageSquare className="size-[16px]" strokeWidth={2} />
                  {c.history}
                </span>
              </div>
            </ConsoleCard>

            <ConsoleCard title={c.assignTitle} bodyClassName="flex flex-col gap-[12px]">
              <p className="flex items-center gap-[8px] text-[14px] leading-[20px]">
                <UserCheck className="size-[16px] text-app-text-secondary" strokeWidth={2} />
                {c.nobody}
              </p>
              <span className="inline-flex h-[33.75px] items-center justify-center gap-[4px] rounded-[10px] border border-app-border bg-app-surface px-[12px] text-[14px] font-medium leading-[20px]">
                <UserCheck className="size-[16px]" strokeWidth={2} />
                {c.take}
              </span>
            </ConsoleCard>

            <ConsoleCard
              title={c.notesTitle}
              description={
                <span className="flex items-center gap-[4px]">
                  <Lock className="size-[12px]" strokeWidth={2} />
                  {c.notesHint}
                </span>
              }
              bodyClassName="flex flex-col gap-[12px]"
            >
              <p className="text-[14px] leading-[20px] text-app-text-secondary">{c.notesEmpty}</p>
              <div className="h-[56px] rounded-[10px] border border-app-border px-[12px] py-[8px] text-[14px] leading-[1.5] text-app-text-secondary">
                {c.notesPlaceholder}
              </div>
            </ConsoleCard>
          </div>
        </div>
      </ConsoleShell>
    </ConsoleFrame>
  );
}

function Fact({ icon: Icon, label, value }: { icon: typeof CalendarClock; label: string; value: string }) {
  return (
    <div className="flex items-start gap-[8px]">
      <Icon className="mt-[2px] size-[16px] shrink-0 text-app-text-secondary" strokeWidth={2} />
      <div className="min-w-0">
        <dt className="text-[12px] leading-[16px] text-app-text-secondary">{label}</dt>
        <dd className="text-[14px] leading-[20px]">{value}</dd>
      </div>
    </div>
  );
}

function InfoDot() {
  return (
    <svg viewBox="0 0 24 24" className="size-[16px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}
