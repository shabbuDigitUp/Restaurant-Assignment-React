import Header from "./Components/Layouts/Header";
import Footer from "./Components/Layouts/Footer";
import Main from "./Components/Layouts/Main";
import "./styles/app.css"

const App = () => {
  return (
    <div className="layout--container">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
