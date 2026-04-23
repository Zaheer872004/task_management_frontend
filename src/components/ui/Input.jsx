import classNames from 'classnames';

const Input = ({
  label,
  id,
  type = 'text',
  error,
  className,
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={classNames(
          'block w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-gray-600'
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default Input;
