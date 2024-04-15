import { useLocation } from "react-router-dom";
import { Image, Button, Link } from "@nextui-org/react";
export default function ErrorFallback({ error }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const errorMsg = queryParams.get("msg");

  return (
    <section className="h-screen w-screen flex justify-around items-center">
      <Image
        src="https://cdn.dribbble.com/users/774806/screenshots/3823110/something-went-wrong.gif"
        className="border"
      />

      <div className="flex flex-col gap-5 justify-center items-center h-3/5 w-2/5">
        {/* errors from url */}
        <p className="">{errorMsg}</p>
        {/* thrown errors */}
        {error && (
          <div className="text-black/60 text-lg font-medium">
            <span className="text-black font-semibold">ERROR :</span>{" "}
            {error.message}
          </div>
        )}

        <div className="flex flex-row gap-2">
          <Button
            className="bg-black text-white font-medium"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
          <Button
            className="bg-black text-white font-medium"
            as={Link}
            href="/"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
