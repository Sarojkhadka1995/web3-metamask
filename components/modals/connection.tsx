import { useState } from "react";
import Link from "next/link";

import { Modal } from "react-bootstrap";

//Hooks
import { hooks, metaMask } from "../../connector/metaMask";

//Components
import ConnectButton from "../connectButton";

const ConnectionModal = () => {
  const { useIsActivating, useIsActive } = hooks;
  const isActivating = useIsActivating();
  const isActive = useIsActive();

  //State
  const [error, setError] = useState<Error | undefined>(undefined);
  return (
    <Modal show={true} backdrop="static" centered>
      <Modal.Header className="align-items-start">
        <h4>Connect to your wallet</h4>
      </Modal.Header>
      <Modal.Body>
        {error ? (
          <>
            {error?.name === "NoMetaMaskError" ? (
              <span>
                MetaMask not installed, please visit this link to add MetaMask{" "}
                <Link href="https://metamask.io/" target="_blank">
                  https://metamask.io/
                </Link>
              </span>
            ) : (
              <>
                {error?.name ?? "Error"}
                {error?.message ? `: ${error?.message}` : null}
              </>
            )}
          </>
        ) : (
          <span>
            You are not connected to Metamask. Please connect to your wallet
          </span>
        )}
      </Modal.Body>
      <Modal.Footer>
        {isActivating ? (
          <span>Connecting</span>
        ) : isActive ? (
          <span>Connected</span>
        ) : (
          <ConnectButton
            connector={metaMask}
            isActivating={isActivating}
            isActive={isActive}
            error={error}
            setError={setError}
          />
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ConnectionModal;
