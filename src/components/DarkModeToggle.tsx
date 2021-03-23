import useDarkMode from "use-dark-mode";

/**
 * This component should only be called on the client as it accesses window in it's body
 */
export default function DarkModeToggle() {
  const darkMode = useDarkMode(
    // @ts-ignore
    getPrefersDarkMode
  );

  return (
    <button
      onClick={() => darkMode.toggle()}
      id="toggleTheme"
      aria-pressed={darkMode.value}
      className="order-2 lg:order-3 ml-auto p-2 inline-block transform hover:-rotate-180 duration-300 ease-in-out "
    >
      {darkMode.value ? (
        <span role="img" aria-label="sun">
          ☀️
        </span>
      ) : (
        <span role="img" aria-label="sunglasses face">
          😎
        </span>
      )}
    </button>
  );
}


function getPrefersDarkMode(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}
