/**
 * JsonLd — render a <script type="application/ld+json"> tag.
 *
 * Usage (server component):
 *   <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", ... }} />
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
