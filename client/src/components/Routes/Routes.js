import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Routes({ name, path }) {
  const pathname = usePathname();
  return (
    <Link
      href={path ? path : ''}
      className={`hover:bg-light hover:font-bold text-gray-light hover:text-black w-full py-2 rounded-lg small text-left pl-4 transition-all ${
        pathname === path && 'active'
      }`}
    >
      <button>{name}</button>
    </Link>
  );
}

export default Routes;
