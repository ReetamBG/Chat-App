import themes from "../constants/themes"
import useThemeStore from "../stores/useThemeStore"

const Settings = () => {

  const { theme, setTheme } = useThemeStore()

  return (
    <div className="w-full min-h-[calc(100vh-50px)] flex justify-center items-center">
      {/* select theme section */}
      <div>
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-1 mt-10 lg:mt-0">Themes</h1>
          <p className="text-base-content/70">Choose a theme for your chat app</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-x-5 gap-y-2">
          {themes.map(t => (
            <button
              id={t}
              onClick={()=>setTheme(t)}
              className={`text-center cursor-pointer bg-base hover:bg-base-300 rounded-md p-2 ${t === theme ? "bg-base-300" : ""}`}
            >
              <div data-theme={t} className="flex gap-1 p-2 rounded-md">
                <div className="bg-primary size-6 rounded-md"></div>
                <div className="bg-secondary size-6 rounded-md"></div>
                <div className="bg-neutral size-6 rounded-md"></div>
                <div className="bg-accent size-6 rounded-md"></div>
              </div>
              <div className="text-sm mt-2 text-base-content/80">{t.slice(0, 1).toUpperCase()}{t.slice(1)}</div>
            </button>

          ))}
        </div>
      </div>
      {/* preview section */}
      <div></div>
    </div >
  )
}

export default Settings