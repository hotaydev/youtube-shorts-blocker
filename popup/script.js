let currentBrowser = typeof chrome === 'undefined' ? browser : chrome;

document.querySelector('#toggle').addEventListener('change', async (event) => {
  currentBrowser.storage.local.set({ "isActive": event.target.checked });
  toggleLogoColor(event.target.checked);
  await reloadPage();
});

(async () => {
  const toggleState = await currentBrowser.storage.local.get("isActive").then((result) => {
    return result.isActive ?? true;
  });

  toggleLogoColor(toggleState);
  document.querySelector('#toggle').checked = toggleState;
})();

function toggleLogoColor(value) {
  if (value) {
    document.querySelector('.logo').classList.remove('disabled');
    currentBrowser.action.setIcon({
      path: {
        "16": "../images/icon-16.png",
        "32": "../images/icon-32.png",
        "48": "../images/icon-48.png",
        "128": "../images/icon-128.png"
      }
    });
  } else {
    document.querySelector('.logo').classList.add('disabled');
    currentBrowser.action.setIcon({
      path: {
        "16": "../images/grayscale/icon-16.png",
        "32": "../images/grayscale/icon-32.png",
        "48": "../images/grayscale/icon-48.png",
        "128": "../images/grayscale/icon-128.png"
      }
    });
  }
}

async function reloadPage() {
  const tab = await currentBrowser.tabs.query({ active: true, lastFocusedWindow: true });
  currentBrowser.scripting.executeScript({ target: { tabId: tab[0].id, allFrames: true }, func: () => window.location.reload() });
}
