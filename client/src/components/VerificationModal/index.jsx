import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
} from "@nextui-org/react";
import { email_gif } from "@images";
import { useDispatch } from "react-redux";
import { loginUser } from "@features/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCheckVerification, useSignup } from "@queries/authQueries";

export default function VerificationModal({ user }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { refetch: checkVerification } = useCheckVerification(user.identifier);
  // const { mutate: resendVerification } = useSignup();

  useEffect(() => {
    onOpen();
    const checkVerificationStatus = async () => {
      try {
        const { data } = await checkVerification();
        if (data.verified) {
          setVerificationStatus("verified");
          dispatch(
            loginUser({
              user: {
                role: user.role,
              },
              isAuthenticated: true,
            })
          );
          toast.success("Email verified successfully!");
          setTimeout(() => {
            onOpenChange(false);
            navigate("/dashboard"); // redirect user
          }, 2000);
        }
      } catch (error) {
        console.error("Error checking verification status:", error);
      }
    };

    const intervalId = setInterval(checkVerificationStatus, 5000); // every 5 seconds

    return () => clearInterval(intervalId);
  }, [checkVerification, dispatch, navigate, onOpenChange, user]);

  const handleResendClick = () => {
    // resendVerification(user);
    toast.promise(
      new Promise((resolve) => {
        setTimeout(resolve, 1000);
      }),
      {
        loading: "Resending verification link...",
        success: "Verification link has been resent",
        error: "Error resending verification link",
      }
    );
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-center">
              Verify Your Account
            </ModalHeader>
            <ModalBody>
              <div className="flex justify-center">
                <Image src={email_gif} alt="Email" className="w-36 h-36" />
              </div>
              {verificationStatus === "pending" ? (
                <p className="text-md font-medium text-black/80 text-center">
                  An email with a verification link has been sent to your inbox.
                  Please check both your inbox and spam/junk folder.
                </p>
              ) : verificationStatus === "verified" ? (
                <p className="text-md font-medium text-green-600 text-center">
                  Your email has been verified successfully! Redirecting...
                </p>
              ) : (
                <p className="text-md font-medium text-red-600 text-center">
                  There was an error verifying your email. Please try again.
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-center space-x-4">
                {verificationStatus === "pending" && (
                  <Button
                    color="primary"
                    variant="light"
                    onClick={handleResendClick}
                  >
                    Resend
                  </Button>
                )}
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
