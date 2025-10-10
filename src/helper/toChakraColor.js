  export function toChakraColor(token) {
    if (!token) return undefined;
    const idx = token.lastIndexOf("-");
    if (idx === -1) return token;
    return token.slice(0, idx) + "." + token.slice(idx + 1);
  }