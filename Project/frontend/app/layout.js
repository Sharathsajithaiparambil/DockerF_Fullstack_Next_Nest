import './globals.css';

export const metadata = {
  title: 'Product CRUD - Next.js + NestJS',
  description: 'A modern CRUD interface built with Next.js and NestJS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
