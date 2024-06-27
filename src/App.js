import { Provider } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
import store from "./utils/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import SearchVideoContainer from "./components/SearchVideoContainer";
import VideoByCategoryContainer from "./components/VideoByCategoryContainer";
import { ThemeProvider } from "./context/ThemeContext";
import { useEffect, useState } from "react";
// import ExeptionPage from "./utils/ExeptionPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },

      {
        path: "/watch",
        element: <WatchPage />,
      },
      {
        path: "/results",
        element: <SearchVideoContainer />,
      },
      {
        path: "/category",
        element: <VideoByCategoryContainer />,
      },
    ],
  },
]);

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const darkTheme = () => {
    setThemeMode("dark");
  };
  const lightTheme = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <Providers />
    </ThemeProvider>
  );
}

function Providers({ children }) {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter}>{children}</RouterProvider>
    </Provider>
  );
}

export default App;
