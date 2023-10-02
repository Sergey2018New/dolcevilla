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

    const data = [
        {
            name: 'Chalet Alpin Roc',
            link: '#',
            price: 'от € 6 860',
            period: '5 ночей',
            infoList: [
                {
                    text: 'Спален',
                    value: '1'
                },
                {
                    text: 'Мест',
                    value: '3'
                },
            ],
            image: 'img/chalet-map.jpg',
            image2x: 'img/chalet-map@2x.jpg',
            lat: 45.458610,
            lng: 9.183222,
        },
        {
            name: 'Chalet Arielle',
            link: '#',
            price: 'от € 7 500',
            period: '7 ночей',
            infoList: [
                {
                    text: 'Спален',
                    value: '1'
                },
                {
                    text: 'Мест',
                    value: '3'
                },
            ],
            image: 'img/chalet-map.jpg',
            image2x: 'img/chalet-map@2x.jpg',
            lat: 45.558610,
            lng: 9.293222,
        },
        {
            name: 'Arrabelle Retreat',
            link: '#',
            price: 'от € 8 334',
            period: '10 ночей',
             infoList: [
                {
                    text: 'Спален',
                    value: '1'
                },
                {
                    text: 'Мест',
                    value: '3'
                },
            ],
            image: 'img/chalet-map-2.jpg',
            image2x: 'img/chalet-map-2@2x.jpg',
            lat: 45.458610,
            lng: 9.193222,
        },
        {
            name: 'Chalet Alpin Roc',
            link: '#',
            price: 'от € 6 860',
            period: '5 ночей',
             infoList: [
                {
                    text: 'Спален',
                    value: '1'
                },
                {
                    text: 'Мест',
                    value: '3'
                },
            ],
            image: 'img/chalet-map.jpg',
            image2x: 'img/chalet-map@2x.jpg',
            lat: 44.558610,
            lng: 8.283222,
        },
        {
            name: 'Chalet Arielle',
            link: '#',
            price: 'от € 7 500',
            period: '7 ночей',
             infoList: [
                {
                    text: 'Спален',
                    value: '1'
                },
                {
                    text: 'Мест',
                    value: '3'
                },
            ],
            image: 'img/chalet-map.jpg',
            image2x: 'img/chalet-map@2x.jpg',
            lat: 45.258610,
            lng: 9.298222,
        },
        {
            name: 'Arrabelle Retreat',
            link: '#',
            price: 'от € 8 334',
            period: '10 ночей',
             infoList: [
                {
                    text: 'Спален',
                    value: '1'
                },
                {
                    text: 'Мест',
                    value: '3'
                },
            ],
            image: 'img/chalet-map-2.jpg',
            image2x: 'img/chalet-map-2@2x.jpg',
            lat: 45.358610,
            lng: 10.193222,
        },
        {
            name: 'Chalet Alpin Roc',
            link: '#',
            price: 'от € 6 860',
            period: '5 ночей',
             infoList: [
                {
                    text: 'Спален',
                    value: '1'
                },
                {
                    text: 'Мест',
                    value: '3'
                },
            ],
            image: 'img/chalet-map.jpg',
            image2x: 'img/chalet-map@2x.jpg',
            lat: 43.551610,
            lng: 8.683222,
        },
        {
            name: 'Chalet Arielle',
            link: '#',
            price: 'от € 7 500',
            period: '7 ночей',
             infoList: [
                {
                    text: 'Спален',
                    value: '1'
                },
                {
                    text: 'Мест',
                    value: '3'
                },
            ],
            image: 'img/chalet-map.jpg',
            image2x: 'img/chalet-map@2x.jpg',
            lat: 45.458610,
            lng: 9.598222,
        },
        {
            name: 'Arrabelle Retreat',
            link: '#',
            price: 'от € 8 334',
            period: '10 ночей',
             infoList: [
                {
                    text: 'Спален',
                    value: '1'
                },
                {
                    text: 'Мест',
                    value: '3'
                },
            ],
            image: 'img/chalet-map-2.jpg',
            image2x: 'img/chalet-map-2@2x.jpg',
            lat: 45.658610,
            lng: 10.393222,
        },
    ];

    const dataResorts = [
        {
            name: 'Церматт',
            link: '#',
            price: 'от € 50',
            image: 'img/chalet-map.jpg',
            image2x: 'img/chalet-map@2x.jpg',
            lat: 45.458610,
            lng: 9.183222,
        },
        {
            name: 'Циллерталь',
            link: '#',
            price: 'от € 7 500',
            image: 'img/chalet-map.jpg',
            image2x: 'img/chalet-map@2x.jpg',
            lat: 45.558610,
            lng: 9.293222,
        },
        {
            name: 'Лех',
            link: '#',
            price: 'от € 8 334',
            image: 'img/chalet-map-2.jpg',
            image2x: 'img/chalet-map-2@2x.jpg',
            lat: 45.458610,
            lng: 9.193222,
        },
        {
            name: 'Санкт-Антон',
            link: '#',
            price: 'от € 6 860',
            image: 'img/chalet-map.jpg',
            image2x: 'img/chalet-map@2x.jpg',
            lat: 44.558610,
            lng: 8.283222,
        },
        {
            name: 'Церматт',
            link: '#',
            price: 'от € 7 500',
            image: 'img/chalet-map.jpg',
            image2x: 'img/chalet-map@2x.jpg',
            lat: 45.258610,
            lng: 9.298222,
        },
        {
            name: 'Лех',
            link: '#',
            price: 'от € 8 334',
            period: '10 ночей',
            image: 'img/chalet-map-2.jpg',
            image2x: 'img/chalet-map-2@2x.jpg',
            lat: 45.358610,
            lng: 10.193222,
        },
        {
            name: 'Андерматт',
            link: '#',
            price: 'от € 6 860',
            image: 'img/chalet-map.jpg',
            image2x: 'img/chalet-map@2x.jpg',
            lat: 43.551610,
            lng: 8.683222,
        },
        {
            name: 'Санкт-Антон',
            link: '#',
            price: 'от € 7 500',
            image: 'img/chalet-map.jpg',
            image2x: 'img/chalet-map@2x.jpg',
            lat: 45.458610,
            lng: 9.598222,
        },
        {
            name: 'Валь Торанс',
            link: '#',
            price: 'от € 8 334',
            image: 'img/chalet-map-2.jpg',
            image2x: 'img/chalet-map-2@2x.jpg',
            lat: 45.658610,
            lng: 10.393222,
        },
    ];

    const getMarkerIcon = (width, height) => {
        return {
            size: { width: width ? width : 48, height: height ? height : 53 },
            url: './img/marker.svg',
            scaledSize: new google.maps.Size(width ? width : 48, height ? height : 53)
        };
    };

    const getMarkerIconActive = () => {
        return {
            size: { width: 48, height: 53 },
            url: './img/marker-active.svg',
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
                        <span class="chalet-small-card__more-link">Узнать больше</span>
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
                const markerPosition = new google.maps.LatLng(item.lat, item.lng);
                const marker = new google.maps.Marker({
                    position: {lat: item.lat, lng: item.lng},
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
        loadMap('map', data, getContentCard);
    } else if (document.getElementById('map_resorts')) {
        loadMap('map_resorts', dataResorts, getContentCardResort);
    } else if (document.getElementById('map_chalet')) {
        async function initMap() {
            const { Map } = await google.maps.importLibrary('maps');
            const map = new Map(document.getElementById('map_chalet'), {
                center: { lat: 47.1684992, lng: 11.3893003 },
                zoom: 13,
                minZoom: 3,
                maxZoom: 17,
                mapTypeControl: false,
                streetViewControl: false,
            });

            map.setOptions({ styles: newStyles });

            new google.maps.Marker({
                position: { lat: 47.1684992, lng: 11.3893003 },
                map: map,
                icon: getMarkerIcon(64, 71),
            });
        }

        initMap();
    }
}
