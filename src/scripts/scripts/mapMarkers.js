import {
    MarkerClusterer,
    GridAlgorithm,
} from '@googlemaps/markerclusterer';
import { MarkerWithLabel } from '@googlemaps/markerwithlabel';

export default function mapMarkers() {
    const newStyles = [
        {
            "featureType": "all",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "gamma": 1.5
                }
            ]
        },
        {
            featureType: "poi.business",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        }
    ];


    function getDataChalet(){
        var result = [];
        if(document.getElementById('map').dataset.items){
            result = JSON.parse(document.getElementById('map').dataset.items);
        }
        return  result;
    }

    function getDataResorts(){
        var result = [];
        if(document.getElementById('map_resorts').dataset.items){
            result = JSON.parse(document.getElementById('map_resorts').dataset.items);
        }
        return  result;
    }

    const getMarkerIcon = (width, height) => {
        return {
            size: { width: width ? width : 48, height: height ? height : 53 },
            url: '/_/dist/img/marker.svg',
            scaledSize: new google.maps.Size(width ? width : 48, height ? height : 53)
        };
    };

    const getMarkerIconActive = () => {
        return {
            size: { width: 48, height: 53 },
            url: '/_/dist/img/marker-active.svg',
        };
    };

    const getContentCard = (item) => {
        let infoList = '';

        if (item.infoList.length) {
            for (let i = 0; i < item.infoList.length; i += 1) {
                const infoItem = item.infoList[i];

                infoList += `<div class="chalet-small-card__info-item">
                    <div class="chalet-small-card__info-title">${infoItem.text}</div>
                    <div class="chalet-small-card__info-value">${infoItem.value}</div>
                </div>`;
            }
        }

        return `<div class="chalet-small-card">
            <a href="${item.link}" class="chalet-small-card__link">
                <div class="chalet-small-card__image-box">
                    <img class="chalet-small-card__image" src=${item.image} srcset=${item.image2x} width="194" height="128" alt="" />
                </div>
                <div class="chalet-small-card__content">
                    <div class="chalet-small-card__row">
                        ${item.name ? `<div class="chalet-small-card__title">${item.name}</div>` : ''}
                        ${item.price ? `<div class="chalet-small-card__price">${item.price}</div>` : ''}
                        ${item.period ? `<div class="chalet-small-card__period">${item.period}</div>` : ''}
                    </div>
                    ${infoList.length ? `<div class="chalet-small-card__info">${infoList}</div>` : ''}
                    <div class="chalet-small-card__more">
                        <span class="chalet-small-card__more-link">`+document.getElementById('map').dataset.text+`</span>
                    </div>
                </div>
            </a>
        </div>`;
    };

    const getContentCardResort = (item) => {
        return `<div class="chalet-small-card">
            <a href="${item.link}" class="chalet-small-card__link">
                <div class="chalet-small-card__image-box">
                    <img class="chalet-small-card__image" src=${item.image} srcset=${item.image2x} width="194" height="128" alt="" />
                </div>
                <div class="chalet-small-card__content">
                    <div class="chalet-small-card__row">
                        ${item.name ? `<div class="chalet-small-card__title">${item.name}</div>` : ''}
                        ${item.price ? `<div class="chalet-small-card__price">${item.price}</div>` : ''}
                    </div>
                </div>
            </a>
        </div>`;
    };

    const renderer = {
        render({ count, position }) {
        const svg = window.btoa(`
            <svg width="48" height="53" viewBox="0 0 48 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="24" fill="#4E8580"/>
                <path d="M24 53L32.6603 41.75H15.3397L24 53Z" fill="#4E8580"/>
            </svg>
        `);
        return new MarkerWithLabel({
            position: position,
            icon: {
            url: `data:image/svg+xml;base64,${svg}`,
            scaledSize: new google.maps.Size(48, 53),
            },
            labelContent: String(count),
            labelClass: 'marker-count',
            labelAnchor: new google.maps.Point(-24, -53),
            zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
        });
        }
    };

    const loadMap = (mapId, data, cardContent) => {
        async function initMap() {
            const { Map } = await google.maps.importLibrary('maps');
            const map = new Map(document.getElementById(mapId), {
                center: { lat: 45.458610, lng: 9.183222 },
                zoom: 12,
                minZoom: 3,
                maxZoom: 17,
                streetViewControl: false,
                mapTypeControl: false,
            });
            const infoWindow = new google.maps.InfoWindow();
            let markersBounds = new google.maps.LatLngBounds();
            let markers = [];
            let currentInfoWindow = null;
            let currentMarker = null;

            map.setOptions({ styles: newStyles });

            for (let i = 0; i < data.length; i += 1) {
                const item = data[i];
                const markerPosition = new google.maps.LatLng(parseFloat(item.lat), parseFloat(item.lng));
                const marker = new google.maps.Marker({
                    position: {lat: parseFloat(item.lat), lng: parseFloat(item.lng)},
                    map: map,
                    icon: getMarkerIcon(),
                    id: i,
                });

                markersBounds.extend(markerPosition);

                marker.addListener('click', function() {
                    const marker = this;
                    const item = data[marker.id];

                    if (currentInfoWindow !== null) {
                        currentInfoWindow.close();
                    }

                    if (currentMarker !== null) {
                        currentMarker.setIcon(getMarkerIcon());
                    }

                    infoWindow.setContent(cardContent(item));
                    infoWindow.open(map, marker);
                    marker.setIcon(getMarkerIconActive());

                    currentInfoWindow = infoWindow;
                    currentMarker = marker;
                });

                google.maps.event.addListener(map, 'click', function() {
                    infoWindow.close();
                    marker.setIcon(getMarkerIcon());
                    marker.open = false;
                });

                markers.push(marker);
            }

            new MarkerClusterer({
                map,
                markers,
                renderer,
                algorithm: new GridAlgorithm({ maxDistance: 4000, gridSize: 45 })
            });

            map.setCenter(markersBounds.getCenter(), map.fitBounds(markersBounds));
        }

        initMap();
    };


    if (document.getElementById('map')) {
        document.addEventListener("map_resorts", function(event) {
            loadMap('map', getDataChalet(), getContentCard);
        });
        let event = new Event("map_resorts", {bubbles: true});
        document.getElementById('map').dispatchEvent(event);
    } else if (document.getElementById('map_resorts')) {
        document.addEventListener("map_resorts", function(event) {
            loadMap('map_resorts',  getDataResorts(), getContentCardResort);
        });
        let event = new Event("map_resorts", {bubbles: true});
        document.getElementById('map_resorts').dispatchEvent(event);
    } else if (document.getElementById('map_chalet')) {
        async function initMap() {
            var lat = parseFloat(document.getElementById('map_chalet').dataset.lat);
            var lng = parseFloat(document.getElementById('map_chalet').dataset.lng);
            const { Map } = await google.maps.importLibrary('maps');
            const map = new Map(document.getElementById('map_chalet'), {
                center: { lat: lat, lng: lng },
                zoom: 13,
                minZoom: 3,
                maxZoom: 17,
                mapTypeControl: false,
                streetViewControl: false,
            });

            map.setOptions({ styles: newStyles });

            new google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: map,
                icon: getMarkerIcon(64, 71),
            });
        }

        initMap();
    }
}
