import { listArticles } from './articles';

const articlesData = [
  {
    author: null,
    authorId: null,
    content: "a",
    id: 1,
    regions: [
      {
        articles_regions: {
          articleId: 1,
          createdAt: "2022-02-10T11:59:13.215Z",
          regionId: 2,
          updatedAt: "2022-02-10T11:59:13.215Z",
        },
        code: "UK",
        id: 2,
        name: "United Kingdom",
      },
    ],
    title: "a",
  },
];

describe("request all articles", () => {
  it("should return status code 200 and a defined body as response", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            status: 200,
            data: articlesData,
          }),
      })
    );
    
    const result = await listArticles();
    expect(result).toBe(articlesData);
  });

  it("should catch error", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            status: 500,
          }),
      })
    );

    const result = await listArticles();

    expect(result).not.toBeDefined();
  });
});