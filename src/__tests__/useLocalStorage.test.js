import { renderHook, act } from "@testing-library/react";
import useLocalStorage from "../lib/useLocalStorage.js";

describe("useLocalStorage", () => {
  it("retourne la valeur initiale quand le storage est vide", () => {
    const { result } = renderHook(() => useLocalStorage("test:key", 42));
    expect(result.current[0]).toBe(42);
  });

  it("persiste la nouvelle valeur", () => {
    const { result } = renderHook(() => useLocalStorage("test:key2", 0));
    act(() => result.current[1](123));
    const stored = JSON.parse(localStorage.getItem("test:key2"));
    expect(stored).toBe(123);
  });
});