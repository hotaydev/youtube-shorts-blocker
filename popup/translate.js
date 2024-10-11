let currentBrowser = typeof chrome === 'undefined' ? browser : chrome;

const title    = document.querySelector('.title');
const blocking = document.querySelector('.toggle-message');
const version  = document.querySelector('#extension-version');

if (title)    title.innerText    = chrome.i18n.getMessage("title");
if (blocking) blocking.innerText = chrome.i18n.getMessage("blockingShorts");
if (version)  version.innerText  = `v${currentBrowser.runtime.getManifest().version}`
