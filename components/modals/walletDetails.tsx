import { FC, useEffect, useState } from "react";
import type { Web3ReactHooks } from "@web3-react/core";
import type { BigNumber } from "@ethersproject/bignumber";
import { formatEther } from "@ethersproject/units";
import { MetaMask } from "@web3-react/metamask";

import { Modal } from "react-bootstrap";

//Hooks
import { hooks } from "../../connector/metaMask";

//Component
import ConnectButton from "../connectButton";

//Styles
import styles from "./walletDetails.module.scss";

const useBalances = (
  provider?: ReturnType<Web3ReactHooks["useProvider"]>,
  accounts?: string[]
): BigNumber[] | undefined => {
  const [balances, setBalances] = useState<BigNumber[] | undefined>();

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false;

      void Promise.all(
        accounts.map((account) => provider.getBalance(account))
      ).then((balances) => {
        if (stale) return;
        setBalances(balances);
      });

      return () => {
        stale = true;
        setBalances(undefined);
      };
    }
  }, [provider, accounts]);

  return balances;
};

interface WalletDetails {
  connector: MetaMask;
  toggleWallet: (arg0: boolean) => void;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
}

const WalletDetails: FC<WalletDetails> = ({
  connector,
  toggleWallet,
  isActive,
}) => {
  const { useProvider, useAccounts } = hooks;

  const accounts = useAccounts();
  const provider = useProvider();

  const balances = useBalances(provider, accounts);

  const [error, setError] = useState<Error | undefined>(undefined);

  if (accounts === undefined) return null;

  return (
    <Modal
      show={true}
      backdrop="static"
      centered
      onHide={() => toggleWallet(false)}
    >
      <Modal.Header closeButton className="align-items-start">
        <h4>Wallet details</h4>
      </Modal.Header>

      <Modal.Body>
        <div className={styles.AccountTable}>
          <table className={styles.AccountTable_table}>
            <thead>
              <tr>
                <th>Account</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {accounts.length === 0 ? (
                <tr>
                  <td colSpan={2}>None</td>
                </tr>
              ) : (
                accounts.map((account, i) => (
                  <tr key={account}>
                    <td>{account}</td>
                    <td>
                      {balances?.[i] ? `${formatEther(balances[i])}` : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <ConnectButton
          connector={connector}
          isActive={isActive}
          error={error}
          setError={setError}
        />
        {error && <span className={styles.ErrorMessage}>{error?.message}</span>}
      </Modal.Footer>
    </Modal>
  );
};

export default WalletDetails;
