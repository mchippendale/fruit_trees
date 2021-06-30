
var map 

// Add marker fucntion 
function addMarker(props){
    var marker = new google.maps.Marker({
        position: props.coords, 
        map: map,
        // icon: props.iconImage
    });
    //check for customicon
    if(props.iconImage){
        // Set icon image
        marker.setIcon(props.iconImage);
    }

    if(props.content){
        var infoWindow = new google.maps.InfoWindow({
            content: props.content,
        });
    
        marker.addListener("click", function(){
            infoWindow.open(map, marker);
        });
    }
}


function initMap() {
    // map options    
    var options = {
            center: { lat: -37.8136, lng: 144.9631},
            zoom: 10
        }
    // New map
    map = new 
    google.maps.Map(document.querySelector('#map'), options);

    // Array of markers 
    var markers = [
        {
            coords: {lat: -37.8066381,lng: 144.98555159999998}, 
            iconImage:"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
            content:"Collingwood"
        },
        {
            coords:{lat: -38.3333,lng: 144.3167},
            content: "Torquay"
        },
        {
            coords:{lat: -38.4899,lng: 145.2038},
            content: "Phillip Island"
        }
    ]
    
    markers.forEach(marker => {
        addMarker(marker)
    })
}

// Get location form 
var locationForm = document.querySelector('#location-form');

//listen for submit

locationForm.addEventListener('submit', geoCode);

function geoCode(e) {
  e.preventDefault();

  let location = document.querySelector('#location-input').value;

  axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
    params:{
      address: location,
      key: "AIzaSyDIz1i5QHR6NNLfiD9GL7MwA9IQe2bju8U"
    }
  })
  .then(function(res){
    //Log full response 
    console.log(res)

    // Formatted address
    let formattedAddress = (res.data.results[0].formatted_address)
    let formattedAddressOutput = `
      <ul class="list-group">
        <li class="list-group-item">${formattedAddress}</li>
      </ul>
    `;

    // Add geometry
    let lat = (res.data.results[0].geometry.location.lat)
    let lng = (res.data.results[0].geometry.location.lng)

    let geometryOutput = `
      <ul class="list-group">
        <li class="list-group-item">Latitude: ${lat}</li>
        <li class="list-group-item">Longtitude: ${lng}</li>
      </ul>
    `;

    // Address components 
    let addressComponents = res.data.results[0].address_components;
    let addressComponentsOutput = '<ul class="list-group">';
    addressComponents.forEach((component, i) => {
      addressComponentsOutput += `
        <li class="list-group-item">${addressComponents[i].types[0]}: 
        ${addressComponents[i].long_name}</li> 
      `;
    });
    addressComponentsOutput += '</ul>'

    // Output to app
    document.querySelector('#formatted-address').innerHTML = 
    formattedAddressOutput;

    document.querySelector('#address-components').innerHTML = 
    addressComponentsOutput;

    document.querySelector('#geometry').innerHTML = 
    geometryOutput;

    addMarker({coords: {lat: lat,lng: lng}});

  }).catch(function(error){

    console.log(error);

  })
}

