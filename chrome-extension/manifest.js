import fs from 'node:fs';

const packageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));

const isFirefox = process.env.__FIREFOX__ === 'true';

const sidePanelConfig = {
  side_panel: {
    default_path: 'side-panel/index.html',
  },
  permissions: !isFirefox ? ['sidePanel'] : [],
};

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = Object.assign(
  {
    manifest_version: 3,
    default_locale: 'en',
    /**
     * if you want to support multiple languages, you can use the following reference
     * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
     */
    name: '__MSG_extensionName__',
    version: packageJson.version,
    description: '__MSG_extensionDescription__',
    permissions: ['storage', 'tabs'].concat(sidePanelConfig.permissions),
    options_page: 'options/index.html',
    background: {
      service_worker: 'background.iife.js',
      type: 'module',
    },
    action: {
      // default_popup: 'side-panel/index.html',
      default_icon: 'bisabilitas-logo-32.png',
    },
    // chrome_url_overrides: {
    //   newtab: 'new-tab/index.html',
    // },
    icons: {
      128: 'bisabilitas-logo-128.png',
    },
    content_scripts: [
      {
        matches: ['http://*/*', 'https://*/*', '<all_urls>'],
        js: ['content/index.iife.js'],
      },
      {
        matches: ['http://*/*', 'https://*/*', '<all_urls>'],
        js: ['content-ui/index.iife.js'],
      },
      {
        matches: ['http://*/*', 'https://*/*', '<all_urls>'],
        css: ['content.css'], // public folder
      },
    ],
    devtools_page: 'devtools/index.html',
    web_accessible_resources: [
      {
        resources: ['*.js', '*.css', '*.svg', 'bisabilitas-logo-32.png', 'bisabilitas-logo-128.png', "fonts/OpenDyslexic-Regular.otf", "fonts/OpenDyslexic-Bold.otf", "fonts/OpenDyslexic-Italic.otf"],
        matches: ['*://*/*'],
      },
    ],
  },
  !isFirefox && { side_panel: { ...sidePanelConfig.side_panel } },
);

export default manifest;
