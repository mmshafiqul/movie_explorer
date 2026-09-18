import { RouterProvider } from "react-router/dom";
import router from "./layouts/Router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
