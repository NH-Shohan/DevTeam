import { BsCartPlus } from 'react-icons/bs';

export default function Button({
  text,
  className,
  outline,
  fill,
  onClick,
  icon,
}) {
  return (
    <button
      onClick={onClick}
      className={
        outline
          ? `border border-gray bg-white py-2 px-8 rounded-lg hover:bg-gray hover:text-white transition-all flex items-center justify-center gap-2 w-full ${className}`
          : fill &&
            `border border-blue py-2 px-8 rounded-lg bg-blue hover:bg-secondary transition-all text-white flex justify-center items-center w-full ${className}`
      }
    >
      {icon && <BsCartPlus className="w-[22px] h-[22px]" />}
      {text}
    </button>
  );
}
