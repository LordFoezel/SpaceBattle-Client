import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import { BaseButton } from "../button/BaseButton";
import { BaseText } from "../text/BaseText";
import colors from "../../../theme/colors.js";

const BaseModal = function BaseModal({
  placement = "center", // 'top' | 'center' 
  buttonText = "Open Dialog",
  title = "Dialog Title",
  PageTitle = "Dialog Sub-Title",
  confirmText = "Save",
  cancelText = "Cancel",
  onConfirm,
  children,
}) {
  const disc = useDisclosure();

  const handleConfirm = () => {
    if (typeof onConfirm === "function") onConfirm();
    disc.onClose();
  };

  return (
    <>
      <BaseButton onClick={disc.onOpen}>
        <BaseText>{buttonText}</BaseText>
      </BaseButton>

      <Modal
        isOpen={disc.isOpen}
        onClose={disc.onClose}
        isCentered={placement === "center"}
        motionPreset="scale"
      >
        <ModalOverlay />
        <ModalContent
          bg={colors.surface}
          color={colors.text}
          borderWidth="1px"
          borderColor={colors.border}
        >
          <ModalHeader borderBottomWidth="1px" borderColor={colors.borderSubtle}>
            <BaseText>{title}</BaseText>
            <BaseText>{PageTitle}</BaseText>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter borderTopWidth="1px" borderColor={colors.borderSubtle}>
            <BaseButton variant="outline" mr={3} onClick={disc.onClose}>
              {cancelText}
            </BaseButton>
            <BaseButton onClick={handleConfirm}>{confirmText}</BaseButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { BaseModal };
