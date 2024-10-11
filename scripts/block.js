const currentBrowser = typeof chrome === 'undefined' ? browser : chrome;

function removeSideBarIcon() {
  const sideBarIconMini = document.querySelector("ytd-mini-guide-entry-renderer[aria-label=Shorts]");
  if (sideBarIconMini) sideBarIconMini.remove();

  const sideBarIconNormal = document.querySelector("ytd-guide-entry-renderer a[title=Shorts]");
  if (sideBarIconNormal) sideBarIconNormal.remove();
}

function removeShortsCaroussel() {
  const videosCaroussel = document.querySelectorAll('ytd-rich-section-renderer ytd-rich-shelf-renderer');
  videosCaroussel.forEach(singleCaroussel => {
    const isShortsCaroussel = singleCaroussel.querySelector('#dismissible > #rich-shelf-header-container > #rich-shelf-header > h2 #title-container #title').textContent.trim() === 'Shorts';
    if (isShortsCaroussel) singleCaroussel.remove();
  });
}

function removeShortsFromVideoArea() {
  const shortsInVideoSideBar = document.querySelector("ytd-reel-shelf-renderer");
  if (shortsInVideoSideBar) shortsInVideoSideBar.remove();
}

function blockShorts() {
  setInterval(() => {
    removeSideBarIcon();
    removeShortsCaroussel();
    removeShortsFromVideoArea();
  }, 1000); // Each 1 second
}

async function runWhenPageReady() {
  if (document.querySelector("body ytd-app #content")) {
    const isBlockingShorts = await currentBrowser.storage.local.get("isActive").then((result) => {
      return result.isActive ?? true;
    });

    if (isBlockingShorts) {
      blockShorts();
    }

  } else {
    setTimeout(runWhenPageReady, 500);
  }
}

(async () => {
  await runWhenPageReady();
})();
