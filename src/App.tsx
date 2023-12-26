import { Provider } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import store from "./store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRoutes />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              border: "1px solid #00C851",
              padding: "16px",
              color: "#00C851",
            },
            success: {
              iconTheme: {
                primary: "#00C851",
                secondary: "#FFFAEE",
              },
            },
            error: {
              style: {
                border: "1px solid #FF1744",
                padding: "16px",
                color: "#FF1744",
              },
              iconTheme: {
                primary: "#FF1744",
                secondary: "#FFFAEE",
              },
            },
          }}
        />
      </Provider>
    </div>
  );
}

export default App;
