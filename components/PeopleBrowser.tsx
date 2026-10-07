"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { PersonCard } from "@/data/types";
import { eraLabel, eras, traditionLabel, traditions } from "@/lib/site";

function sideFrom(value: string | null): (typeof traditions)[number]["id"] {
  if (value === "west" || value === "east") return value;
  return "all";
}

function eraFrom(value: string | null): (typeof eras)[number]["id"] {
  if (value === "ancient" || value === "medieval" || value === "modern" || value === "contemporary") return value;
  return "all";
}

export function PeopleBrowser({ people }: { people: PersonCard[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const side = sideFrom(params.get("side"));
  const era = eraFrom(params.get("era"));
  const [query, setQuery] = useState("");

  function replaceQuery(nextSide: typeof side, nextEra: typeof era) {
    const next = new URLSearchParams(params.toString());
    if (nextSide === "all") next.delete("side");
    else next.set("side", nextSide);
    if (nextEra === "all") next.delete("era");
    else next.set("era", nextEra);
    const queryString = next.toString();
    router.replace(queryString ? `/people?${queryString}` : "/people", { scroll: false });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return people.filter((person) => {
      if (side !== "all" && person.tradition !== side) return false;
      if (era !== "all" && person.era !== era) return false;
      if (!q) return true;
      const haystack = `${person.nameKo} ${person.nameEn} ${person.nativeName ?? ""} ${person.school} ${person.region} ${person.oneLiner}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [era, people, query, side]);

  return (
    <div>
      <div className="mt-6 space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="서양과 동양">
          {traditions.map((item) => {
            const count = people.filter((person) => item.id === "all" || person.tradition === item.id).length;
            const pressed = side === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => replaceQuery(item.id, era)}
                className={`shrink-0 rounded-full px-3 py-2 text-sm ${
                  pressed ? "bg-terra text-white" : "border border-line bg-card text-ink hover:border-terra"
                }`}
              >
                {item.label} {count}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="시대">
          {eras.map((item) => {
            const count = people.filter((person) => {
              if (side !== "all" && person.tradition !== side) return false;
              return item.id === "all" || person.era === item.id;
            }).length;
            const pressed = era === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => replaceQuery(side, item.id)}
                className={`shrink-0 rounded-full px-3 py-2 text-sm ${
                  pressed ? "bg-stone text-ink" : "border border-line bg-card text-muted hover:text-ink"
                }`}
              >
                {item.label} {count}
              </button>
            );
          })}
        </div>
        <label className="block text-sm text-muted">
          이름 찾기
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="공자, 칸트, 스토아"
            className="mt-1 w-full rounded-md border border-line bg-card px-3 py-2 text-ink placeholder:text-muted/70"
          />
        </label>
      </div>
      <p className="mt-4 text-xs text-muted">{filtered.length}명</p>
      {filtered.length === 0 ? (
        <p className="mt-6 rounded-lg border border-line bg-card p-5 text-sm leading-7 text-muted">
          이 조건에 해당하는 사람이 없습니다. 시대나 검색어를 비우면 다시 보입니다.
        </p>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {filtered.map((person) => (
            <li key={person.slug}>
              <Link href={`/people/${person.slug}`} className="block h-full rounded-lg border border-line bg-card p-5 hover:border-terra">
                <p className="text-[11px] tracking-[0.14em] text-terra">{person.nameEn}</p>
                <p className="mt-2 flex flex-wrap gap-2 text-[11px] text-muted">
                  <span className="rounded-full bg-stone px-2 py-0.5">{traditionLabel[person.tradition]}</span>
                  <span className="rounded-full bg-stone px-2 py-0.5">{eraLabel[person.era]}</span>
                  <span className="rounded-full bg-stone px-2 py-0.5">{person.school}</span>
                </p>
                <h2 className="mt-3 font-serif text-2xl text-ink">{person.nameKo}</h2>
                {person.nativeName ? <p className="mt-1 text-xs text-muted">{person.nativeName}</p> : null}
                <p className="mt-1 text-xs text-muted">
                  {person.years} · {person.region}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">{person.oneLiner}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
