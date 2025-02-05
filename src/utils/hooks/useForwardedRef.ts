import { Ref, useImperativeHandle, useRef } from "react";

export function useForwardedRef<T>(ref?: Ref<T>) {
  const innerRef = useRef<T>(null);

  useImperativeHandle(ref, () => innerRef.current!, []);

  return innerRef;
}
