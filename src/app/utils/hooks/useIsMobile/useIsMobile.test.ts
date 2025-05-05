import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "./";

describe("useIsMobile", () => {
  const resizeWindow = (width: number) => {
    (window.innerWidth as number) = width;
    window.dispatchEvent(new Event("resize"));
  };

  it("should return true if window width is less than the breakpoint", () => {
    resizeWindow(500);
    const { result } = renderHook(() => useIsMobile(768));
    expect(result.current).toBe(true);
  });

  it("should return false if window width is greater than or equal to the breakpoint", () => {
    resizeWindow(1024);
    const { result } = renderHook(() => useIsMobile(768));
    expect(result.current).toBe(false);
  });

  it("should update when window is resized", () => {
    resizeWindow(800);
    const { result } = renderHook(() => useIsMobile(768));
    expect(result.current).toBe(false);

    act(() => {
      resizeWindow(600);
    });

    expect(result.current).toBe(true);
  });
});
