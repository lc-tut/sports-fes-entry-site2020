import React from "react"
import ReactDOM from "react-dom"

const App: React.FC<{}> = () => {
  return (
    <div>Hello World!</div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
)
