export type Theme = "dark" | "light";

export const THEME_KEY = "theme";

export function resolveTheme(stored: string | null, prefersLight: boolean): Theme {
  if (stored === "dark" || stored === "light") return stored;
  return prefersLight ? "light" : "dark";
}

// <head> içinde satır içi çalışır; yalnızca document, localStorage ve matchMedia
// serbest değişkenlerini kullanır (window. öneki yok), böylece testte de aynı kod çalışır.
export const themeInitScript = `(function(){
  var theme = "dark";
  try {
    document.documentElement.classList.add("js");
    var stored = null;
    try { stored = localStorage.getItem(${JSON.stringify(THEME_KEY)}); } catch (e) {}
    if (stored === "dark" || stored === "light") {
      theme = stored;
    } else {
      theme = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
  } catch (e) {}
  try { document.documentElement.dataset.theme = theme; } catch (e) {}
})();`;
