import AuthInitializer from "./components/auth/AuthInitializer"
import AppRouter from "./routes/AppRouter"

function App() {


  return (
    <>
      {/* <h1> Frontend runnig Okay</h1>
       */}
       <AuthInitializer>
       <AppRouter/>
       </AuthInitializer>
    </>
  )
}

export default App
