import type { ExternalLink } from "@/data/types";

export function ExternalLinks({ links }: { links: ExternalLink[] }) {
  if (links.length === 0) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={`${link.href}-${link.label}`}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-laurel underline decoration-line underline-offset-4 hover:text-terra"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
