import { createStandaloneToast } from "@chakra-ui/react";
import theme from "../chakraTheme.js";

const { toast } = createStandaloneToast({ theme });

const defaultOpts = {
  duration: 5000,
  isClosable: true,
  position: "top",
};

export const notify = (opts) => {
  if (typeof opts === "string") {
    return toast({ ...defaultOpts, title: opts, status: "info" });
  }
  return toast({ ...defaultOpts, ...opts });
};

notify.success = (title, opts = {}) => notify({ title, status: "success", ...opts });
notify.error = (title, opts = {}) => notify({ title, status: "error", ...opts });
notify.warning = (title, opts = {}) => notify({ title, status: "warning", ...opts });
notify.info = (title, opts = {}) => notify({ title, status: "info", ...opts });

export default notify;

