const { parseHTML } = require("linkedom")
const fetch = require("node-fetch")

module.exports = (req, res) => {
  fetch(`https://scratch.mit.edu/site-api/users/curators-in/${req.query.studio}/${req.query.page}/`).then(r => r.text()).then(html => {
    const { window, document } = parseHTML(html)

    let all = Array.from(document.querySelectorAll('.info.title'))

    let array = []

    for (let j in all) {
      let element = all[j]
      
      array.push(element.innerText)
    }

    res.header("Access-Control-Allow-Origin", "*")
    res.json(array)
  })
}