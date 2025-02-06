import "/src/Styles/MainContent.css"; 

const MainContent = () => {
  return (
    <div className="main-content">
      <img src="src/assets/homeimage.png" alt="Home" className="home-image" />
      <div className="overlay-card">
        <div className="card-text">
        <h2>What can I make with.....</h2><br /><br />
        <p>Our recipe finder tool will show you all the things you can make,<br />
        So none of your food goes to waste, with only a few added <br />
        ingredients needed.</p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
