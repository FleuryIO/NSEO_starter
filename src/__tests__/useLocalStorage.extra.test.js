import { renderHook } from "@testing-library/react";
import useLocalStorage from "../lib/useLocalStorage.js";

describe("useLocalStorage invalid JSON", () => {
  it("retourne la valeur initiale si JSON invalide", () => {
    localStorage.setItem("broken:key", "{oops:");
    const { result } = renderHook(() => useLocalStorage("broken:key", "fallback"));
    expect(result.current[0]).toBe("fallback");
  });
});