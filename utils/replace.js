export default (() => {
  return {
    charsToHtml: (data) => {
      let html = ''
      html = data.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      html = html.replace(/<figure class=\"image\">/g, '<div style="width: 100%;">').replace(/<\/figure>/g, '</div>')
      html = html.replace(/<figcaption>/g, '<div style="padding: 2px 0; text-align: center; opacity: .4;">').replace(/<\/figcaption>/g, '</div>')
      html = html.replace(/<img src/g, '<img style="max-width: 100%; height: auto;" src')
      return html
    },
    htmlToChars: (data) => data.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
})()
