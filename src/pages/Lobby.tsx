import { MainCard } from '../components/layout/MainCard';
import { PageHeader } from '../components/layout/PageHeader';
import { BaseInputSearch } from '../components/base/input/BaseInputSearch';
import { FilterModal } from '../components/modal/FilterModal';
import { TransparentCard } from "../components/layout/TransparentCard";
import { ErrorHelper } from "../helper/errorHelper.js";
import { fetchAll as fetchAllMatches } from "../repositories/matches";
import type { Match } from "../models/match";
import { useEffect, useState } from "react";
import { MatchList } from "../components/layout/MatchList";

export default function LobbyPage() {

  const [matches, setMatches] = useState<Match[]>([]);
  const [query, setQuery] = useState("");

  function onChange(e) {
    setQuery(e.target.value ?? "");
  }

  useEffect(() => {
    loadMatches();
  }, [query]);

  async function loadMatches() {
    try {
      const data = await fetchAllMatches({ query });
      setMatches(data ?? []);
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  return (
    <section className="lobby-page">
      <MainCard>
        <PageHeader title={globalThis.t("page.lobby.title")} info={globalThis.t("page.lobby.info")} />
        <TransparentCard direction='row' gap='2'>
          <TransparentCard width='3/5' ><BaseInputSearch onChange={onChange} /> </TransparentCard>
          <TransparentCard width='2/5'><FilterModal /></TransparentCard>
        </TransparentCard>
        <MatchList matches={matches} />
      </MainCard>
    </section>
  );
}


