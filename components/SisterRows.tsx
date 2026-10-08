import { familyTrees, sisterFilms } from "@/lib/site";

export function SisterRows({ idPrefix }: { idPrefix: string }) {
  return (
    <div className="mt-6 space-y-5 border-t border-line pt-4">
      <section aria-labelledby={`${idPrefix}-family-trees`}>
        <h3 id={`${idPrefix}-family-trees`} className="text-[10px] leading-5 tracking-[0.12em] text-terra">
          다른 가족관계도 / Other family trees
        </h3>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          {familyTrees.map((item) => (
            <li key={item.href} className="max-w-full">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line underline-offset-4 hover:text-terra"
              >
                {item.label}
              </a>
              <span className="ml-1.5 text-[11px] tracking-[0.12em] text-terra">{item.en}</span>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby={`${idPrefix}-sister-films`}>
        <h3 id={`${idPrefix}-sister-films`} className="text-[10px] leading-5 tracking-[0.12em] text-terra">
          다른 사이트의 영화 / Films on sister sites
        </h3>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          {sisterFilms.map((item) => (
            <li key={item.href} className="max-w-full">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line underline-offset-4 hover:text-terra"
              >
                {item.label}
              </a>
              <span className="ml-1.5 text-[11px] tracking-[0.12em] text-terra">{item.en}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
