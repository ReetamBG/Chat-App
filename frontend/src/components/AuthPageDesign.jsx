const AuthPageDesign = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-3">
      {[...Array(9)].map((_, index) => {
        return <div key={index} className={`size-25 bg-primary/30 rounded-2xl m-1 ${index%2===0 ? "animate-pulse" : ""}`}></div>
      })}
    </div>
  )
}

export default AuthPageDesign