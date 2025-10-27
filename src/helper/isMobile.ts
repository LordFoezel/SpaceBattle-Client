const MOBILE_UA_REGEX = /Android|webOS|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i;

export function isMobile(): boolean {
    const nav = typeof globalThis === "undefined" ? undefined : globalThis.navigator;
    if (!nav) return false;

    const uaData = (nav as Navigator & { userAgentData?: { mobile?: boolean } }).userAgentData;
    if (uaData?.mobile !== undefined) return uaData.mobile;

    const ua = nav.userAgent ?? nav.vendor ?? "";
    return MOBILE_UA_REGEX.test(ua);
}
