import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import AuthorDropdown from './AuthorDropdown';

describe("AuthorDropdown component", () => {
  const mockOnChange = jest.fn();
  const mockValue = 0;

  it("render", () => {
    const { getByTestId } = render(
      <AuthorDropdown value={mockValue} onChange={mockOnChange} />
    );

    expect(getByTestId("author-dropdown")).toBeInTheDocument();
  });

  it("triggers event handler on dropdown change of author", () => {
    const changedValue = 1;
    const { getByTestId, rerender } = render(
      <AuthorDropdown
        value={mockValue}
        onChange={mockOnChange}
      />
    );

    act(() => {
      fireEvent.change(getByTestId("author-dropdown"), {
        target: { value: 1 },
      });
    });

    rerender(
      <AuthorDropdown
        value={changedValue}
        onChange={mockOnChange}
      />
    );

    expect(getByTestId("author-dropdown").value).toBe(1);
    expect(mockOnChange).toBeCalledTimes(1);
  });
});
