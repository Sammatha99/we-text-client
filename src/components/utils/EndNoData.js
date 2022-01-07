import clsx from "clsx";

const EndNoData = ({ theme, style, text }) => {
  return (
    <div
      className={clsx("no-data", {
        theme: `no-data--${theme}`,
        style: `no-data--${style}`,
      })}
    >
      {text}
    </div>
  );
};

const EndNoDataLight = ({ text } = {}) => {
  return <EndNoData theme={"light"} text={text || "No more data"} />;
};

const EndNoDataDark = ({ text } = {}) => {
  return <EndNoData theme={"dark"} text={text || "No more data"} />;
};

export { EndNoDataLight, EndNoDataDark };
