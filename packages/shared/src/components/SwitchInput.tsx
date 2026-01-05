import { UseFormRegister } from "react-hook-form";
import styles from "./SwitchInput.module.scss";

interface SwitchInputProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
}

const SwitchInput = ({ name, label, register }: SwitchInputProps) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" {...register(name)} />
      <span>{label}</span>
    </label>
  );
};

export default SwitchInput;
