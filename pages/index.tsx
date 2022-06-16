import type { NextPage } from "next";
import CoinSwap from "../components/coinSwap/CoinSwap";
import Container from "../components/Container";
import { MoralisProvider } from "react-moralis";
import Header from "../components/header/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import CryptoTableContainer from "../components/cryptoTable/CryptoTableContainer";

const styles = {
  main: "h-full flex items-center justify-evenly bg-emerald-500",
};

const Home: NextPage = () => {
  const appId = process.env.APP_ID ?? "";
  const serverUrl = process.env.SERVER_URL ?? "";
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MoralisProvider appId={appId} serverUrl={serverUrl}>
        <div className="h-screen flex flex-col">
          <Header />
          <Container styles={styles.main}>
            <CryptoTableContainer />
            <CoinSwap />
          </Container>
        </div>
      </MoralisProvider>
    </QueryClientProvider>
  );
};

export default Home;
