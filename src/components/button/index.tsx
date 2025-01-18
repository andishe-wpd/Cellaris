const sizes = {
  sm32: 'py-[8px] px-[12px] rounded-[8px] text-[12px]h-[32px]',
  me40: 'py-[8px] px-[16px] rounded-[8px] text-[14px] h-[40px]',
  lg48: 'py-[12px] px-[24px] rounded-[8px] text-[16px] h-[48px]',
  xl56: 'py-[16px] px-[32px] rounded-[8px] text-[18px] font-medium h-[56px]',
  lg48full: 'py-[12px] px-[24px] rounded-[8px] text-[16px] h-[48px] w-full',
};

const colors = {
  primaryFilled:
    'bg-primary-500 text-white hover:bg-primary-700 hover:text-white border border-solid border-primary-500 hover:border-primary-700 disabled:text-white disabled:bg-primary-200 disabled:border-primary-200 box-border',
  primaryOutline:
    'bg-white text-primary-500 hover:bg-primary-50 hover:text-primary-700 border border-solid border-primary-500 hover:border-primary-700 disabled:text-primary-200 disabled:bg-white box-border',
  primaryFlat:
    'bg-primary-50 text-primary-500 hover:bg-primary-100 hover:text-primary-700 border border-solid border-primary-50 hover:border-primary-100 disabled:text-primary-200 disabled:bg-primary-50 disabled:border-primary-50 box-border',
  primaryNoBackground:
    'bg-transparent text-primary-500 hover:bg-primary-50 hover:text-primary-700 border border-solid border-transparent hover:border-primary-50 disabled:text-primary-200 disabled:bg-transparent disabled:border-transparent box-border',
  redFilled:
    'bg-error-500 text-white hover:bg-error-600 hover:text-white border border-solid border-error-500 hover:border-error-600 disabled:text-error-50 disabled:bg-error-200 disabled:border-error-200 box-border',
  redOutline:
    'bg-white text-error-500 hover:bg-error-50 hover:text-error-600 border border-solid border-error-500 hover:border-error-600 disabled:text-error-200 disabled:border-error-200 disabled:bg-white box-border',
  redFlat:
    'bg-error-50 text-error-500 hover:bg-error-100 hover:text-error-600 border border-solid border-error-50 hover:border-error-100 disabled:text-error-200 disabled:bg-error-50 disabled:border-error-50 box-border',
  redNoBackground:
    'bg-transparent text-error-500 hover:bg-error-50 hover:text-error-600 border border-solid border-transparent hover:border-error-50 disabled:text-error-200 disabled:bg-transparent disabled:border-transparent box-border',
};

type ButtonType = {
  children?: any;
  icon?: any;
  className:
    | 'primaryFilled'
    | 'primaryOutline'
    | 'primaryFlat'
    | 'primaryNoBackground'
    | 'redFilled'
    | 'redOutline'
    | 'redFlat'
    | 'redNoBackground';
  size: 'sm32' | 'me40' | 'lg48' | 'xl56' | 'lg48full';
  loading?: boolean;
  disabled?: boolean;
  [key: string]: any;
  onClick?: any;
};

const Button = ({
  children,
  icon,
  className,
  size,
  loading,
  disabled = false,
  width,
  onClick,
  ...rest
}: ButtonType) => {
  return (
    <>
      <button
        className={`flex items-center justify-center gap-x-1 transition-all duration-200 ease-in whitespace-nowrap ${
          colors[className]
        } ${sizes[size]} ${disabled ? 'cursor-not-allowed opacity-50' : ''}
                ${
                  !children && icon && size === 'xl56'
                    ? '!px-[12px] !py-[12px]'
                    : !children && icon && size === 'lg48'
                      ? '!px-[12px] !py-[12px]'
                      : !children && icon && size === 'me40'
                        ? '!px-[10px] !py-[10px]'
                        : !children && icon && size === 'sm32'
                          ? '!px-[8px] !py-[8px]'
                          : null
                } w-[${width}]`}
        disabled={disabled}
        {...rest}
        onClick={onClick}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-x-1">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
          </div>
        ) : (
          icon && icon
        )}
        {children && children}
      </button>
    </>
  );
};

export default Button;
