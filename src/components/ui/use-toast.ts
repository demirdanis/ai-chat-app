"use client";

import * as React from "react";

import type { ToastProps } from "@radix-ui/react-toast";

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

const TOAST_LIMIT = 1;

type State = {
  toasts: ToasterToast[];
};

type Action =
  | { type: "ADD_TOAST"; toast: ToasterToast }
  | {
      type: "UPDATE_TOAST";
      toast: Partial<ToasterToast> & Pick<ToasterToast, "id">;
    }
  | { type: "DISMISS_TOAST"; toastId: string };

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

const emit = () => {
  listeners.forEach((l) => l(memoryState));
};

const dispatch = (action: Action) => {
  switch (action.type) {
    case "ADD_TOAST": {
      memoryState = {
        ...memoryState,
        toasts: [action.toast, ...memoryState.toasts].slice(0, TOAST_LIMIT),
      };
      emit();
      return;
    }

    case "UPDATE_TOAST": {
      memoryState = {
        ...memoryState,
        toasts: memoryState.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
      emit();
      return;
    }

    case "DISMISS_TOAST": {
      memoryState = {
        ...memoryState,
        toasts: memoryState.toasts.filter((t) => t.id !== action.toastId),
      };
      emit();
      return;
    }
  }
};

let count = 0;

const genId = () => {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
};

const toast = (props: Omit<ToasterToast, "id">) => {
  const id = genId();

  dispatch({
    type: "ADD_TOAST",
    toast: { ...props, id },
  });

  return {
    id,
    dismiss: () => dispatch({ type: "DISMISS_TOAST", toastId: id }),
    update: (next: Partial<Omit<ToasterToast, "id">>) =>
      dispatch({ type: "UPDATE_TOAST", toast: { id, ...next } }),
  };
};

const useToast = () => {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast,
  };
};

export { useToast, toast };
