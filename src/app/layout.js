// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Pokémon Explorer',
  description: 'Explore Pokémon using the PokeAPI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}