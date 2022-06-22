import type { NextPage } from "next";
import CoinSwap from "../components/coinSwap/CoinSwap";
import Container from "../components/hoc/Container";
import { MoralisProvider } from "react-moralis";
import Header from "../components/header/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import CryptoTableContainer from "../components/cryptoTable/CryptoTableContainer";
import Tabs from "../components/Tabs";
import { useState } from "react";

const styles = {
  main: "flex flex-col min-h-screen",
  container: "h-full flex items-center justify-evenly bg-emerald-300 grow",
};

const tabs = ["Swap", "Dashboard"];

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const appId = process.env.APP_ID ?? "";
  const serverUrl = process.env.SERVER_URL ?? "";
  const queryClient = new QueryClient();

  const tabClickHandler = (tabName: string): void => {
    setActiveTab(tabName);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <MoralisProvider appId={appId} serverUrl={serverUrl}>
        <div className={styles.main}>
          <Header />
          <Tabs tabClickHandler={tabClickHandler} activeTab={activeTab} tabsArray={tabs} />
          <Container styles={styles.container}>
            {activeTab === tabs[0] ? <CoinSwap /> : <CryptoTableContainer />}
          </Container>
        </div>
      </MoralisProvider>
    </QueryClientProvider>
  );
};

export default Home;
