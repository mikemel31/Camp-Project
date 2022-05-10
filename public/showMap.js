mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: campgroundMap.location.coordinates,
    zoom: 9 
    });

    const marker = new mapboxgl.Marker()
    .setLngLat(campgroundMap.location.coordinates)
    .setPopup(
      new mapboxgl.Popup({offset: 25})
        .setLngLat(campgroundMap.location.coordinates)
        .setHTML(`<h5>${campgroundMap.title}</h5>`)
        .addTo(map)
    )
    .addTo(map);