import { Glegoo } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const glegoo = Glegoo({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'DevTeam',
  description: 'Developer Team',
};

export default function RootLayout(props) {
  return (
    <html lang="en">
      <body className={`${glegoo.className} container mx-auto`}>
        <ToastContainer />
        <AuthProvider
          admin={props.admin}
          programmer={props.programmer}
          company={props.company}
          recruiter={props.recruiter}
        >
          {props.children}
        </AuthProvider>
      </body>
    </html>
  );
}
