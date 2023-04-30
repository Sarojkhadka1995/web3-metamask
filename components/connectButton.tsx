import type { Web3ReactHooks } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { FC } from "react";
import { Button } from "react-bootstrap";

interface ConnectButton {
  connector: MetaMask;
  isActivating?: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive?: ReturnType<Web3ReactHooks["useIsActive"]>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
}

const ConnectButton: FC<ConnectButton> = ({
  connector,
  isActivating,
  isActive,
  error,
  setError,
}) => {
  /**
   * Conection function
   */
  const connect = async () => {
    try {
      await connector.activate();
      setError(undefined);
    } catch (error) {
      setError(error as Error | undefined);
    }
  };

  const disconnect = async () => {
    if (connector?.deactivate) {
      await connector.deactivate();
    } else {
      await connector.resetState();
    }
  };

  return (
    <div>
      <div />
      {isActive ? (
        error ? (
          <Button onClick={connect}>Try again?</Button>
        ) : (
          <Button onClick={disconnect}>Disconnect</Button>
        )
      ) : (
        <Button
          onClick={connect}
          disabled={isActivating || error?.name === "NoMetaMaskError"}
        >
          {error ? "Try again" : "Connect"}
        </Button>
      )}
    </div>
  );
};

export default ConnectButton;
