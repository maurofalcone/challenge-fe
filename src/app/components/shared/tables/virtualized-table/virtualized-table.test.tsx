import { render, screen, fireEvent } from "@testing-library/react";

import { ColumnDef } from "@tanstack/react-table";
import { vi, describe, it, expect } from "vitest";
import React, { PropsWithChildren } from "react";
import VirtualizedTable, { ROW_SIZE } from ".";

vi.mock("@/app/components/shared/icons/loaders/spinner", () => ({
  default: () => <div data-testid="spinner">Spinner</div>,
}));

vi.mock("@/app/components/shared/table/table-header", () => ({
  default: ({ children }: PropsWithChildren) => <span>{children}</span>,
}));

interface TestData {
  name: string;
  age: number;
}

const mockColumns: ColumnDef<TestData>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: (info) => info.getValue(),
  },
  {
    header: "Age",
    accessorKey: "age",
    cell: (info) => info.getValue(),
  },
];

const mockData: TestData[] = Array.from({ length: ROW_SIZE }, (_, i) => ({
  name: `User ${i + 1}`,
  age: 20 + i,
}));

describe("VirtualizedTable", () => {
  it("renders table headers and rows", () => {
    const onSortChange = vi.fn();

    const containerRef = {
      current: document.createElement("table"),
    };

    render(
      <VirtualizedTable
        data={mockData}
        columns={mockColumns}
        onSortChange={onSortChange}
        isLoading={false}
        isLoadingExtraData={false}
        containerRef={containerRef}
        sortingState={[]}
      />
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("calls onSortChange when sorting changes", () => {
    const onSortChange = vi.fn();

    const containerRef = {
      current: document.createElement("table"),
    };

    render(
      <VirtualizedTable
        data={mockData}
        columns={mockColumns}
        onSortChange={onSortChange}
        isLoading={false}
        isLoadingExtraData={false}
        containerRef={containerRef}
        sortingState={[]}
      />
    );

    const header = screen.getByText("Name");
    fireEvent.click(header);

    expect(onSortChange).toHaveBeenCalled();
  });

  it("renders loading message when isLoading is true", () => {
    const containerRef = {
      current: document.createElement("table"),
    };

    render(
      <VirtualizedTable
        data={[]}
        columns={mockColumns}
        onSortChange={vi.fn()}
        isLoading={true}
        containerRef={containerRef}
      />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders extra loader when isLoadingExtraData is true", () => {
    const containerRef = {
      current: document.createElement("table"),
    };

    render(
      <VirtualizedTable
        data={mockData}
        columns={mockColumns}
        onSortChange={vi.fn()}
        isLoading={false}
        isLoadingExtraData={true}
        containerRef={containerRef}
      />
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
