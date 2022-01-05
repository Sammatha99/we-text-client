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

const EndNoDataLight = ({ text = "No more data" }) => {
  return <EndNoData theme={"light"} text={text} />;
};

const EndNoDataDark = ({ text = "No more data" }) => {
  return <EndNoData theme={"dark"} text={text} />;
};

export { EndNoDataLight, EndNoDataDark };
