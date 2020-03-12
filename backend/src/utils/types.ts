import firebase from "firebase"

export type UserSession = Express.Session & {
  user?: firebase.User
}
