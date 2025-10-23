import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import { BaseButton } from "../button/BaseButton";
import { BaseText } from "../text/BaseText";
import colors from "../../../theme/colors.js";

interface BaseModalProps {
  placement?: 'top' | 'center';
  buttonText?: string;
  title?: string;
  PageTitle?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  children?: ReactNode;
  // Controlled state (optional)
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  // Trigger button customization
  hideTriggerButton?: boolean;
  triggerProps?: { [key: string]: any };
  triggerChildren?: ReactNode;
  // Footer buttons customization
  confirmButtonProps?: { [key: string]: any };
  cancelButtonProps?: { [key: string]: any };
  // Footer visibility controls
  showSave?: boolean;
  showClose?: boolean;
  disabledSave?: boolean;
  // Modal width customization
  width?: string | number;
  [key: string]: any;
}


const BaseModal = function BaseModal(props: BaseModalProps) {
  const {
    placement = "center",
    buttonText = globalThis.t("core.open"),
    title = "",
    PageTitle = "",
    confirmText = globalThis.t("core.save"),
    cancelText = globalThis.t("core.close"),
    onConfirm,
    children,
    isOpen,
    onOpen,
    onClose,
    hideTriggerButton = false,
    triggerProps = {},
    triggerChildren,
    confirmButtonProps = {},
    cancelButtonProps = {},
    showSave = true,
    showClose = true,
    disabledSave = false,
    width = "90%",
    ...rest
  } = props;
  const disc = useDisclosure();

  const controlled = typeof isOpen === 'boolean';
  const modalIsOpen = controlled ? !!isOpen : disc.isOpen;
  const doOpen = () => {
    if (controlled) {
      if (typeof onOpen === 'function') onOpen();
    } else {
      disc.onOpen();
    }
  };
  const doClose = () => {
    if (controlled) {
      if (typeof onClose === 'function') onClose();
    } else {
      disc.onClose();
    }
  };
  const handleConfirm = () => {
    if (typeof onConfirm === "function") onConfirm();
    doClose();
  };

  const finalConfirmButtonProps = {
    ...confirmButtonProps,
    isDisabled: disabledSave,
  };

  return (
    <>
      {!hideTriggerButton && (
        <BaseButton onClick={doOpen} {...triggerProps}>
          {triggerChildren ?? <BaseText>{buttonText}</BaseText>}
        </BaseButton>
      )}
      <Modal
        isOpen={modalIsOpen}
        onClose={doClose}
        isCentered={placement === "center"}
        motionPreset="scale"
        {...rest}
      >
        <ModalOverlay />
        <ModalContent
          bg={colors.surface}
          color={colors.text}
          borderWidth="1px"
          borderColor={colors.border}
          maxW={width}
        >
          <ModalHeader borderBottomWidth="1px" borderColor={colors.borderSubtle}>
            <BaseText>{title}</BaseText>
            <BaseText>{PageTitle}</BaseText>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>
          {(showSave || showClose) && (
            <ModalFooter borderTopWidth="1px" borderColor={colors.borderSubtle}>
              {showClose && (
                <BaseButton variant="outline" mr={3} onClick={doClose} {...cancelButtonProps}>
                  {cancelText}
                </BaseButton>
              )}
              {showSave && (
                <BaseButton onClick={handleConfirm} {...finalConfirmButtonProps}>{confirmText}</BaseButton>
              )}
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export { BaseModal };
