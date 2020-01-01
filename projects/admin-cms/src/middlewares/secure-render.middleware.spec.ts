import { SecureRenderMiddleware } from "./secure-render.middleware";

describe("SecureRenderMiddleware", () => {
  it("should be defined", () => {
    expect(new SecureRenderMiddleware()).toBeDefined();
  });
});
