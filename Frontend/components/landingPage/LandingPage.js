import React, { useEffect, useState } from "react";
import styles from "./LandingPage.module.css";
import { SearchBar } from "./SearchBar";
import { SearchGuide } from "./SearchGuide";
import { Loading } from "../LoadingScreen/Loading";

const LandingPage = () => {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [playerNameFromSearch, setPlayerNameFromSearch] = useState("");
  const [playerDetails, setPlayerDetails] = useState(null);

  const handlePlayerDataName = (data) => {
    setPlayerNameFromSearch(data);
  };

  const handleSearch = (playerNameFromSearch) => {
    fetchData(playerNameFromSearch);
  };

  useEffect(() => {
    const fetchData = async (playerName) => {
      try {
        setLoadingStatus(true);
  
        const response = await fetch('http://localhost:8081/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: playerName 
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
  
        // Save the data in the playerDetails object
        const playerDetails = {
          name: data.name,
          fullName: data.fullName,
          placeOfBirth: data.placeOfBirth,
          birth: data.birth,
          age: data.age,
          height: data.height,
          currentClub: data.currentClub,
          positions: data.positions,
          shirtNumber: data.shirtNumber
        };
  
        setPlayerDetails(playerDetails);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingStatus(false);
      }
    };
      console.log(playerDetails)
    fetchData(playerNameFromSearch);
  }, [playerNameFromSearch]);

  return (
    <>
      <div className={styles.header}>
        FOOTBALL
        <span>KNOWLEDGE</span>
      </div>
      <SearchBar player={handlePlayerDataName} />
      <SearchGuide />
      <img
        className={styles.ball}
        src="./Group.svg"
        style={{
          zIndex: 0,
        }}
      />
      <Loading loadingStatus={loadingStatus} />
    </>
  );
};

export default LandingPage;
