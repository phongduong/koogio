import { UnsecureRenderMiddleware } from "./unsecure-render.middleware";

describe("UnsecureRenderMiddleware", () => {
  it("should be defined", () => {
    expect(new UnsecureRenderMiddleware()).toBeDefined();
  });
});
