import { MainCard } from '../components/layout/MainCard';
import { PageHeader } from '../components/layout/PageHeader';
import { BaseInputSearch } from '../components/base/input/BaseInputSearch';
import { FilterModal } from '../components/modal/FilterModal';
import { TransparentCard } from "../components/layout/TransparentCard";
import { ErrorHelper } from "../helper/errorHelper.js";
import { fetchAll as fetchAllMatches } from "../repositories/matches";
import type { Match } from "../models/match";
import { useEffect, useState } from "react";
import { MatchList } from "../components/list/MatchList";
import { UserSettingButton } from '../components/button/UserSettingButton';
import { CreateMatchModal } from '../components/modal/CreateMatchModal';

export default function lobbyPage() {

  const [matches, setMatches] = useState<Match[]>([]);
  const [allMatches, setAllMatches] = useState<Match[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ password: true, space: true });

  function onChangeSearch(e) {
    const value = e?.target?.value ?? "";
    setSearch(value);
  }

  function onChangeFilter(e: { password: boolean, space: boolean }) {
    setFilter(e);
  }

  useEffect(() => {
    filterMatches();
  }, [filter, search, allMatches]);

  useEffect(() => {
    loadMatches();
  }, []);

  async function onCreateMatch() {
    await loadMatches();
    filterMatches();
  }

    async function onDeleteMatch() {
    await loadMatches();
    filterMatches();
  }


  function filterMatches() {
    const filtered = allMatches.filter((m) => {
      if (filter.password) {
        if (m.password_hash) return false;
      } else {
        if (!m.password_hash) return false;
      }
      if (filter.space) {
        const max = m.config?.player_count ?? Number.MAX_SAFE_INTEGER;
        const cur = m.current_player_count ?? 0;
        if (cur >= max) return false;
      } else {
        const max = m.config?.player_count ?? Number.MAX_SAFE_INTEGER;
        const cur = m.current_player_count ?? 0;
        if (cur < max) return false;
      }
      const s = String(search || "").trim().toLowerCase();
      if (s.length > 0) {
        const name = m.name?.toLowerCase() ?? "";
        const desc = m.description?.toLowerCase() ?? "";
        if (!name.includes(s) && !desc.includes(s)) return false;
      }
      return true;
    });
    setMatches(filtered);
  }

  async function loadMatches() {
    try {
      const data = await fetchAllMatches({});
      const list = data ?? [];
      setAllMatches(list);
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  return (
    <section className="lobby-page">
      <MainCard>
        <PageHeader title={globalThis.t("page.lobby.title")} info={globalThis.t("page.lobby.info")} />
        <TransparentCard direction='row' gap='2'>
          <TransparentCard width='3/5' ><BaseInputSearch onChange={onChangeSearch} /> </TransparentCard>
          <TransparentCard width='2/5'><FilterModal onChange={onChangeFilter} /></TransparentCard>
        </TransparentCard>
        <TransparentCard direction='row' gap='2'>
          <CreateMatchModal onCreated={onCreateMatch} />
        </TransparentCard>
        <TransparentCard direction='row' gap='2'>
          <MatchList matches={matches} onDeleted={onDeleteMatch}/>
        </TransparentCard>
        <TransparentCard direction='col' items='end'>
          <UserSettingButton />
        </TransparentCard>
      </MainCard>
    </section>
  );
}
