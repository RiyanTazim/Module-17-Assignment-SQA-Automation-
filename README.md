# Module 17 Assignment: Saucedemo Automation

This project contains the automation test suite for [Saucedemo](https://www.saucedemo.com/) using **Playwright** and **JavaScript**.

## Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- Playwright dependencies

## Installation
1. Clone the repository.
2. Install the necessary dependencies:
   ```bash
   npm install

<!-- To run all test scenarios altogether in a sequential way, use: -->
   npx playwright test --workers=1

   <!-- To Run Specific Test Scenarios -->
   npx playwright test tests/saucedemo.spec.js  ----> for Q1
   npx playwright test tests/purchase.spec.js  ----> for Q2
   npx playwright test tests/performance.spec.js  ----> for Q3

   <!-- Generate the report: -->
   npx allure generate allure-results -o allure-report --clean

   <!-- Open the report in your browser: -->
   npx allure open allure-report