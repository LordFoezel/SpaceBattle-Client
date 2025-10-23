
interface BaseSpacerProps {
  name?: string;
  width?: string;
  height?: string;
}

const BaseSpacer = function BaseSpacer({
  name,
  width = "5",
  height = "5",
}: BaseSpacerProps) {
  function className() {
    const classes = [];
    if (width) classes.push(`w-${width}`);
    if (height) classes.push(`h-${height}`);
    return classes.join(" ");
  }

  return (
    <div
      name={name}
      className={className()}
    />
  );
};

export { BaseSpacer };
