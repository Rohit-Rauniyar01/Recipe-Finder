import Navbar from "../components/Navbar"; 
import MainContent from "../Pages/MainContent";
import Footer from "../components/Footer";


const HomePage = () => {
  return (
    <div className="Home-Container">
        <Navbar />
     {/* Add your category page component here */}
        <Footer />
        <MainContent/>
    </div>
  );
}

export default HomePage;
