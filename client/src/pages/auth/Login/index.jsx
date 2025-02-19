import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  Button,
  Input,
  Link,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { FcGoogle, FcCloseUpMode } from "react-icons/fc";
import { signin_png } from "@images";
import { SeoHelmet, VerificationModal } from "@components";
import toast, { Toaster } from "react-hot-toast";
import { useDemoLogin, useGoogleAuth, useLogin } from "@hooks";
import { motion } from "framer-motion";

function LoginPage() {
  const [user, setUser] = useState({
    identifier: "",
    password: "",
    role: null,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isDigitsOnly, setIsDigitsOnly] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const [typed, setTyped] = useState("");
  const [showAdminRole, setShowAdminRole] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ignore key presses when typing inside an input
      if (
        document.activeElement &&
        ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
      ) {
        return;
      }

      setTyped((prev) => (prev + event.key).slice(-5));

      if ((typed + event.key).slice(-5).toLowerCase() === "admin") {
        setShowAdminRole(true);
        setTyped("");
      }

      // Reset typed text after 2 seconds of inactivity
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setTyped(""), 2000);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [typed]);

  const { mutate: googleAuth } = useGoogleAuth();
  const { mutate: loginMutate, isLoading: isLoginLoading } = useLogin();
  const {
    mutate: demoLogin,
    isLoading: isDemoLoginLoading,
    error,
  } = useDemoLogin();

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleBlur = () => setIsDigitsOnly(/^\d+$/.test(user.identifier));

  const handleStartContent = () =>
    isDigitsOnly ? <span className="text-black/80">+91</span> : null;

  const validateForm = () => {
    if (!user.identifier || !user.password || !user.role) {
      toast.error("Please fill in all fields.");
      return false;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.identifier);
    const isMobile = /^\d{10}$/.test(user.identifier);

    if (!isEmail && !isMobile) {
      toast.error("Please enter a valid email address or mobile number.");
      return false;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-+.?]).{8,20}$/.test(
        user.password
      )
    ) {
      toast.error(
        "Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return false;
    }

    return true;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    toast.loading("Please wait...");
    loginMutate(user, {
      onSuccess: (data) => {
        toast.dismiss();
        setShowVerifyModal(true);
      },
      onError: (error) => {
        toast.dismiss();
        toast.error(error.message);
      },
    });
  };

  const handleGoogleSignIn = async () => {
    if (!user.role) {
      toast.error("Please select your user role before signing in!");
      return;
    }
    googleAuth(
      { userRole: user.role },
      {
        onError: (error) => {
          toast.dismiss();
          toast.error(
            error.message || "Google Sign In failed. Please try again."
          );
        },
      }
    );
  };

  const handleDemoLogin = () => {
    if (!user.role) {
      toast.error("Please select your user role before exploring demo access!");
      return;
    }

    toast.loading("Accessing demo account...");
    demoLogin(
      { userRole: user.role },
      {
        onError: (error) => {
          toast.dismiss();
          toast.error(error.message || "Demo login failed. Please try again.");
        },
      }
    );
  };

  return (
    <section className="bg-white/75 font-outfit min-h-screen min-w-screen flex justify-around items-center px-4 sm:px-6 lg:px-8">
      <SeoHelmet
        title="Login | Fitness Networking"
        description="Login page of fitness networking"
        keywords={["fitness", "networking", "login", "page"]}
        canonical={window.location.href}
      />
      <Toaster />
      <Image src={signin_png} className="hidden md:block h-3/5 w-4/5" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 lg:mr-10"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-900">
            Sign in to your account
          </h2>
        </div>

        <div className="rounded-md shadow-sm">
          <div className="flex gap-4">
            <Button
              variant="bordered"
              radius="full"
              className="w-1/2 flex justify-center items-center p-6 text-sm font-medium"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle size={25} />
              Sign in with Google
            </Button>

            <Button
              variant="bordered"
              radius="full"
              className="w-1/2 flex justify-center items-center gap-2 p-6 text-sm font-medium border-zinc-300 hover:bg-zinc-50"
              onClick={handleDemoLogin}
              disabled={isDemoLoginLoading}
            >
              <FcCloseUpMode size={22} className="text-emerald-500" />
              <span>
                {" "}
                {isDemoLoginLoading ? "Logging in..." : "Explore Demo Access"}
              </span>
            </Button>
          </div>
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-zinc-300 -700"></div>
            <span className="flex-shrink mx-4 text-zinc-600">
              or sign in with your credentials
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
                maxLength={isDigitsOnly ? 10 : undefined}
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
                    onClick={() => setIsVisible(!isVisible)}
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
                {showAdminRole && <Radio value="admin">Admin</Radio>}
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
              disabled={isLoginLoading}
            >
              {isLoginLoading ? "Signing in..." : "Sign in"}
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
      </motion.div>

      {showVerifyModal && (
        <VerificationModal mutate={loginMutate} user={user} />
      )}
    </section>
  );
}

export default LoginPage;
