import AuthProvider from '@/context/AuthContext';
import { Roboto_Slab } from 'next/font/google';
import './globals.css';

const roboto_Slab = Roboto_Slab({ subsets: ['latin'] });

export const metadata = {
  title: 'DevTeam',
  description: 'Developer Team',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto_Slab.className} container mx-auto`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}