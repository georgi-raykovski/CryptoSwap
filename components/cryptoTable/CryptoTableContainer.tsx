import { useMemo, useState } from "react";
import CryptoTable from "./CryptoTable";
import { buttonStyles } from "../styles";

const CryptoTableContainer = () => {
  const [tableIsVisible, setTableIsVisible] = useState<boolean>(false);

  const toggleTableVisiblity = () => setTableIsVisible((prevState) => !prevState);
  const buttonText = useMemo(
    () => (tableIsVisible ? "Hide Table" : "Show Table"),
    [tableIsVisible]
  );

  return (
    <div className="flex flex-col items-center w-3/6">
      {tableIsVisible && <CryptoTable />}
      <button onClick={toggleTableVisiblity} className={`${buttonStyles.header}`}>
        {buttonText}
      </button>
    </div>
  );
};

export default CryptoTableContainer;
