import Link from "next/link";
import styles from "./Breadcrumb.module.scss";

export default function Breadcrumb({ hierarchy = [] }) {
  if (!hierarchy.length) return null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": hierarchy.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.title,
      "item": item.url
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" role="navigation" className={styles.breadcrumb}>
        <ol >
          {hierarchy.map((item, index) => (
            <li key={index} className="">
              <Link href={item.url}>{item.title}</Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
