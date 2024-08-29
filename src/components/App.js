import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";
import data from "../db.json";


function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  // Initialize the pets state with data from db.json
  useEffect(() => {
    setPets(data.pets);
  }, []);

  // Update the filter type based on user selection
  const onChangeType = (type) => {
    setFilters({ type });
  };

  // Fetch pets based on the selected type
  const onFindPetsClick = () => {
    let filteredPets = data.pets;

    if (filters.type !== "all") {
      filteredPets = filteredPets.filter(pet => pet.type === filters.type);
    }

    setPets(filteredPets);
  };

  // Handle adoption of a pet
  const onAdoptPet = (id) => {
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === id ? { ...pet, isAdopted: true } : pet
      )
    );
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={onChangeType}
              onFindPetsClick={onFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
