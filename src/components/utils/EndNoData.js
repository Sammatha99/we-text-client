import clsx from "clsx";

const EndNoData = ({ theme, style }) => {
  return (
    <div
      className={clsx("no-data", {
        theme: `no-data--${theme}`,
        style: `no-data--${style}`,
      })}
    >
      No more data
    </div>
  );
};

const EndNoDataLight = () => {
  return <EndNoData theme={"light"} />;
};

const EndNoDataDark = () => {
  return <EndNoData theme={"dark"} />;
};

export { EndNoDataLight, EndNoDataDark };
