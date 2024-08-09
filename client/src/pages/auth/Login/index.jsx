import React from "react";
import {
  Image,
  Button,
  Input,
  Link,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signin_png } from "@images";
import { SeoHelmet, GoogleAuthHandler, VerificationModal } from "@components";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@features/auth/authSlice";
import { isLoggedIn } from "@utils";
import { useNavigate } from "react-router-dom";
import { useLogin, useGoogleAuth } from "@queries/authQueries";

function LoginPage() {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    isLoggedIn(navigate, authState);
  }, []);

  const [user, setUser] = React.useState({
    identifier: "",
    password: "",
    role: null,
  });

  const [isVisible, setIsVisible] = React.useState(false);
  const [isDigitsOnly, setIsDigitsOnly] = React.useState(false);
  const [showVerifyModal, setshowVerifyModal] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const dispatch = useDispatch();

  const { mutate: loginMutate, isError, error } = useLogin();
  const { mutate: googleAuthMutate } = useGoogleAuth();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateMobileNumber = (mobileNumber) => {
    const re = /^\d{10}$/;
    return re.test(String(mobileNumber));
  };

  const digitsOnly = (identifier) => {
    return /^\d+$/.test(identifier);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleBlur = () => {
    setIsDigitsOnly(digitsOnly(user.identifier));
  };

  const handleStartContent = () => {
    if (isDigitsOnly) {
      return <span className="text-black/80">+91</span>;
    }
    return null;
  };

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-+.?]).{8,20}$/.test(
      password
    );

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!user.identifier || !user.password || !user.role) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!digitsOnly(user.identifier)) {
      if (!validateEmail(user.identifier)) {
        toast.error("Please enter a valid email address.");
        return;
      }
    } else {
      if (!validateMobileNumber(user.identifier)) {
        toast.error(
          "Mobile number must be a valid format (e.g. +1234567890 or 123-456-7890)"
        );
        return;
      }
    }

    if (validatePassword(user.password)) {
      toast.error(
        "Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    toast.loading("Please wait...");
    loginMutate(user, {
      onSuccess: () => {
        toast.dismiss();
        setshowVerifyModal(true);
      },
      onError: (error) => {
        toast.dismiss();
        toast.error(error.message);
      },
    });
  };

  const handleGoogleSignInButton = async () => {
    if (!user.role) {
      toast.error("Please select your user role before signing in!");
      return;
    }
    try {
      googleAuthMutate(user.role, {
        onSuccess: (res) => {
          dispatch(
            loginUser({
              user: {
                role: user.role,
              },
              isAuthenticated: true,
            })
          );
          navigate(`/${user.role}`);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const title = "Login | Fitness Networking";
  const description = "Login page of fitness networking";
  const keywords = ["fitness", "networking", "login", "page"];
  const canonical = window.location.href;

  if (isError || error) {
    toast.dismiss();
    toast.error(error.message);
  }

  return (
    <section className="bg-white/75 font-outfit min-h-screen min-w-screen flex justify-around items-center px-4 sm:px-6 lg:px-8">
      <SeoHelmet
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
      />
      <Toaster />
      <Image src={signin_png} className="hidden md:block h-3/5 w-4/5" />

      <div className="max-w-md w-full space-y-8 lg:mr-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-900">
            Sign in to your account
          </h2>
        </div>

        <div className="rounded-md shadow-sm">
          <div>
            <Button
              variant="bordered"
              radius="full"
              className="w-full flex justify-center items-center p-6 text-sm font-medium"
              onClick={handleGoogleSignInButton}
            >
              <FcGoogle size={25} />
              Sign in with Google
            </Button>
          </div>
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-zinc-300 -700"></div>
            <span className="flex-shrink mx-4 text-zinc-600">
              or sign in with email or username
            </span>
            <div className="flex-grow border-t border-zinc-300"></div>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="email mobile"
                label="Email / Mobile"
                labelPlacement="outside"
                startContent={handleStartContent()}
                maxLength={digitsOnly(user.identifier) ? 10 : undefined}
                required
                value={user.identifier}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2"
                classNames={{
                  label: "text-black font-medium",
                }}
                placeholder="Enter email or mobile"
                variant="bordered"
                size="lg"
                radius="md"
              />
            </div>
            <div>
              <Input
                id="password"
                name="password"
                type={isVisible ? "text" : "password"}
                autoComplete="current-password"
                label="Password"
                labelPlacement="outside"
                required
                value={user.password}
                onChange={handleChange}
                className="w-full px-3 py-2"
                classNames={{
                  label: "text-black font-medium",
                }}
                placeholder="********"
                variant="bordered"
                size="lg"
                radius="md"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <AiTwotoneEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <AiTwotoneEye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />
            </div>
            <div>
              <RadioGroup
                label="Select your role"
                color="default"
                value={user.role}
                onValueChange={(value) => setUser({ ...user, role: value })}
                classNames={{
                  label: "text-black font-medium",
                }}
                orientation="horizontal"
                className="w-full px-3 py-2"
              >
                <Radio value="user">Gym Member</Radio>
                <Radio value="partner">Gym Proprietor</Radio>
              </RadioGroup>
            </div>
            <div className="flex items-center justify-end py-4">
              <Link href="#" className="text-sm font-medium text-black">
                Forgot your password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-white tracking-wide font-medium"
              radius="md"
            >
              Sign in
            </Button>
          </form>
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-zinc-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-sm text-black/80">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {showVerifyModal && (
        <VerificationModal mutate={loginMutate} user={user} />
      )}
    </section>
  );
}

export default LoginPage;
