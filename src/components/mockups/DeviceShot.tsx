import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Renders a product screen at its true pixel size and scales it into place.
 *
 * The alternative, re-sizing every value per placement, is how the mockups
 * drifted away from the real UI in the first place. Here the child is written
 * in the product's own numbers (a 16px body row is `text-[16px]`), and the
 * wrapper does the scaling, so a screenshot in a 700px column and the same
 * screenshot at full width are the same screen.
 */
export function DeviceShot({
  width,
  height,
  className,
  children,
}: {
  /** The product's real viewport width in CSS pixels. */
  width: number;
  /** The design height at that width; sets the wrapper's aspect ratio. */
  height: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn('device-shot relative', className)}
      style={
        {
          '--shot-w': `${width}px`,
          aspectRatio: `${width} / ${height}`,
        } as React.CSSProperties
      }
    >
      <div className="device-shot-inner" style={{ width, height }}>
        {children}
      </div>
    </div>
  );
}
