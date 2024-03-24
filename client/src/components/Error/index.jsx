import { useLocation } from "react-router-dom";
export default function ErrorPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const errorMsg = queryParams.get("msg");

  return <section>error</section>;
}
