import { createElement } from "react";
import { createStandaloneToast } from "@chakra-ui/react";
import theme from "../chakraTheme.js";
import { BaseAlert } from "../components/base/alert/BaseAlert";

const { toast } = createStandaloneToast({ theme });

const defaultOpts = {
  duration: 5000,
  isClosable: true,
  position: "top",
};

function renderAlert({ text, state = "info" }) {
  return () => createElement(BaseAlert, { state, text });
}

export const notify = (opts) => {
  const { text = "", state = "info", ...rest } = opts || {};
  return toast({
    ...defaultOpts,
    ...rest,
    render: renderAlert({ text, state }),
  });
};

notify.success = (text, opts = {}) => notify({ text, state: "success", ...opts });
notify.error = (text, opts = {}) => notify({ text, state: "error", ...opts });
notify.warning = (text, opts = {}) => notify({ text, state: "warning", ...opts });
notify.info = (text, opts = {}) => notify({ text, state: "info", ...opts });

export default notify;



