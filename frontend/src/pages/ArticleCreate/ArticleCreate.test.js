import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import ArticleCreate from './ArticleCreate';

describe("ArticleCreate component", () => {
  it("shows all required input fields with empty values", () => {
    const { getByTestId } = render(
      <ArticleCreate />
    );

    expect(getByTestId("article-title").value).toBe("");
    expect(getByTestId("article-content").value).toBe("");
  });
});
