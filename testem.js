/* eslint-env node */
module.exports = {
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "firefox_user_js": "./firefox_config.js",
  "launch_in_ci": [
    "PhantomJS",
    "Firefox",
    "Chrome"
  ],
  "launch_in_dev": [
    "Firefox",
    "Chrome"
  ],
  "browser_args": {
    "Chrome": [
      "--touch-events"
    ]
  }
};
