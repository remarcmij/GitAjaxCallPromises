function getJSON(url, method) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => resolve(xhr.responseText));
    xhr.addEventListener("error", () => reject(xhr.statusText));
    xhr.open(method, url);
    xhr.send();
  }).then(res => JSON.parse(res))
}

const fetchJSON = url => fetch(url).then(res => res.json())

const getHtmlRepoList = repos =>
  repos.reduce((html, { url, name }) =>
    html + `<li><a href="${url}">${name}</a></li>`
    , '')

const getHtmlMemberList = members =>
  members.reduce((html, { login, avatar_url }) =>
    html + `<li><h2>${login}</h2><img src="${avatar_url}" width=230px /></li>`
    , '')

const renderList = (selector, html) => {
  const $parent = document.querySelector(selector)
  $parent.innerHTML = html
}

const renderList2 = selector => html => {
  const $parent = document.querySelector(selector)
  $parent.innerHTML = html
}

const GitHubORG = 'HackYourFuture'
const HYFReposApiEndpoint = `https://api.github.com/orgs/HackYourFuture/repos`
const HYFMembersApiEndpoint = `https://api.github.com/orgs/${GitHubORG}/members`

let $repoList = '.repo-list ul'
let $memberList = '.member-list ul'

fetchJSON(HYFReposApiEndpoint, 'GET')
  .then(obj => getHtmlRepoList(obj))
  .then(html => renderList($repoList, html))
  .catch(() => renderList($repoList,'<li>Error</li>'))

fetchJSON(HYFMembersApiEndpoint)
  .then(getHtmlMemberList)
  .then(renderList2($memberList))
  .catch(() => renderList2($memberList)('<li>Error</li>'))
