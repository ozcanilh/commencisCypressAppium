# commencis-cypress-automation

## Live Coding — API & Mobile Test Automation

### Prerequisites

- Node.js (v18+)
- Android Emulator or physical device (connected via ADB)
- Appium (`npm install -g appium`)
- UiAutomator2 driver (`appium driver install uiautomator2`)
- SauceLabs Demo APK (`mda-androidTest-2.2.0-25.apk`)

### Setup

```bash
npm install
```

### Scenario 1 — API: Contact List User CRUD

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

**Run:**

```bash
npm run test:api
```

**Report:** `cypress/reports/mocha/` (HTML)

### Scenario 2 — Mobile: SauceLabs Demo App

**App:** https://github.com/saucelabs/my-demo-app-android

**Test file:** `mobile/tests/saucelabs-demo.test.js`

**Run:**

1. Start Appium:

```bash
npx appium
```

2. Run the test:

```bash
APP_PATH=<path-to-apk> npm run mobile:saucelabs
```

Example:

```bash
APP_PATH=~/Desktop/mda-androidTest-2.2.0-25.apk npm run mobile:saucelabs
```

**Report:** `mobile/reports/` (HTML)

### Live Coding Project Structure

```
cypress/
  e2e/tests/2_api/
    contact-list-users.cy.js      # API test
  support/commands/
    api_commands.js               # cy.apiGet, cy.apiPost, cy.apiPut, cy.apiDelete
mobile/
  config/
    wdio.saucelabs.config.js      # WDIO config for SauceLabs demo app
  pages/
    MobileBasePage.js             # Base class (waitForVisible, click, isDisplayed)
    saucelabs/
      SauceLabsBasePage.js        # App-specific base (APP_ID, this.id())
      CatalogPage.js              # Catalog locators & actions
      ProductDetailPage.js        # Detail page verification
      SidebarPage.js              # Sidebar menu navigation
      WebViewPage.js              # WebView URL input & context switch
      DrawingPage.js              # Drawing canvas & touch actions
  tests/
    saucelabs-demo.test.js        # Mobile test
```

---------------------------------------------------------

## Web & Mobile Automation (Existing)

### Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | 20+ | `node -v` |
| npm | 9+ | `npm -v` |
| Chrome | Latest | For web tests |
| Appium | 2.x | `appium -v` |
| UiAutomator2 driver | Latest | `appium driver list --installed` |
| Android SDK / ADB | API 33+ | `adb --version` |
| Android Emulator | API 33+ | Running before mobile tests |
| Hepsiburada APK | 5.85.x | 64-bit variant from [apkpure.com](https://apkpure.com/hepsiburada-online-shopping/com.pozitron.hepsiburada/download) |

### Full Project Structure

```
commencis-cypress-automation/
├── case1-test-cases.md              # Case 1: Contact form test cases
├── cypress.config.js                # Cypress configuration + Mochawesome reporter
├── package.json
├── .gitignore
├── .prettierrc
├── .prettierignore
├── .husky/pre-commit
├── LIVECODING.md
├── .github/workflows/
│   └── test-pipeline.yml            # GitHub Actions CI/CD pipeline
├── cypress/
│   ├── e2e/
│   │   ├── pages/
│   │   │   └── 1_techcrunch/
│   │   │       ├── homePage.js
│   │   │       └── articlePage.js
│   │   └── tests/
│   │       ├── 1_techcrunch/
│   │       │   └── techcrunch.cy.js
│   │       └── 2_api/
│   │           ├── api-example.cy.js
│   │           └── contact-list-users.cy.js
│   ├── support/
│   │   ├── e2e.js
│   │   └── commands/
│   │       ├── general_commands.js
│   │       ├── techcrunch_commands.js
│   │       └── api_commands.js
│   ├── utils/
│   │   └── SlackNotifier.js
│   └── reports/                     # Generated reports (gitignored)
├── mobile/
│   ├── tests/
│   │   ├── hepsiburada.test.js
│   │   └── saucelabs-demo.test.js
│   ├── pages/
│   │   ├── MobileBasePage.js
│   │   ├── hepsiburada/
│   │   │   ├── MainPage.js
│   │   │   ├── SearchResultsPage.js
│   │   │   └── CartPage.js
│   │   └── saucelabs/
│   │       ├── SauceLabsBasePage.js
│   │       ├── CatalogPage.js
│   │       ├── ProductDetailPage.js
│   │       ├── SidebarPage.js
│   │       ├── WebViewPage.js
│   │       └── DrawingPage.js
│   ├── config/
│   │   ├── wdio.config.js
│   │   └── wdio.saucelabs.config.js
│   ├── utils/
│   │   └── SlackNotifier.js
│   └── reports/                     # Generated reports (gitignored)
└── scripts/
    └── run-mobile.js                # Automated Appium setup + Hepsiburada test runner
```

### Running Tests

```bash
# API tests
npm run test:api

# Web tests (TechCrunch)
npm run test:web

# Web tests (headed Chrome)
npm run test:web:headed

# Cypress interactive mode
npm run cy:open

# Mobile - SauceLabs demo app
APP_PATH=<path-to-apk> npm run mobile:saucelabs

# Mobile - Hepsiburada (automated Appium setup)
npm run test:mobile

# All web + mobile
npm run test:all
```

### Configuration (Hepsiburada Mobile)

| Variable | Default | Description |
|----------|---------|-------------|
| `APPIUM_HOST` | `127.0.0.1` | Appium server host |
| `APPIUM_PORT` | `4723` | Appium server port |
| `APP_PATH` | `./apk/hepsiburada.apk` | Local APK path |
| `APP_PACKAGE` | `com.pozitron.hepsiburada` | App package name |
| `DEVICE_NAME` | `Android Emulator` | Target device |
| `PLATFORM_VERSION` | `15` | Android version |

### Slack (optional)

| Variable | Description |
|----------|-------------|
| `SLACK_WEBHOOK_URL` | Incoming webhook URL |
| `SLACK_ENABLED` | `true` to enable notifications |
| `SLACK_CHANNEL` | Target channel (e.g., `#test-results`) |

### Formatting

```bash
npm run format          # Format all files
npm run format:check    # Check formatting
```

Prettier + Husky pre-commit hook configured (`.prettierrc`, `.husky/pre-commit`).

### Reports

- **Web/API:** `cypress/reports/mocha/` (auto-generated HTML)
- **Mobile:** `mobile/reports/` (auto-generated HTML)

### CI/CD (GitHub Actions)

Pipeline at `.github/workflows/test-pipeline.yml`:

| Trigger | Behaviour |
|---------|-----------|
| Push to `main` / `develop` | Runs web tests |
| Pull request to `main` | Runs web tests |
| `workflow_dispatch` (suite=web) | Runs web tests |
| `workflow_dispatch` (suite=mobile) | Runs mobile tests |
| `workflow_dispatch` (suite=all) | Runs both |
