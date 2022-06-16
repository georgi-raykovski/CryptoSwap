import type { NextPage } from "next";
import CoinSwap from "../components/CoinSwap";
import Container from "../components/Container";
import { MoralisProvider } from "react-moralis";
import Header from "../components/header/Header";
import { QueryClient, QueryClientProvider } from "react-query";

const styles = {
  main: "h-full flex flex-col items-center justify-center bg-emerald-500",
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
            <CoinSwap />
          </Container>
        </div>
      </MoralisProvider>
    </QueryClientProvider>
  );
};

export default Home;
