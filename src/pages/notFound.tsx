import { PageHeader } from '../components/layout/PageHeader';

export default function NotFoundPage() {

  return (
    <section className="not-found-page pt-20">
      <PageHeader title={globalThis.t("page.notFound.title")} info={globalThis.t("page.notFound.info")} />
    </section>
  );
}



