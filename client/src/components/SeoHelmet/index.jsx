import { Helmet } from "react-helmet-async";

export default function SeoHelmet({ title, canonical }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
