import { useContext } from "react";
import { AlertContext } from "../context/alertContext";

export default function useAlert() {
  const { alert, addAlert, removeAlert } = useContext(AlertContext);
  return { alert, addAlert, removeAlert };
}
