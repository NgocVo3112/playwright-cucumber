const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "Playwright Automation Report",
    pageTitle: "MarsAir test report",
    displayDuration: false,
    metadata: {
        browser: {
            name: "chrome",
            version: "114",
        },
        device: "Ruby - PC",
        platform: {
            name: "MACOS",
            version: "10",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "MarsAir test report" },
            { label: "Release", value: "1.2.3" },
            { label: "Cycle", value: "Smoke-1" }
        ],
    },
});