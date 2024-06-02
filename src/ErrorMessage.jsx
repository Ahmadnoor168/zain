import { useRouteError } from 'react-router-dom'
const ErrorMessage = () => {
    const error = useRouteError()
    console.log(error)
  return (
    <>
    <p>hello</p>
    <div>ErrorMessage</div>
    <div>{error.statusText || error.message}</div>
    </>
  )
}

export default ErrorMessage