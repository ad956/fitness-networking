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
import io from "socket.io-client";

export default function VerificationModal({ mutate, user }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  React.useEffect(() => {
    onOpen();

    const socket = io(`http://localhost:3000/`);

    socket.on("emailVerified", (response) => {
      if (
        response.email === user.identifier ||
        response.mobile === user.identifier
      ) {
        console.log("Verification successful");
      } else {
        console.log("Verification failed");
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleResendClick = () => {
    mutate(user);
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
