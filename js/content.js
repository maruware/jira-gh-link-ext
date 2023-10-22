function getContent() {
  const titleEl = document.querySelector("h1[data-testid='issue.views.issue-base.foundation.summary.heading']")
  if (!titleEl) {
    return null
  }
  const title = titleEl.textContent

  const issueNoEl = document.querySelector(
    "[data-testid='issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container'] a"
  )
  if (!issueNoEl) {
    return null
  }
  const issueName = issueNoEl.textContent
  const issuePath = issueNoEl.getAttribute('href')
  const pageUrl = `${location.protocol}//${location.host}${issuePath}`

  const content = `[\\[${issueName}\\] ${title}](${pageUrl})`
  return content
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.cmd === 'get-link') {
    const content = getContent()
    if (!content) {
      sendResponse('fail')
      return true
    }
    navigator.clipboard
      .writeText(content)
      .then(() => {
        sendResponse('success')
      })
      .catch((e) => {
        sendResponse('fail')
      })
  }
  return true
})
