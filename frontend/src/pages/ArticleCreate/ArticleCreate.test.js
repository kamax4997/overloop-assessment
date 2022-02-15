import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArticleCreate from './ArticleCreate';
import api from '../../utils/api';
import { createArticle } from '../../services/articles';

const response = {
  author: null,
  authorId: null,
  content: "Content",
  id: 13,
  regions: [],
  title: "Article",
}

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../../services/articles");

describe("ArticleCreate component", () => {
  it("shows all required input fields with empty values", () => {
    const { getByTestId } = render(
      <ArticleCreate />
    );

    expect(getByTestId("article-title").value).toBe("");
    expect(getByTestId("article-content").value).toBe("");

    expect(screen.getByText(/Regions/i)).toBeTruthy();
    expect(screen.getByText(/Author/i)).toBeTruthy();
  });

  it("submit form", () => {
    const mockTitle = 'Article';
    const mockContent = 'Content';
    const { getByTestId } = render(<ArticleCreate />);
    const titleInputNode = getByTestId("article-title");
    const contentInputNode = getByTestId("article-content");
    const submitButtonNode = getByTestId("article-save");

    fireEvent.change(titleInputNode, { target: { value: mockTitle }});
    fireEvent.change(contentInputNode, { target: { value: mockContent }});
    fireEvent.click(submitButtonNode);

    expect(createArticle).toHaveBeenCalledTimes(1);
  });
});
