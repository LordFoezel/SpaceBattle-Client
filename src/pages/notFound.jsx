import { useEffect } from 'react';
import { PageHeader } from '../components/layout/PageHeader.jsx';
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.history.length > 1) {
      notify.info(t("message.routeBack"));
      setTimeout(() => navigate(-1), 2500);
    }
  });

  return (
    <section className="not-found-page pt-20">
      <PageHeader title={t("page.notFound.title")} info={t("page.notFound.info")} />
    </section>
  );
}
