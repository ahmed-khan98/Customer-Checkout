import './globals.css';

export const metadata = {
  title: 'CRM Payment Link',
  description: 'Secure payment experience for CRM payment links',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
