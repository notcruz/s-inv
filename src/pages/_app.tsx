import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
  const domain = "dev-gvkv4t58.us.auth0.com";
  const id = "dbds27LFNBtoGC3hlInNkelOxaBweee4";
  const redirect = "http://localhost:3000/home";

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
