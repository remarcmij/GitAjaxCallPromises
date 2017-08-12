function Request () {}
function RenderList () {}
function GetHtmlRepoList () {}
function GetHtmlMemberList () {}

const GitHubORG = 'HackYourFuture'
const HYFReposApiEndpoint = `https://api.github.com/orgs/HackYourFuture/repos`
const HYFMembersApiEndpiont = `https://api.github.com/orgs/${GitHubORG}/members`
 
let $repoList = '.repo-list ul'
let $memberList = '.member-list ul'

Request(HYFReposApiEndpoint, 'GET')
  .then(GetHtmlRepoList)
  .then(RenderList.bind(null, $repoList))
  .catch(RenderList.bind(null, $repoList, '<li>Error</li>'))

Request(HYFMembersApiEndpiont, 'GET')
  .then(GetHtmlMemberList)
  .then(RenderList.bind(null, $memberList))
  .catch(RenderList.bind(null, $memberList, '<li>Error</li>'))