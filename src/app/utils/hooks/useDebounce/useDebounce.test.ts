import { renderHook, act } from "@testing-library/react";
import { useDebounce } from ".";
import { vi } from "vitest";

describe("useDebounce", () => {
  it("should return the debounced value after the delay", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "search text", delay: 300 },
      }
    );

    expect(result.current).toBe("search text");

    act(() => {
      rerender({ value: "updated", delay: 300 });
    });

    expect(result.current).toBe("search text");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("updated");

    vi.useRealTimers();
  });
});
