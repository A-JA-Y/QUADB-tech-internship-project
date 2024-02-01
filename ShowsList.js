
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShowsList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
      setShows(response.data);
    };

    fetchShows();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">TV Shows</h1>
      <div className="row">
        {shows.map((show, index) => (
          <div key={index} className="col-md-4 col-sm-6">
            <div className="card mb-3">
              <img src={show.show.image?.medium} alt={show.show.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{show.show.name}</h5>
                <p className="card-text">{show.show.genres.join(', ')}</p>
                <Link to={`/show/${show.show.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowsList;
