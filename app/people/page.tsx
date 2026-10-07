import type { Metadata } from "next";
import { Suspense } from "react";
import { PeopleBrowser } from "@/components/PeopleBrowser";
import { JsonLd } from "@/components/JsonLd";
import { people, personCards } from "@/data/people";
import { articleLd, pageMeta } from "@/lib/seo";

const description = `서양과 동양 ${people.length}명. 나라 탭이 아니라 사람 카드로 고르고, 서양·동양과 시대 태그로 거릅니다.`;

export const metadata: Metadata = pageMeta({
  title: "사람들",
  description,
  path: "/people",
});

export default function PeoplePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={articleLd({ title: "사람들", description, path: "/people" })} />
      <p className="text-xs tracking-[0.2em] text-terra">PEOPLE</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">사람들</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
        철학사 전체를 표로 외우지 않습니다. 이번 목록은 길을 잡는 {people.length}명입니다. 서양과 동양을 같은 카드로 두고, 시대 태그로만 나눕니다.
      </p>
      <Suspense fallback={<p className="mt-8 text-sm text-muted">목록을 준비하고 있습니다.</p>}>
        <PeopleBrowser people={personCards()} />
      </Suspense>
    </div>
  );
}
