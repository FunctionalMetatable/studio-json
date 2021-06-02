const { parseHTML } = require("linkedom")
const fetch = require("node-fetch")

module.exports = (req, res) => {
  fetch(`https://scratch.mit.edu/site-api/users/owners-in/${req.query.studio}/${req.query.page}/`).then(r => r.text()).then(html => {
    const { window, document } = parseHTML(html)

    let all = Array.from(document.querySelectorAll('.avatar.thumb.vertical a'))

    let array = []

    for (let j in all) {
      let element = all[j]
      
      array.push(element.getAttribute("href").split("/")[2])
    }


    res.json(array)
  })
}