import { flashBadge } from './badge.js'

const resultBadge = async (result) => {
  switch (result) {
    case 'success':
      await flashBadge('success')
      return
    case 'fail':
      await flashBadge('fail')
      return
  }
}

const urlPattern = /^https:\/\/.+\.atlassian\.net\/.+$/

chrome.browserAction.onClicked.addListener((tab) => {
  if (tab.url && tab.url.match(urlPattern)) {
    chrome.tabs.sendMessage(tab.id, { cmd: 'get-link' }, (response) => {
      resultBadge(response)
    })
  } else {
    resultBadge('fail')
  }
})
