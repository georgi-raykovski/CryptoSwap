import { useMoralis } from "react-moralis";
import { IComponent } from "../interfaces";
import { buttonStyles } from "../styles";

const styles = {
  button: buttonStyles.header,
  buttonContainer: "items-center flex-shrink-0 lg:flex",
};

interface IAuthStepProps extends IComponent {
  clickHandler: () => void;
  buttonText: string;
}

const AuthStep = ({ clickHandler, buttonText }: IAuthStepProps) => {
    const { authError } = useMoralis();

  return (
    <div className={styles.buttonContainer}>
      {authError && (
        <div>
          <span>{authError.name}</span>
          {authError.message}
        </div>
      )}
      <button onClick={clickHandler} className={styles.button}>
        {buttonText}
      </button>
    </div>
  );
};

export default AuthStep;
