const _protocol = location.protocol
const API_URL = _protocol + "//" + location.host + "/api"
const LOGIN_URL = _protocol + "//" + location.host + "/login"
const FETCH_OPTIONS: RequestInit = {
  method: "POST",
  mode: "same-origin",
  credentials: "include",
  cache: "no-cache",
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json"
  }
}

const setBodyToOption: (body: BodyInit) => RequestInit = body => {
  FETCH_OPTIONS.body = body
  return FETCH_OPTIONS
}

export { API_URL, LOGIN_URL, FETCH_OPTIONS, setBodyToOption }
