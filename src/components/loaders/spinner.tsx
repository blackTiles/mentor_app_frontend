const Spinner = ({
  color = "border-gray-300",
  size = "h-10 w-10",
}: {
  color?: string;
  size?: string;
}) => {
  return (
    <div
      className={`border-4 border-t-transparent rounded-full animate-spin ${color} ${size}`}
    ></div>
  );
};

export default Spinner;
