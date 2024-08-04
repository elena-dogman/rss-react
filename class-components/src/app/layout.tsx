import { metadata } from './metadata';
import '../styles/globals.scss';
import SearchBar from '../components/SearchBar/SearchBar';
import ThemeSelector from '../components/ThemeSelector/ThemeSelector';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <div id="root">
          <header className="header">
            <SearchBar />
            <ThemeSelector />
          </header>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
