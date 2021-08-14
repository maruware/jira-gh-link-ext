function getContent() {
  const titleEl = document.querySelector("h1[data-test-id='issue.views.issue-base.foundation.summary.heading']").textContent
  if (!titleEl) {
    return null
  }
  const title = titleEl.textContent

  const issueNoEl = document.querySelector(
    "[data-test-id='issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container'] a span"
  )
  if (!issueNoEl) {
    return null
  }
  const issueName = issueNoEl.textContent
  const pageUrl = location.href

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
