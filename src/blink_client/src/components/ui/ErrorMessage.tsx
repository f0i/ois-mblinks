export const ErrorMessage = ({
  error,
  setError,
  className,
}: {
  error: any;
  setError: (error: any) => void;
  className?: string;
}) => {
  if (!error) return null;
  return (
    <div
      className={
        "w-full border-2 rounded-sm p-4 mt-1 border-red-500 text-red-500 text-wrap relative " +
        className
      }
      onClick={() => setError(null)}
    >
      <button className="absolute right-1 top-1 border-[1px] border-gray-500 text-gray-500 w-[1.6em] h-[1.6em] text-center text-sm rounded-full">
        x
      </button>
      {error}
    </div>
  );
};
