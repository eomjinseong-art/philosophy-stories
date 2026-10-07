import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { people } from "@/data/people";
import { articleLd, pageMeta } from "@/lib/seo";

const description =
  "철학자를 다룬 영화와 다큐멘터리. 한국어 제목과 영어 제목, 연도, 어디가 극인지를 적습니다. 시청 링크는 없습니다.";

export const metadata: Metadata = pageMeta({
  title: "영화",
  description,
  path: "/films",
});

export default function FilmsPage() {
  const withFilms = people.filter((person) => person.films && person.films.length > 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={articleLd({ title: "영화", description, path: "/films" })} />
      <p className="text-xs tracking-[0.2em] text-terra">FILMS</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">관련 영화</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        있는 작품만 적습니다. 전기가 아닌 것은 전기가 아니라고 적습니다. 볼 수 있는 주소는 안내하지 않습니다.
      </p>
      <div className="mt-10 space-y-12">
        {withFilms.map((person) => (
          <section key={person.slug} aria-labelledby={`films-${person.slug}`}>
            <h2 id={`films-${person.slug}`} className="font-serif text-2xl text-ink">
              <Link href={`/people/${person.slug}`} className="hover:text-terra">
                {person.nameKo}
              </Link>
            </h2>
            <ul className="mt-4 space-y-4">
              {person.films?.map((film) => (
                <li key={`${person.slug}-${film.titleEn}-${film.year}`} className="rounded-lg border border-line bg-card p-5">
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
        ))}
      </div>
    </div>
  );
}
