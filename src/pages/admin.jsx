import { useEffect, useMemo, useState } from "react";
import { MainCard } from '../components/layout/MainCard.jsx';
import { PageHeader } from '../components/layout/PageHeader.jsx';
import { getTables } from "../repositories/auth.ts";
import { ErrorHelper } from "../helper/errorHelper.js";

export default function DashboardPage() {

  useEffect(() => {
    loadTables();
  });

  async function loadTables() {
    try {
      const response = await getTables();
      console.log(response);
      
      // if (!response.ok) {
      //   throw new Error(`Request failed with status ${response.status}`);
      // }
      // const payload = await response.json();
      // if (!cancelled) {
      //   setTables(Array.isArray(payload?.tables) ? payload.tables : []);
      //   setError(null);
      // }
    } catch (error) {
      ErrorHelper.handleError(error);
      }
  }


  return (
    <section className="admin-page">
      <MainCard>
        <PageHeader title={t("page.admin.title")} info={t("page.admin.info")} />
      </MainCard>
    </section>
  );
}
