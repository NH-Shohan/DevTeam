import AuthProvider from '@/context/AuthContext';
import { Chakra_Petch, Exo, Glegoo, K2D, Overlock_SC, Quicksand, Thasadith, Tomorrow } from 'next/font/google';
import './globals.css';

const glegoo = Glegoo({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'DevTeam',
  description: 'Developer Team',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${glegoo.className} container mx-auto`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
