function getContent() {
  const title = document.querySelector('h1').textContent
  const issueName = document.querySelector(
    "[data-test-id='issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container'] a span"
  ).textContent
  const pageUrl = location.href

  const content = `[${issueName}](${pageUrl}) ${title}`
  return content
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.cmd === 'get-link') {
    const content = getContent()
    navigator.clipboard
      .writeText(content)
      .then(() => {
        sendResponse('success')
      })
      .catch((e) => {
        sendResponse('failed')
      })
  }
  return true
})
