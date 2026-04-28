import AppRouter from "./router";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "react-hot-toast";
import "../style/App.css";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </Provider>
  );
}

export default App;