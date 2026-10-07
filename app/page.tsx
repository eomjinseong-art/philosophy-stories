import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { getPerson, people, readingOrder } from "@/data/people";
import { eraLabel, sisters, site, traditionLabel } from "@/lib/site";

const featured = ["socrates", "confucius", "buddha", "plato", "laozi", "kant"];

export default function HomePage() {
  const westCount = people.filter((person) => person.tradition === "west").length;
  const eastCount = people.filter((person) => person.tradition === "east").length;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: site.name,
              alternateName: [site.nameEn, "쉬운 철학"],
              url: site.url,
              inLanguage: "ko",
              description: site.description,
              identifier: site.namespace,
            },
          ],
        }}
      />
      <section className="py-12 text-center sm:py-16">
        <p className="text-xs tracking-[0.3em] text-terra">PHILOSOPHY STORIES</p>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">{site.name}</h1>
        <p className="mt-4 text-lg text-muted">{site.tagline}</p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted">
          서양과 동양을 나라 탭으로 나누지 않습니다. 한 사람의 한 줄, 생각 서너 개, 책, 출처가 있는 말만 적습니다.
          어려운 말에는 쉬운 풀이를 붙입니다.
        </p>
        <p className="mt-3 text-xs text-terra">{site.brand}</p>
        <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-muted">
          이번 명단은 서양 {westCount}명, 동양 {eastCount}명입니다. 전체 철학사가 아니라, 길을 잡기 위해 고른 목록입니다.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
          <Link href="/people" className="rounded-full bg-terra px-4 py-2 text-white hover:bg-terra-deep">
            사람부터 보기
          </Link>
          <Link href="/people?side=east" className="rounded-full border border-line bg-card px-4 py-2 hover:border-terra">
            동양만 보기
          </Link>
        </div>
      </section>
      <div className="dentil opacity-50" aria-hidden="true" />
      <section className="mt-10" aria-labelledby="sides-heading">
        <h2 id="sides-heading" className="font-serif text-2xl text-ink">두 갈래, 한 목록</h2>
        <p className="mt-1 text-sm text-muted">필터는 서양·동양과 시대입니다. 첫 화면의 주인공은 나라 이름이 아니라 사람입니다.</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Link href="/people?side=west" className="rounded-lg border border-line bg-card p-5 hover:border-terra">
            <p className="text-[11px] tracking-[0.16em] text-terra">WEST</p>
            <h3 className="mt-1 font-serif text-2xl text-ink">서양</h3>
            <p className="mt-1 text-xs text-muted">{westCount}명 · 소크라테스 이전에서 20세기까지</p>
            <p className="mt-3 text-sm leading-6 text-muted">
              헤라클레이토스와 파르메니데스에서 아리스토텔레스로, 스피노자와 칸트를 지나 헤겔, 밀, 마르크스, 비트겐슈타인, 롤스까지. 이븐 루시드는 그리스 철학이 아랍어를 거쳐 라틴으로 이어지는 다리로 서양 필터에 두었습니다. 저작권이 남은 20세기 글은 문장을 인용하지 않고 뜻만 적습니다.
            </p>
          </Link>
          <Link href="/people?side=east" className="rounded-lg border border-line bg-card p-5 hover:border-terra">
            <p className="text-[11px] tracking-[0.16em] text-terra">EAST</p>
            <h3 className="mt-1 font-serif text-2xl text-ink">동양</h3>
            <p className="mt-1 text-xs text-muted">{eastCount}명 · 중국 고전, 인도, 한국과 일본</p>
            <p className="mt-3 text-sm leading-6 text-muted">
              공자, 노자, 붓다에서 주희, 도겐, 다산, 니시다까지. 이름은 예시이고 목록 전체가 아닙니다. 원효와 퇴계, 다산은 얇게, 신앙을 권하지 않고 생각의 뼈대만 적습니다.
            </p>
          </Link>
        </div>
      </section>
      <section className="mt-12" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="font-serif text-2xl text-ink">먼저 만날 여섯 사람</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((slug) => {
            const person = getPerson(slug);
            if (!person) return null;
            return (
              <Link
                key={slug}
                href={`/people/${slug}`}
                className="group rounded-lg border border-line bg-card p-5 transition hover:border-terra hover:shadow-sm"
              >
                <p className="font-serif text-xs text-terra">
                  {traditionLabel[person.tradition]} · {eraLabel[person.era]}
                </p>
                <h3 className="mt-1 font-serif text-xl text-ink group-hover:text-terra">{person.nameKo}</h3>
                <p className="mt-1 text-xs text-muted">{person.nameEn}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{person.oneLiner}</p>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 id="start" className="font-serif text-2xl text-ink">
            처음 읽는 순서
          </h2>
          <ol className="mt-4 space-y-2 text-sm">
            {readingOrder.map((item, index) => {
              const person = getPerson(item.slug);
              if (!person) return null;
              return (
                <li key={item.slug}>
                  <Link href={`/people/${item.slug}`} className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
                    {index + 1}. {person.nameKo} — {item.why}
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
        <section aria-labelledby="sister-sites-heading" className="rounded-lg border border-line bg-card p-5">
          <h2 id="sister-sites-heading" className="font-serif text-2xl text-ink">
            나두 역사·신화
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            신의 이야기와 폴리스, 로마의 전쟁은 철학 옆의 역사입니다. 개념은 철학이야기에 두고, 시대의 장면은 나두의 다른 사이트에서 읽습니다.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {sisters.map((sister) => (
              <li key={sister.href}>
                <a href={sister.href} className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" rel="noopener noreferrer">
                  {sister.label}
                </a>
                <span className="ml-2 text-[11px] tracking-[0.12em] text-terra">{sister.en}</span>
              </li>
            ))}
          </ul>
          <Link href="/sources" className="mt-4 inline-block text-sm text-terra">
            인용을 가리는 기준 →
          </Link>
        </section>
      </section>
    </div>
  );
}
