import "../Styles/Trending.css";

// Sample trending items
const trendingItems = [
    { id: 1, name: 'Butter Chicken', image: 'src/assets/paneertika.jpg' },
    { id: 2, name: 'Paneer Tikka', image: 'src/assets/paneertika.jpg' },
    { id: 3, name: 'Biryani', image: 'src/assets/paneertika.jpg' },
    { id: 4, name: 'Masoor Dal', image: 'src/assets/paneertika.jpg' },
    { id: 5, name: 'Chole Bhature', image: 'src/assets/paneertika.jpg' },
    { id: 6, name: 'Palak Paneer', image: 'src/assets/paneertika.jpg' },
    { id: 7, name: 'Aloo Gobi', image: 'src/assets/paneertika.jpg' },
    { id: 8, name: 'Rogan Josh', image: 'src/assets/paneertika.jpg' },
    { id: 9, name: 'Tandoori Chicken', image: 'src/assets/paneertika.jpg' },
    { id: 10, name: 'Samosa', image: 'src/assets/paneertika.jpg' },
    { id: 11, name: 'Dosa', image: 'src/assets/paneertika.jpg' },
    { id: 12, name: 'Pav Bhaji', image: 'src/assets/paneertika.jpg' },
];

const TrendingPage = () => {
  return (
    <div className="trending-page">
      <h2 className="trending-heading">TRENDING</h2>
      <div className="trending-container">
        {trendingItems.map((item) => (
          <div key={item.id} className="trending-card">
            <img 
              src={item.image} 
              alt={item.name} 
              className="trending-image" 
            />
            <h2 className="trending-name">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPage;
