import {container} from "../Container/Container.module.css"

export function Container({ children }) {
  return <div className={container}>{children}</div>;
}
