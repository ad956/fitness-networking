import { useEffect, useState } from "react";
import { Image, Button, Link } from "@nextui-org/react";
import { useUserStore } from "@store";

export default function AuthErrorFallback({ statusCode }) {
  const { user } = useUserStore();
  const userRole = user?.role;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (statusCode === 401) {
      setImageUrl(
        "https://cdn.dribbble.com/users/761395/screenshots/6287961/error_401.jpg"
      );
    } else if (statusCode === 403) {
      setImageUrl(
        "https://cdn.dribbble.com/users/134564/screenshots/4575057/kriptown-illu-animation403_clean.gif"
      );
    }
  }, [statusCode]);

  return (
    <section className="h-screen w-screen flex flex-col lg:flex-row justify-evenly items-center px-6">
      <div className="w-full max-w-lg lg:max-w-xl flex justify-center">
        {imageUrl && (
          <Image
            src={imageUrl}
            className="border rounded-lg"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            style={{
              maxWidth: "100%",
              height: "auto",
              visibility: imageLoaded ? "visible" : "hidden",
            }}
          />
        )}
      </div>

      <div className="flex flex-col gap-5 justify-center items-center w-full max-w-md text-center">
        <div className="text-black/60 text-lg font-medium">
          <span className="text-black font-semibold">Message :</span>{" "}
          {statusCode === 401 && !user?.accessToken
            ? "You must be logged in before accessing."
            : "You are not authorized to access this page."}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {statusCode === 403 ? (
            <Button
              className="bg-black text-white font-medium"
              as={Link}
              href={`/${userRole}`}
            >
              Go Back
            </Button>
          ) : (
            <Button
              className="bg-black text-white font-medium"
              as={Link}
              href="/login"
            >
              Sign In
            </Button>
          )}
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
