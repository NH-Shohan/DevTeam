import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Routes({ name, path }) {
  const pathname = usePathname();
  return (
    <Link
      href={path ? path : ''}
      className={`hover:bg-[#3333bd44] hover:font-bold text-light hover:text-white w-full py-3 rounded-lg small text-left pl-4 transition-all ${
        pathname === path && 'active'
      }`}
    >
      <button>{name}</button>
    </Link>
  );
}

export default Routes;
