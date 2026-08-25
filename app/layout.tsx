import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sawriya Seth Properties (SS Properties) | Ronak Khatik',
  description:
    'Sawriya Seth Properties (SS Properties) — Trusted local real estate consulting led by Ronak Khatik specializing in residential plots, commercial land, and farmhouses across Debari, Nathdwara, Daroli, Navaniya, Dabok, and Mavli.',
  keywords: [
    'Sawriya Seth Properties',
    'SS Properties',
    'Ronak Khatik',
    'Real Estate Consultant Debari',
    'Plots in Dabok',
    'Commercial Land Nathdwara',
    'Daroli Land',
    'Navaniya Plots',
    'Mavli Real Estate',
    'Udaipur Property',
  ],
  authors: [{ name: 'Ronak Khatik' }],
  openGraph: {
    title: 'Sawriya Seth Properties (SS Properties)',
    description:
      'Find premium plots, commercial property, and agricultural land in Debari, Nathdwara, Daroli, Navaniya, Dabok, and Mavli with Sawriya Seth Properties.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-brand-cream text-gray-900 min-h-screen flex flex-col antialiased selection:bg-brand-gold selection:text-white">
        {children}
      </body>
    </html>
  );
}
