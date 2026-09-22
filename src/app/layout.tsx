import "./globals.css";
import Providers from '@/components/providers/Providers';

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html className="bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 font-inter">
      <body className="min-h-full">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}