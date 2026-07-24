const analyzePage = require("../services/pageAnalyzer");

describe("Page Analyzer", () => {

  test("Should analyze a valid URL", async () => {
    const result = await analyzePage("https://example.com");

    expect(result.status).toBe(200);
    expect(result.title).toBeDefined();
  });

  test("Should reject invalid URL", async () => {
    await expect(
      analyzePage("invalid-url")
    ).rejects.toThrow();
  });

});