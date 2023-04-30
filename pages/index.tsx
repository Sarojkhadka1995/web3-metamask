import { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "react-bootstrap";

//Hooks
import { hooks, metaMask } from "../connector/metaMask";

//Components
import Convertor from "@/components/card/convertor";
import ConnectionModal from "@/components/modals/connection";
import WalletDetails from "@/components/modals/walletDetails";

const Home = () => {
  const { useIsActive } = hooks;

  const isActive = useIsActive();

  //States
  const [isClient, setIsClient] = useState<boolean>(false);
  const [showWallet, setShowWallet] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    setShowWallet(false);
  }, [isActive]);

  useEffect(() => {
    void metaMask
      .connectEagerly()
      .then(() => {})
      .catch(() => {
        console.debug("Failed to connect eagerly to metamask");
      });
  }, []);

  return (
    <>
      <div className="center mt-5">
        <Image
          src="/images/neptune2.png"
          alt="Neptune"
          width="212"
          height="100"
        />
      </div>
      <div className="center mt-5">
        <Convertor />
      </div>
      {isClient && isActive && (
        <div className="center mt-3">
          <Button onClick={() => setShowWallet(true)}>View wallet</Button>
        </div>
      )}

      {isClient && !isActive && <ConnectionModal />}

      {showWallet && isClient && isActive && (
        <WalletDetails
          connector={metaMask}
          toggleWallet={setShowWallet}
          isActive={isActive}
        />
      )}
    </>
  );
};

export default Home;
