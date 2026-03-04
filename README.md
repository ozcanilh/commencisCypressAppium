# commencis-cypress-automation

JavaScript test automation project covering three assignments:

- **Case 1** – Contact form test cases (TestRail format)
- **Case 2** – Web automation for TechCrunch (Cypress + Mochawesome)
- **Case 3** – Mobile automation for Hepsiburada (WebdriverIO + Appium + Mochawesome)

---

## Prerequisites

| Tool                       | Version | Notes                            |
| -------------------------- | ------- | -------------------------------- |
| Node.js                    | 20+     | `node -v`                        |
| npm                        | 9+      | `npm -v`                         |
| Chrome                     | Latest  | For web tests                    |
| Firefox                    | Latest  | For web tests (multi-browser)    |
| Appium                     | 2.x     | `appium -v` — for mobile tests   |
| Appium UIAutomator2 driver | Latest  | `appium driver list --installed` |
| Android SDK / ADB          | API 33+ | `adb --version`                  |
| Android Emulator           | API 33+ | Running before mobile tests      |
| Hepsiburada APK            | 5.85.x  | Installed on emulator            |

---

## Project Structure

```
commencis-cypress-automation/
├── case1-test-cases.md              # Case 1: Contact form test cases
├── cypress.config.js                # Cypress configuration + Mochawesome reporter
├── package.json
├── .gitignore
├── .github/workflows/
│   └── test-pipeline.yml            # GitHub Actions CI/CD pipeline
├── cypress/
│   ├── e2e/
│   │   ├── pages/
│   │   │   └── 1_techcrunch/
│   │   │       ├── homePage.js
│   │   │       └── articlePage.js
│   │   └── tests/
│   │       └── 1_techcrunch/
│   │           └── techcrunch.cy.js # Case 2: TechCrunch web tests
│   ├── support/
│   │   ├── e2e.js
│   │   └── commands/
│   │       ├── general_commands.js
│   │       └── techcrunch_commands.js
│   ├── fixtures/
│   │   └── config.json
│   ├── utils/
│   │   └── SlackNotifier.js         # Slack webhook notifications (web)
│   └── reports/                     # Generated Mochawesome reports (gitignored)
└── mobile/
    ├── tests/
    │   └── hepsiburada.test.js      # Case 3: Hepsiburada mobile tests
    ├── pages/
    │   ├── MobileBasePage.js
    │   └── hepsiburada/
    │       ├── MainPage.js
    │       ├── SearchResultsPage.js
    │       └── CartPage.js
    ├── config/
    │   └── wdio.config.js           # WebdriverIO + Appium configuration
    ├── utils/
    │   └── SlackNotifier.js         # Slack webhook notifications (mobile)
    └── reports/                     # Generated Mochawesome reports (gitignored)
```

---

## Installation

```bash
npm install
```

After installation, enable git hooks:

```bash
npm run prepare
```

---

## Configuration

### Web (Cypress)

Edit `cypress.config.js` or override via environment variables:

```js
baseUrl: 'https://techcrunch.com',
defaultCommandTimeout: 15000,
pageLoadTimeout: 30000,
```

### Mobile (WebdriverIO + Appium)

Edit `mobile/config/wdio.config.js` or override via environment variables:

| Variable           | Default                                     | Description                |
| ------------------ | ------------------------------------------- | -------------------------- |
| `APPIUM_HOST`      | `127.0.0.1`                                 | Appium server host         |
| `APPIUM_PORT`      | `4723`                                      | Appium server port         |
| `APP_PATH`         | `./apk/hepsiburada.apk`                     | Local APK path for install |
| `DEVICE_NAME`      | `Android Emulator`                          | Target device or AVD name  |
| `PLATFORM_VERSION` | `15`                                        | Android OS version         |
| `APP_PACKAGE`      | `com.pozitron.hepsiburada`                  | App package name           |
| `APP_ACTIVITY`     | `com.hepsiburada.ui.startup.SplashActivity` | App launch activity        |

### Slack (optional)

| Variable            | Description                            |
| ------------------- | -------------------------------------- |
| `SLACK_WEBHOOK_URL` | Incoming webhook URL                   |
| `SLACK_ENABLED`     | `true` to enable notifications         |
| `SLACK_CHANNEL`     | Target channel (e.g., `#test-results`) |

---

## Running Tests

### Web Tests (TechCrunch)

```bash
# Chrome (default)
npm run test:web

# Firefox
npm run cy:run:firefox

# Interactive mode
npm run cy:open
```

### Mobile Tests (Hepsiburada)

Before running, ensure:

1. Android Emulator is running (`emulator -list-avds` / Android Studio)
2. Hepsiburada APK is downloaded from `https://apkpure.com/hepsiburada-online-shopping/com.pozitron.hepsiburada/download` (use the 64-bit variant)
3. Place APK at `./apk/hepsiburada.apk` (or pass `APP_PATH=/your/path/app.apk`)

```bash
npm run test:mobile
```

`npm run test:mobile` calls `npm run mobile:run`, which uses `scripts/run-mobile.js`.
This script automatically:

1. checks connected devices with `adb devices`
2. installs APK from `APP_PATH` if file exists (default: `./apk/hepsiburada.apk`)
3. if APK file is missing, checks whether `APP_PACKAGE` is already installed
4. checks/starts Appium (`npx appium`) if needed
5. runs the WDIO suite (`mobile:run:core`)

Example with custom APK path:

```bash
APP_PATH="/Users/<your-user>/Downloads/hepsiburada-64.apk" npm run test:mobile
```

### All Tests

```bash
npm run test:all
```

## Formatting and Hooks

Prettier and Husky are configured in this project.

### Prettier

```bash
# Format all supported files
npm run format

# Check formatting without changing files
npm run format:check
```

Config files:

- `.prettierrc`
- `.prettierignore`

### Husky + lint-staged

- Pre-commit hook file: `.husky/pre-commit`
- On commit, `lint-staged` runs Prettier for staged files:
  - `*.{js,json,md,yml,yaml}`

---

## Reports

### Web (Mochawesome via cypress-mochawesome-reporter)

Reports are generated automatically in `cypress/reports/mocha/` after each Cypress run.

To merge and generate a single HTML report:

```bash
npm run report:merge
npm run report:generate
```

The final report will be at `cypress/reports/html/report.html`.

### Mobile (Mochawesome via wdio-mochawesome-reporter)

Reports are generated automatically in `mobile/reports/` after each WebdriverIO run.

---

## CI/CD (GitHub Actions)

The pipeline at `.github/workflows/test-pipeline.yml` supports:

| Trigger                            | Behaviour         |
| ---------------------------------- | ----------------- |
| Push to `main` / `develop`         | Runs web tests    |
| Pull request to `main`             | Runs web tests    |
| `workflow_dispatch` (suite=web)    | Runs web tests    |
| `workflow_dispatch` (suite=mobile) | Runs mobile tests |
| `workflow_dispatch` (suite=all)    | Runs both         |

Add the following GitHub secrets to enable Slack notifications from CI:

- `SLACK_WEBHOOK_URL`
- `SLACK_ENABLED` = `true`
- `SLACK_CHANNEL` = `#test-results`

---

## Case 1 – Test Cases

See `case1-test-cases.md` for 44 test cases covering the Crown Spa contact form, including positive and negative scenarios.
