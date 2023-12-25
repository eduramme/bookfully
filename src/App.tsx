import { Provider } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import store from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </div>
  );
}

export default App;
