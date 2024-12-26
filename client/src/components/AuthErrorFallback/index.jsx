import { Image, Button, Link } from "@nextui-org/react";
import { useCheckAuth } from "@hooks";

export default function AuthErrorFallback({ statusCode }) {
  const { data: authData } = useCheckAuth();
  const userRole = authData?.user?.role;

  let errorMessage, imageUrl;

  if (statusCode === 401) {
    errorMessage = "You must be logged in before accessing.";
    imageUrl =
      "https://cdn.dribbble.com/users/667145/screenshots/1983050/media/d4b5172f8f838ac1af701bc3b324e347.jpg?resize=800x600&vertical=center";
  } else if (statusCode === 403) {
    errorMessage = "You are not authorized to access this page.";
    imageUrl =
      "https://cdn.dribbble.com/users/134564/screenshots/4575057/kriptown-illu-animation403_clean.gif";
  }

  return (
    <section className="h-screen w-screen flex flex-col lg:flex-row justify-around items-center">
      <Image src={imageUrl} className="border" />

      <div className="flex flex-col gap-5 justify-center items-center h-3/5 w-4/5 lg:w-2/5">
        <div className="text-black/60 text-lg font-medium">
          <span className="text-black font-semibold">Message :</span>{" "}
          {errorMessage}
        </div>

        <div className="flex flex-row gap-2">
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
