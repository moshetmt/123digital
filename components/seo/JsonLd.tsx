type JsonLdObject = { [key: string]: unknown }

interface JsonLdProps {
  schema: JsonLdObject | JsonLdObject[]
}

/**
 * Injects one or more JSON-LD schema objects as <script> tags.
 * Place inside <head> or at the top of a page component.
 */
export function JsonLd({ schema }: JsonLdProps) {
  const schemas = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  )
}
