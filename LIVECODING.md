# Live Coding - API & Mobile Test Automation

## Prerequisites

- Node.js (v18+)
- Android Emulator or physical device (connected via ADB)
- Appium (`npm install -g appium`)
- UiAutomator2 driver (`appium driver install uiautomator2`)
- SauceLabs Demo APK (`mda-androidTest-2.2.0-25.apk`)

## Setup

```bash
npm install
```

## Scenario 1 — API: Contact List User CRUD

**API Docs:** https://documenter.getpostman.com/view/4012288/TzK2bEa8

**Test file:** `cypress/e2e/tests/2_api/contact-list-users.cy.js`

| Step | Endpoint | Validation |
|------|----------|------------|
| Add user | `POST /users` | 201, firstName/lastName/email match |
| Get user | `GET /users/me` | 200, created data matches |
| Update user | `PATCH /users/me` | 200, random firstName/lastName applied |
| Verify update | `GET /users/me` | 200, updated values match |
| Delete user | `DELETE /users/me` | 200 |
| Verify delete | `GET /users/me` | 401 |

### Run

```bash
npm run test:api
```

### Report

`cypress/reports/mocha/` (HTML)

---

## Scenario 2 — Mobile: SauceLabs Demo App

**App:** https://github.com/saucelabs/my-demo-app-android

**Test file:** `mobile/tests/saucelabs-demo.test.js`

### Run

1. Start Appium:

```bash
npx appium
```

2. Run the test (set `APP_PATH` to your APK location):

```bash
APP_PATH=<path-to-apk> npm run mobile:saucelabs
```

Example:

```bash
APP_PATH=~/Desktop/mda-androidTest-2.2.0-25.apk npm run mobile:saucelabs
```

### Report

`mobile/reports/` (HTML)

---

## Project Structure

```
cypress/
  e2e/tests/2_api/
    contact-list-users.cy.js    # API test
  support/commands/
    api_commands.js             # cy.apiGet, cy.apiPost, cy.apiPut, cy.apiDelete
mobile/
  config/
    wdio.saucelabs.config.js    # WDIO config for SauceLabs demo app
  pages/
    MobileBasePage.js           # Base class (waitForVisible, click, isDisplayed)
    saucelabs/
      SauceLabsBasePage.js      # App-specific base (APP_ID, this.id())
      CatalogPage.js            # Catalog locators & actions
      ProductDetailPage.js      # Detail page verification
      SidebarPage.js            # Sidebar menu navigation
      WebViewPage.js            # WebView URL input & context switch
      DrawingPage.js            # Drawing canvas & touch actions
  tests/
    saucelabs-demo.test.js      # Mobile test
```
