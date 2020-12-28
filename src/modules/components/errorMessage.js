export default error => {
  return (
    <div>
      <ul>
        {error.map(err => (
          <li className = "text-danger font-weight-bold">
            {err}
          </li>
        ))}
      </ul>
    </div>
  )
}