import React, { useState } from "react";
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
import { signup_jpg } from "@images";
import { SeoHelmet, GoogleAuthHandler } from "@components";
import { signupUser } from "@api";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

function SignupPage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "member",
  });

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateMobileNumber = (mobileNumber) => {
    const re = /^\+\d{10}$/;
    return re.test(String(mobileNumber));
  };

  const validatePassword = (password) => {
    const reg =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    return reg.test(String(password));
  };

  const { mutate, isLoading, isError, error, data } = useMutation({
    mutationFn: signupUser,
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!user.name || !user.email || !user.mobile || !user.password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (user.email.includes("@")) {
      if (!validateEmail(user.email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
    }
    if (!user.email.includes("@")) {
      if (!validateMobileNumber(user.email)) {
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

    mutate(user);

    if (isError || error) {
      toast.error(error.message);
    }

    if (data) {
      toast.success(
        "Your login link has been successfully sent to your email address."
      );
    }
  };

  const handleGoogleSignInButton = async () => {
    try {
      await GoogleAuthHandler();
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const title = "Sign Up | Fitness Networking";
  const canonical = window.location.href;

  return (
    <section className="bg-white/75  font-outfit min-h-screen min-w-screen flex justify-around items-center px-4 sm:px-6 lg:px-8">
      <SeoHelmet title={title} canonical={canonical} />
      <Toaster />
      <div className="w-full lg:w-2/6 space-y-5">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-900">
            Sign up for your account
          </h2>
        </div>

        <div className="rounded-md shadow-sm">
          <div>
            <Button
              variant="bordered"
              radius="full"
              onClick={handleGoogleSignInButton}
              className="w-full flex justify-center items-center p-6 text-sm font-medium"
            >
              <FcGoogle size={25} />
              Sign up with Google
            </Button>
          </div>
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-zinc-300 -700"></div>
            <span className="flex-shrink mx-4 text-zinc-600">
              or sign up with email & mobile
            </span>
            <div className="flex-grow border-t border-zinc-300"></div>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-row">
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                label="Name"
                labelPlacement="outside"
                required
                value={user.name}
                onChange={handleChange}
                className="w-full px-3 py-2"
                classNames={{
                  label: "text-black font-medium",
                }}
                placeholder="Enter name"
                variant="bordered"
                size="lg"
                radius="md"
              />
              <Input
                id="mobile"
                name="mobile"
                type="text"
                autoComplete="mobile"
                label="Mobile"
                labelPlacement="outside"
                required
                maxLength={10}
                startContent={<span className="text-black/80">+91</span>}
                value={user.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2"
                classNames={{
                  label: "text-black font-medium",
                }}
                placeholder="Enter mobile"
                variant="bordered"
                size="lg"
                radius="md"
              />
            </div>
            <div>
              <Input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                label="Email"
                labelPlacement="outside"
                required
                value={user.email}
                onChange={handleChange}
                className="w-full px-3 py-2"
                classNames={{
                  label: "text-black font-medium",
                }}
                placeholder="Enter email"
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
                autoComplete="new-password"
                label="Password"
                labelPlacement="outside"
                required
                value={user.password}
                onChange={handleChange}
                className="w-full px-3 py-2"
                classNames={{
                  label: "text-black font-medium",
                }}
                placeholder="Enter password"
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
                onChange={(value) => setUser({ ...user, role: value })}
                classNames={{
                  label: "text-black font-medium",
                }}
                orientation="horizontal"
                className="w-full px-3 py-2"
              >
                <Radio value="member">Gym Member</Radio>
                <Radio value="proprietor">Gym Proprietor</Radio>
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
              Sign up
            </Button>
          </form>
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-zinc-600">
            Already have an account?{" "}
            <Link href="#" className="text-sm text-black/80">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden min-h-screen w-3/6  lg:flex items-center">
        <Image src={signup_jpg} className="min-h-full min-w-full border-3" />
      </div>
    </section>
  );
}

export default SignupPage;
