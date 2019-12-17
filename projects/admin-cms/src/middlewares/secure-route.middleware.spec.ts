import { SecureRouteMiddleware } from "./secure-route.middleware";

describe("SecureRouteMiddleware", () => {
  it("should be defined", () => {
    expect(new SecureRouteMiddleware()).toBeDefined();
  });
});
