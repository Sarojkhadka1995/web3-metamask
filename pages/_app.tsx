import type { AppProps } from "next/app";
import type { MetaMask } from "@web3-react/metamask";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
//Hooks
import { hooks as metaMaskHooks, metaMask } from "../connector/metaMask";
//Styles
import "@/styles/globals.scss";

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]];

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}
