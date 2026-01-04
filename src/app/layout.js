import { Chivo } from "next/font/google";
import Menu from "@components/structure/Menu/Menu";
import SmoothScroll from "@components/structure/SmoothScroll/SmoothScroll";
import StoryblokProvider from "@components/StoryblokProvider";
import "../styles/globals.scss";
import "lenis/dist/lenis.css";

const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wustavo Quiroga",
  description: "Investigador y curador de diseño y arte latinoamericano",
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon.ico' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png' }
    ],
    other: [
      { rel: 'android-chrome', url: '/favicon/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'android-chrome', url: '/favicon/android-chrome-512x512.png', sizes: '512x512' }
    ]
  },
  manifest: '/favicon/site.webmanifest'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={chivo.variable}>
        <StoryblokProvider>
          <SmoothScroll>
            <Menu />
            {children}
          </SmoothScroll>
        </StoryblokProvider>
      </body>
    </html>
  );
}
