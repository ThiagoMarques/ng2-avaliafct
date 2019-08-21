// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("karma-sonarqube-unit-reporter"),
      require("@angular-devkit/build-angular/plugins/karma")
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "../coverage/quickstart-angular"),
      reports: ["html", "lcovonly", "text-summary", "cobertura"],
      fixWebpackSourcePaths: true,
      // Defini os valores padrões da cobertura de testes
      thresholds: {
        statements: 30,
        branches: 30,
        functions: 30,
        lines: 30
      }
    },
    reporters: ["progress", "kjhtml", "sonarqubeUnit"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // browsers: ['Chrome', 'ChromeHeadless', 'Chrome_without_security'],
    browsers: ["Chrome", "ChromeHeadless", "ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu", "--headless"]
      },
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
      }
    },
    sonarQubeUnitReporter: {
      sonarQubeVersion: "6.7.3",
      outputFile: "../coverage/quickstart-angular/tests-report.xml",
      overrideTestDescription: true,
      testPaths: ["./src/app"],
      testFilePattern: ".spec.ts",
      useBrowserName: false
    },
    singleRun: false
  });
};
