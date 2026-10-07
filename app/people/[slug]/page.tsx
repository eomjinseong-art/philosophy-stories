import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getPerson, neighbors, people } from "@/data/people";
import { articleLd, pageMeta } from "@/lib/seo";
import { eraLabel, traditionLabel } from "@/lib/site";

export function generateStaticParams() {
  return people.map((person) => ({ slug: person.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) return {};
  return pageMeta({
    title: `${person.nameKo} (${person.nameEn})`,
    description: person.oneLiner,
    path: `/people/${person.slug}`,
  });
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) notFound();
  const near = neighbors(slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={{
          ...articleLd({
            title: person.nameKo,
            description: person.oneLiner,
            path: `/people/${person.slug}`,
          }),
          about: {
            "@type": "Person",
            name: person.nameKo,
            alternateName: person.nameEn,
          },
        }}
      />
      <p className="text-sm text-muted">
        <Link href="/" className="underline decoration-line underline-offset-4 hover:text-terra">
          홈
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href="/people" className="underline decoration-line underline-offset-4 hover:text-terra">
          사람들
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{person.nameKo}</span>
      </p>
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">{person.nameEn}</p>
      <p className="mt-2 flex flex-wrap gap-2 text-[11px] text-muted">
        <span className="rounded-full bg-stone px-2 py-0.5">{traditionLabel[person.tradition]}</span>
        <span className="rounded-full bg-stone px-2 py-0.5">{eraLabel[person.era]}</span>
        <span className="rounded-full bg-stone px-2 py-0.5">{person.school}</span>
      </p>
      <h1 className="mt-3 font-serif text-4xl text-ink">{person.nameKo}</h1>
      {person.nativeName ? <p className="mt-1 text-sm text-muted">{person.nativeName}</p> : null}
      <p className="mt-1 text-sm text-muted">
        {person.years} · {person.region}
      </p>
      <p className="mt-4 text-base leading-8 text-ink">{person.oneLiner}</p>
      {person.caution ? (
        <p className="mt-4 rounded-lg border border-line bg-stone/70 p-4 text-sm leading-7 text-muted">{person.caution}</p>
      ) : null}

      <section className="mt-10" aria-labelledby="ideas-heading">
        <h2 id="ideas-heading" className="font-serif text-2xl text-ink">
          핵심 생각
        </h2>
        <ol className="mt-4 space-y-4">
          {person.ideas.map((idea, index) => (
            <li key={idea.title} className="rounded-lg border border-line bg-card p-5">
              <h3 className="font-serif text-xl text-ink">
                <span className="mr-2 text-terra">{index + 1}</span>
                {idea.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted">{idea.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10" aria-labelledby="works-heading">
        <h2 id="works-heading" className="font-serif text-2xl text-ink">
          대표 저작
        </h2>
        <ul className="mt-4 space-y-3">
          {person.works.map((work) => (
            <li key={work.title} className="text-sm leading-7">
              <p className="font-medium text-ink">{work.title}</p>
              <p className="text-muted">{work.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="quotes-heading">
        <h2 id="quotes-heading" className="font-serif text-2xl text-ink">
          말과 출처
        </h2>
        <p className="mt-2 text-sm leading-7 text-muted">
          번역은 이 사이트에서 짧게 다시 쓴 것입니다. 풀이는 문장을 그대로 가져온 인용이 아닙니다.
        </p>
        <ul className="mt-4 space-y-4">
          {person.quotes.map((quote) => (
            <li key={quote.source + quote.ko} className="rounded-lg border border-line bg-card p-5">
              <p className="text-[11px] tracking-[0.14em] text-terra">{quote.mode}</p>
              <blockquote className="mt-2 text-sm leading-7 text-ink">{quote.ko}</blockquote>
              {quote.original ? <p className="mt-2 text-xs leading-6 text-dusk">{quote.original}</p> : null}
              <p className="mt-3 text-xs leading-6 text-muted">출처 · {quote.source}</p>
              {quote.note ? <p className="mt-1 text-xs leading-6 text-muted">{quote.note}</p> : null}
            </li>
          ))}
        </ul>
      </section>

      {person.films && person.films.length > 0 ? (
        <section className="mt-10" aria-labelledby="films-heading">
          <h2 id="films-heading" className="font-serif text-2xl text-ink">
            관련 영화
          </h2>
          <ul className="mt-4 space-y-4">
            {person.films.map((film) => (
              <li key={`${film.titleEn}-${film.year}`} className="rounded-lg border border-line bg-card p-5">
                <p className="text-[11px] tracking-[0.14em] text-terra">
                  {film.kind} · {film.year}
                </p>
                <h3 className="mt-1 font-serif text-xl text-ink">「{film.titleKo}」</h3>
                <p className="mt-1 text-xs text-muted">{film.titleEn}</p>
                <p className="mt-3 text-sm leading-7 text-muted">{film.blurb}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-10" aria-labelledby="related-heading">
        <h2 id="related-heading" className="font-serif text-2xl text-ink">
          이어서
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {person.related.map((slug) => {
            const other = getPerson(slug);
            if (!other) return null;
            return (
              <li key={slug}>
                <Link href={`/people/${slug}`} className="inline-block rounded-full border border-line bg-card px-3 py-2 text-sm hover:border-terra">
                  {other.nameKo}
                  <span className="ml-2 text-[11px] text-terra">{traditionLabel[other.tradition]}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <nav className="mt-10 flex justify-between gap-4 border-t border-line pt-4 text-sm" aria-label="같은 갈래의 앞뒤">
        {near.prev ? (
          <Link href={`/people/${near.prev.slug}`} className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
            ← {near.prev.nameKo}
          </Link>
        ) : (
          <span />
        )}
        {near.next ? (
          <Link href={`/people/${near.next.slug}`} className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
            {near.next.nameKo} →
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
