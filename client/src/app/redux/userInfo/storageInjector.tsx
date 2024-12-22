"use client";
import { Provider } from "react-redux";
import store from "../storage";
interface ProviderInjectProps {
  children: React.ReactNode;
}
export function ProviderInjector(props: ProviderInjectProps) {
  return <Provider store={store}>{props.children}</Provider>;
}
