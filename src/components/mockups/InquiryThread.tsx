import * as React from 'react';
import type { Dictionary } from '@/i18n';
import { INQUIRY_THREAD } from '@/lib/sample-data';
import { AppAvatar, AppIcon } from './AppIcon';
import { AppHeader, HomeIndicator } from './AppChrome';

/**
 * The supplier app's conversation with the office, reproduced from
 * `screens/inquiry/InquiryThreadScreen.tsx`: a pushed screen (back chevron,
 * the subject as its title, no tab bar), the subject card with its status,
 * day separators, bubbles grouped into bursts, and the composer pinned to the
 * foot with the quick-reply chips that fill the box while it is empty.
 *
 * The office is on the left with the leaf mark, the supplier on the right with
 * their chosen face: the mirror image of the console, where the office is the
 * right-hand side. It is the same conversation as `ConsoleInquiry.tsx`.
 */
export function InquiryThread({ t }: { t: Dictionary }) {
  const th = t.thread;
  const bodies: Record<(typeof INQUIRY_THREAD.messages)[number]['body'], string> = {
    question: th.messages.question,
    checking: t.console.inquiry.suggestChecking,
    thanks: th.suggest.thanks,
    update: th.suggest.update,
  };
  const days = [th.yesterday, th.today];

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-app-background text-app-text">
      <AppHeader title={th.subject} variant="pushed" />

      <div className="flex min-h-0 flex-1 flex-col gap-[4px] overflow-hidden px-[16px] py-[16px]">
        {/* Subject card */}
        <div className="mb-[8px] flex items-center gap-[12px] rounded-[16px] border border-app-border bg-app-surface p-[12px]">
          <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-app-primary-muted text-app-primary">
            <AppIcon name="message" size={20} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
            <p className="line-clamp-2 text-[16px] font-semibold leading-[24px]">{th.subject}</p>
            <p className="text-[12px] leading-[16px] text-app-text-secondary">
              {th.started.replace('{date}', th.startedDate)}
            </p>
          </div>
          <span className="self-start whitespace-nowrap rounded-full bg-app-warning-muted px-[12px] py-[2px] text-[12px] font-semibold leading-[16px] text-app-warning">
            {th.statusPending}
          </span>
        </div>

        {INQUIRY_THREAD.messages.map((m, i) => {
          const mine = m.author === 'supplier';
          const newDay = i === 0 || INQUIRY_THREAD.messages[i - 1].day !== m.day;
          return (
            <React.Fragment key={i}>
              {newDay ? (
                <p className="my-[8px] self-center rounded-full bg-app-surface-variant px-[12px] py-[4px] text-center text-[12px] leading-[16px] text-app-text-secondary">
                  {days[m.day]}
                </p>
              ) : null}
              <div className={'mt-[8px] flex items-end gap-[4px] ' + (mine ? 'flex-row-reverse' : '')}>
                <span className="w-[28px] shrink-0">
                  {mine ? (
                    <AppAvatar size={28} />
                  ) : (
                    <span className="grid size-[28px] place-items-center rounded-full bg-app-primary text-white">
                      <AppIcon name="leaf" size={16} />
                    </span>
                  )}
                </span>
                <div className={'flex max-w-[78%] flex-col gap-[2px] ' + (mine ? 'items-end' : 'items-start')}>
                  {mine ? null : (
                    <span className="ml-[4px] text-[12px] leading-[16px] text-app-text-secondary">
                      {th.factory} · {INQUIRY_THREAD.officeName}
                    </span>
                  )}
                  <div
                    className={
                      'px-[12px] pb-[4px] pt-[8px] ' +
                      (mine
                        ? 'rounded-[16px] rounded-br-[6px] bg-app-primary text-white'
                        : 'rounded-[16px] rounded-bl-[6px] border border-app-border bg-app-surface')
                    }
                  >
                    <p className="text-[16px] leading-[24px]">{bodies[m.body]}</p>
                    <p
                      className={
                        'mt-[2px] text-right text-[12px] leading-[16px] ' +
                        (mine ? 'text-white/80' : 'text-app-text-secondary')
                      }
                    >
                      {m.time}
                    </p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}

        <p className="mt-[4px] text-right text-[12px] leading-[16px] text-app-text-secondary">
          {th.awaitingReply}
        </p>
      </div>

      {/* Composer: chips while the draft is empty, then the input pill. */}
      <div className="flex shrink-0 flex-col gap-[8px] px-[16px] pb-[34px] pt-[8px]">
        <div className="flex gap-[8px] overflow-hidden">
          {[th.suggest.thanks, th.suggest.update, th.suggest.callMe, th.suggest.visit, th.suggest.understood].map(
            (chip) => (
              <span
                key={chip}
                className="shrink-0 whitespace-nowrap rounded-full border border-app-primary bg-app-surface px-[12px] py-[6px] text-[14px] font-medium leading-[20px] text-app-primary"
              >
                {chip}
              </span>
            ),
          )}
        </div>
        <div className="flex items-end gap-[8px] rounded-[24px] border border-app-border bg-app-surface p-[4px] pl-[12px]">
          <p className="min-h-[40px] flex-1 truncate py-[10px] text-[16px] leading-[20px] text-app-text-secondary">
            {th.placeholder}
          </p>
          <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-app-surface-variant text-app-text-secondary">
            <AppIcon name="send" size={20} />
          </span>
        </div>
      </div>

      <HomeIndicator />
    </div>
  );
}
