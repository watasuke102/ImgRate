import './global.css';

export const metadata = {
  title: 'ImGrate',
  description: 'Image gallery',
};

export default function RootLayout({children}: {children: React.ReactNode}): JSX.Element {
  return (
    <html lang='ja'>
      <body>{children}</body>
    </html>
  );
}
