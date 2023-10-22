import { flashBadge } from './js/badge.js'

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

chrome.action.onClicked.addListener((tab) => {
  if (tab.url && tab.url.match(urlPattern)) {
    chrome.tabs.sendMessage(tab.id, { cmd: 'get-link' }, (response) => {
      resultBadge(response)
    })
  } else {
    resultBadge('fail')
  }
})
