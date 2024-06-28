import { RefObject, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLDivElement>,
  visible: boolean,
  setVisible: (val: boolean) => void,
  ignoreRefs: (RefObject<HTMLElement> | null)[] = []
) => {
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const target = event.target as Node;

      if (!ref.current) return;

      if (
        !visible ||
        ref.current.contains(target) ||
        ignoreRefs.some(
          (ignoreRef) =>
            ignoreRef?.current && ignoreRef.current.contains(target)
        )
      ) {
        return;
      }
      setVisible(false);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [ref, visible, setVisible, ignoreRefs]);
};
