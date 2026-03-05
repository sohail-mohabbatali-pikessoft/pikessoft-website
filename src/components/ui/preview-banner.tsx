import { draftMode } from "next/headers";

/**
 * PreviewBanner — async server component.
 *
 * Renders an amber fixed banner at the top of the page when Sanity draft/preview
 * mode is active.  Returns null (zero overhead) in production / when preview is off.
 *
 * Add this as the first child of <body> in layout.tsx, before <Providers>.
 */
export default async function PreviewBanner() {
  const { isEnabled } = await draftMode();

  if (!isEnabled) return null;

  return (
    <div
      aria-live="polite"
      className="fixed inset-x-0 top-0 z-[99999] flex items-center justify-between gap-4 bg-amber-400 px-4 py-2 text-sm font-semibold text-amber-950 shadow-md"
    >
      <span>
        🔍 Preview Mode active — you are viewing unpublished draft content
      </span>
      {/* POST to /api/draft disables draft mode and redirects */}
      <form method="POST" action="/api/draft">
        <button
          type="submit"
          className="rounded bg-amber-950/20 px-3 py-1 text-xs transition-colors hover:bg-amber-950/30 cursor-pointer"
        >
          Exit Preview
        </button>
      </form>
    </div>
  );
}
