import { ForwardedRef, useImperativeHandle, useRef } from "react";

export function useForwardedRef<T>(ref: ForwardedRef<T>) {
  const innerRef = useRef<T>(null);

  useImperativeHandle(ref, () => innerRef.current!, []);

  return innerRef;
}
