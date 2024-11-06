import React, { useState } from 'react';
import '../App.css';


function Card({ item }) {
    return (
        <div className="card">
            <h4 className="project-title">{item.title}</h4>
            <img className="card-image" src={item.url} alt={item.title} />
            <p className="card-description">{item.explanation}</p>
            <p className="card-date">Date: {item.date}</p>
            <p className="card-credits">
                Photographer: {item.copyright || 'Unknown'}
            </p>
        </div>
    );
}


function PictureCards() {
    
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

//    still learning about async functions but my original apod had one
    async function getPhotoApi() {
        setLoading(true); 
        // handles errors 
        try {
            const response = await fetch(
                "https://api.nasa.gov/planetary/apod?start_date=2024-08-27&end_date=2024-08-29&api_key=podRVC8objAhx7IraJtGncf5cZxYXZYoUsHChWyc"
            );
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); 
        }
    }

    
    function refreshPage() {
        setItems([]); 
    }
// displays pictures on click, shows photos or loading, allows button to be disabled
    return (
        <div className="card-holder">
            <div className="top">
                <h1>Astronomy Pictures of the Day</h1>
                <button onClick={getPhotoApi} disabled={loading}>
                    {loading ? "Loading..." : "Show Pictures"}
                </button>
            </div>
            {/* if item has data in this case the picture it will display in card, if not no photos */}
            <div className="picture-cards">
                {items.length > 0 ? (
                    items.map((item, index) => <Card key={index} item={item} />)
                ) : (
                    <p>No photos to display.</p>
                )}
            </div>
            <div className="button-holder">
                <button className="reset" onClick={refreshPage}>
                    Reset
                </button>
            </div>
        </div>
    );
}

export default PictureCards;