import { metadata } from './metadata';
import '../styles/globals.scss';
import SearchBar from '../components/SearchBar/SearchBar';
import ThemeSelector from '../components/ThemeSelector/ThemeSelector';
import Wrapper from '../components/Wrapper/Wrapper';

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
        <Wrapper>
        <div id="root">
          <header className="header">
            <SearchBar />
            <ThemeSelector />
          </header>
          <main>
            {children}
          </main>
          </div>
          </Wrapper>
      </body>
    </html>
  );
}
