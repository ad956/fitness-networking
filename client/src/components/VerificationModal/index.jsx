import React from "react";
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
import { SERVER_URL } from "@constants";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../features/auth/authSlice";
import io from "socket.io-client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerificationModal({ mutate, user }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // removing /api part not needed for socket
  const ServerUrl = SERVER_URL.replace(/\/api\/$/, "");

  React.useEffect(() => {
    onOpen();

    const socket = io(`${ServerUrl}`);

    socket.on("userVerified", (response) => {
      if (response) {
        dispatch(
          setAuthData({
            accessToken: response.accessToken,
            userRole: response.role,
          })
        );

        navigate(`/${response.role}`);
      } else {
        toast.error("Verification failed");
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleResendClick = () => {
    mutate(user);
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
              <p className="text-md font-medium text-black/80 text-center">
                An email with a verification link has been sent to your inbox.
                Please check both your inbox and spam/junk folder.
              </p>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-center space-x-4">
                <Button
                  color="primary"
                  variant="light"
                  onClick={handleResendClick}
                >
                  Resend
                </Button>
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
