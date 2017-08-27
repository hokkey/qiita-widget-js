const gmapConfs = (() => {

  if ((typeof google === 'object' && typeof google.maps === 'object') === false) {
    throw new Error('GmapsAPI is not available!');
  }

  return {
    pins: {
      pin: {
        anchor: new google.maps.Point(15, 22),
        path: "",
        fillColor: '#000',
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 1
      }
    },
    mapStyle: [
    ],
    mapOptions: {
      sp: {
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        keyboardShortcuts: false,
        mapTypeControl: false,
        panControl: false,
        rotateControl: false,
        scaleControl: false,
        scrollwheel: false,
        streetViewControl: false,
        zoomControl: false,
        draggable: true,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, '']
        }
      },
      tb: {
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        keyboardShortcuts: false,
        mapTypeControl: false,
        panControl: false,
        rotateControl: false,
        scaleControl: false,
        scrollwheel: false,
        streetViewControl: false,
        zoomControl: true,
        draggable: true,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, '']
        }
      }
    }
  }
})();

export default gmapConfs;
