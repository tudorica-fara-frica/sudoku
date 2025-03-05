import "./globals.css";
import { Danfo, Gaegu } from "next/font/google";

export const _danfo = Danfo({
  subsets: ["latin"],
});

export const _gaegu = Gaegu({
  subsets: ["latin"],
  weight: "400",
});

export const danfo = _danfo.className;

export const gaegu = _gaegu.className;

export const metadata = {
  title: "~ S u d o k u ~",
  description: "sudoku game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased w-screen h-screen ${danfo} ${gaegu}`}>
        {children}
      </body>
    </html>
  );
}
