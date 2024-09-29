document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.intern.d-tt.nl/api/houses';
    const apiKey = 'U4tnCWEYc37uJdDpN8oyiQOGqXTajzgK';
    const houseListContainer = document.getElementById('house-list');

    // Fetch data from the API
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        // Clear the container before adding new content
        houseListContainer.innerHTML = '';

        // Loop through each house in the data
        data.forEach(house => {
            // Create a container for each house
            const houseContainer = document.createElement('div');
            houseContainer.className = 'house-container';

            // Create and append elements for house image, location, description, and more
            const image = document.createElement('img');
            image.src = house.image;
            image.alt = 'House image';
            image.className = 'house-image';
            houseContainer.appendChild(image);

            const location = document.createElement('p');
            location.className = 'house-location';
            location.textContent = `${house.location.street}, ${house.location.city}`;
            houseContainer.appendChild(location);

            const description = document.createElement('p');
            description.className = 'house-description';
            description.textContent = house.description;
            houseContainer.appendChild(description);

            const price = document.createElement('p');
            price.className = 'house-price';
            price.textContent = `€${house.price.toLocaleString()}`;
            houseContainer.appendChild(price);

            const size = document.createElement('p');
            size.className = 'house-size';
            size.textContent = `${house.size} m²`;
            houseContainer.appendChild(size);

            const rooms = document.createElement('p');
            rooms.className = 'house-rooms';
            rooms.textContent = `${house.rooms.bedrooms} Bed, ${house.rooms.bathrooms} Bath`;
            houseContainer.appendChild(rooms);

            const id = document.createElement('p');
            id.className = 'house-id';
            id.textContent = `ID: ${house.id}`;
            houseContainer.appendChild(id);

            const garage = document.createElement('p');
            garage.className = 'house-garage';
            garage.textContent = house.hasGarage ? 'Garage: Yes' : 'Garage: No';
            houseContainer.appendChild(garage);

            // Append the house container to the house list container
            houseListContainer.appendChild(houseContainer);
        });
    })
    .catch(error => {
        console.error('Error fetching house data:', error);
    });
});
