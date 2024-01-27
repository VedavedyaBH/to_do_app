import "./App.css";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

const ToDo = lazy(() => import("./components/ToDo"));
const SignUp = lazy(() => import("./components/SignUp"));
const LogIn = lazy(() => import("./components/LogIn"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={
              <Suspense fallback={"Loading..."}>
                <SignUp />
              </Suspense>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Suspense fallback={"Loading..."}>
                <AuthProvider >
                  <LogIn />
                </AuthProvider>
              </Suspense>
            }
          ></Route>

          <Route
            path="/todo"
            element={
              <Suspense fallback={"Loading..."}>
                <AuthProvider>
                  <ToDo />
                </AuthProvider>
              </Suspense>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Root() {}

export default App;
