import "./App.css";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      {/* <div className="h-screen bg-slate-900 text-white"> */}
      {/* <h2 className="text-purple-500 ">Fitness Networking</h2>

        <nav className="flex gap-5">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav> */}
      <AppRoutes />
      {/* </div> */}
    </>
  );
}

export default App;
