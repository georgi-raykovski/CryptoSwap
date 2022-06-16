import { IComponent } from "./interfaces";

interface IMainProps extends IComponent {
  children: React.ReactNode;
}

const Container = ({ children, styles }: IMainProps) => {
  return <div className={styles}>{children}</div>;
};

export default Container;
