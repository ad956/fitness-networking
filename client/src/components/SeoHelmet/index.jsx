import { Helmet } from "react-helmet-async";

export default function SeoHelmet({ title, description, keywords, canonical }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content="Anand Suthar" />
      <meta name="creator" content="Anand Suthar" />
      <link rel="author" href="https://github.com/ad956" />
      <meta name="application-name" content="Fitness Networking" />
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta name="generator" content="React" />
      <meta name="publisher" content="Anand Suthar" />
      <meta name="robots" content="index, follow" />
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
}
