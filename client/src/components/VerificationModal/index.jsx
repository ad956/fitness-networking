import React, { useEffect } from "react";
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
import { useCheckVerification, useLogin } from "@queries/authQueries";

export default function VerificationModal({ user }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: verificationData,
    isLoading: isCheckingVerification,
    isError: isVerificationError,
    error: verificationError,
    refetch: refetchVerification,
  } = useCheckVerification(user.identifier);

  const { mutate: loginMutate, isLoading: isResending } = useLogin();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    if (verificationData?.verified) {
      dispatch(
        loginUser({
          role: user.role,
          isAuthenticated: true,
        })
      );
      toast.success("Email verified successfully!");
      setTimeout(() => {
        onOpenChange(false);
        navigate(`/${user.role}`);
      }, 2000);
    }
  }, [verificationData, dispatch, navigate, onOpenChange, user]);

  const handleResendClick = () => {
    loginMutate(user, {
      onSuccess: () => {
        toast.success("Verification link has been resent");
        refetchVerification();
      },
      onError: (error) => {
        toast.error(error.message || "Error resending verification link");
      },
    });
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
              {isCheckingVerification ? (
                <p className="text-md font-medium text-black/80 text-center">
                  Checking verification status...
                </p>
              ) : isVerificationError ? (
                <p className="text-md font-medium text-red-600 text-center">
                  {verificationError.message ||
                    "There was an error checking your verification status. Please try again."}
                </p>
              ) : verificationData?.verified ? (
                <p className="text-md font-medium text-green-600 text-center">
                  Your email has been verified successfully! Redirecting...
                </p>
              ) : (
                <p className="text-md font-medium text-black/80 text-center">
                  An email with a verification link has been sent to your inbox.
                  Please check both your inbox and spam/junk folder.
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-center space-x-4">
                {!isCheckingVerification && !verificationData?.verified && (
                  <Button
                    color="primary"
                    variant="light"
                    onClick={handleResendClick}
                    disabled={isResending}
                  >
                    {isResending ? "Resending..." : "Resend"}
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
