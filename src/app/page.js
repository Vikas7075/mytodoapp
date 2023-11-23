'use client'
import { Provider } from "react-redux";
import store from "./redux/store";
import Todos from "./components/Todos";


export default function Home() {



  return (
    <div>

      <Provider store={store}>
        {<Todos />}
      </Provider>
    </div>
  );
}
