import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { articleLd, pageMeta } from "@/lib/seo";

const description =
  "철학이야기가 문장을 지어내지 않는 기준. 고전은 위치를 밝히고, 20세기 글은 인용하지 않으며, 가짜 명언은 싣지 않습니다.";

export const metadata: Metadata = pageMeta({
  title: "출처",
  description,
  path: "/sources",
});

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={articleLd({ title: "출처", description, path: "/sources" })} />
      <p className="text-xs tracking-[0.2em] text-terra">SOURCES</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">출처</h1>
      <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
        <p>
          철학이야기의 글은 플라톤의 대화편, 아리스토텔레스의 윤리학과 정치학, 스토아 수첩과 편지, 논어, 맹자, 순자, 도덕경, 장자, 법구경, 중론처럼 오래되어 공공의 것이 된 글을 보고 우리말로 다시 쓴 것입니다. 시중의 번역문장을 베끼지 않았습니다.
        </p>
        <p>
          인용에는 책 이름과 위치를 붙입니다. 번역이라고 적힌 우리말은 이 사이트의 짧은 번역입니다. 풀이라고 적힌 것은 문장 인용이 아닙니다. 카뮈, 사르트르, 보부아르처럼 저작권이 남은 글은 뜻만 풀고 원문을 싣지 않습니다.
        </p>
        <p>
          인터넷에 도는 말 가운데 일부러 거른 예가 있습니다. “우리는 반복한 행위의 결과다”는 아리스토텔레스의 문장이 아니라, 그의 습관 이야기를 윌 듀란트가 푼 쪽에 가깝습니다. “나는 내가 모른다는 것을 안다”는 플라톤 『변론』 21d를 나중에 줄인 말입니다. 히파티아의 이름으로 도는 독립 선언풍 문장은 그의 책이 남아 있지 않아 싣지 않았습니다.
        </p>
        <p>
          노자의 실존, 장자 외편의 저자, 붓다의 연대, 원효의 해골물 이야기는 학설과 전설을 구분합니다. 전설은 전설이라고 적습니다. 한문 짧은 구절은 통행본의 글자를 보이되, 장 번호와 편명은 판본마다 다를 수 있다고 필요한 곳에 적었습니다.
        </p>
        <p>
          영화는 실제로 있는 작품만 한국어 제목과 영어 제목, 연도와 함께 소개합니다. 한국 방송 공식명을 확인하지 못한 다큐멘터리는 영어 제목을 옮긴 이름이라고 밝힙니다. 시청 링크, 불법 사이트, 구매 링크는 없습니다.
        </p>
        <p>
          이번 명단에 없는 사람도 많습니다. 이븐 시나, 이븐 루시드, 샹카라, 울스턴크래프트, 비트겐슈타인, 근현대 한국 철학은 1차 목록에 넣지 않았습니다. 없는 사람을 있는 것처럼 요약하지 않기 위해서입니다.
        </p>
      </div>
    </div>
  );
}
