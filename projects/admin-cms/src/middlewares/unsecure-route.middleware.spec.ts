import { UnsecureRouteMiddleware } from "./unsecure-route.middleware";

describe("UnsecureRouteMiddleware", () => {
  it("should be defined", () => {
    expect(new UnsecureRouteMiddleware()).toBeDefined();
  });
});
