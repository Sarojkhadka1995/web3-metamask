import { useState } from "react";

//styles
import styles from "./convertor.module.scss";

type Label = "Nep" | "Busd";

const Convertor = () => {
  //States
  const [nep, setNep] = useState<string>("");
  const [busd, setBusd] = useState<string>("");
  /**
   * Functions
   */
  const convert = (e: React.ChangeEvent<HTMLInputElement>, type: Label) => {
    if (e.target.validity.valid) {
      if (type === "Nep") {
        const nep = e.target.value;
        setNep(nep);
        setBusd((Number(nep) * 3).toFixed(2));
      } else {
        const busd = e.target.value;
        setBusd(busd);
        setNep((Number(busd) / 3).toFixed(2));
      }
    }
  };

  return (
    <div className={`${styles.card}`}>
      <div className="card-body">
        <h4 className={styles.card_title}>Conversion tool</h4>
        <label className={`${styles.form_label} control-label`}>Nep</label>
        <input
          type="text"
          pattern="^\d*\.?\d*$"
          value={nep}
          className={styles.form_control}
          onChange={(e) => convert(e, "Nep")}
        />
        <label className={`${styles.form_label} control-label`}>Busd</label>
        <input
          type="text"
          pattern="^\d*\.?\d*$"
          value={busd}
          className={styles.form_control}
          onChange={(e) => convert(e, "Busd")}
        />
      </div>
    </div>
  );
};

export default Convertor;
