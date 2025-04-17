import { LoaderCircle } from "lucide-react"

const LoadingIcon = () => (
  <div className="h-screen w-screen flex items-center justify-center">
    <LoaderCircle className="animate-spin" size={50} />
  </div>
)

export default LoadingIcon