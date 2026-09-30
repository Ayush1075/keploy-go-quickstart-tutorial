// Single source for links and facts used across the layout.
export const siteConfig = {
  title: "Record, Replay, Relax: API Testing a Go App with Keploy",
  shortTitle: "Keploy × Go quickstart",
  description:
    "A beginner-friendly walkthrough of Keploy's Gin + MongoDB quickstart: record real API traffic, turn it into tests and mocks, and catch regressions.",
  author: "Ayush",
  repo: "https://github.com/Ayush1075/keploy-go-quickstart-tutorial",
  keployDocs: "https://keploy.io/docs/",
  quickstart: "https://keploy.io/docs/quickstart/samples-gin/",
  samplesRepo: "https://github.com/keploy/samples-go/tree/main/gin-mongo",
  // The environment the tutorial was actually run in.
  verified: {
    date: "30 Sep 2026",
    keploy: "3.6.82 (open source)",
    go: "1.27.1",
    os: "Ubuntu 24.04 on WSL 2",
    docker: "29.2.1",
  },
};
