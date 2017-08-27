import LazyEvent from 'class/util/lazy-event-util';
import Type from 'class/util/type-util';
import DEFAULT_GMAP_CONF from 'const/gmap-conf';
import getWindowWidth from 'util/window-width';

export default class Gmap {
  constructor(elem, defaultBp = 719) {

    //CHECK IF API LOADED SUCCESSFULLY
    if ((typeof google === 'object' && typeof google.maps === 'object') === false) {
      throw new Error('GmapsAPI is not available!');
    }

    if (!Type.isElem(elem)) {
      throw new Error('elem must be a HTMLElement!');
    }
    this.elem = elem;
    this.defaultBp = defaultBp;

    this.dataKeys = {
      pinStyle: 'pinStyle',
      lat: 'lat',
      lng: 'lng',
      bp: 'bp'
    };

    // DEFAULT OPTIONS
    [
      this.mapOptionSp,
      this.mapOptionTb,
      this.pins
    ] = this._getDefaultOptions();

    // GET VALUES FROM ELEMENT
    [
      this.breakpoint,
      this.pinStyle,
      this.center
    ] = this._getDataFrom(this.elem);
  }

  init() {
    this.map = this._initMap(this.elem, this.center);
    this._addPin(this.pinStyle, this.map, this.center);
    this.watcher = this._watchResize(this.map);
  }

  _getDefaultOptions() {
    const mapOptionSp = DEFAULT_GMAP_CONF.mapOptions.sp;
    const mapOptionTb = DEFAULT_GMAP_CONF.mapOptions.tb;
    const pins = DEFAULT_GMAP_CONF.pins;
    mapOptionSp.styles = DEFAULT_GMAP_CONF.mapStyle;
    mapOptionTb.styles = DEFAULT_GMAP_CONF.mapStyle;

    return [mapOptionSp, mapOptionTb, pins];
  }

  _getDataFrom(elem) {
    const bp = this._getBreakpointFrom(elem);
    const pinStyle = elem.dataset[this.dataKeys.pinStyle];
    const center = this._getLatLngFrom(elem);

    return [bp, pinStyle, center];
  }

  _getBreakpointFrom(elem) {
    const bp = elem.dataset[this.dataKeys.bp];
    if (typeof bp === 'undefined' || bp === null) {
      return this.defaultBp;
    }
    return bp;
  }

  _getLatLngFrom(elem) {
    const lat = parseFloat(elem.dataset[this.dataKeys.lat], 10);
    const lng = parseFloat(elem.dataset[this.dataKeys.lng], 10);

    if (isNaN(lat) || isNaN(lng)) {
      throw new Error('lat/ong value is NaN!');
    }
    return new google.maps.LatLng(lat, lng);
  }

  _getDeviceOption() {
    if (getWindowWidth() < this.breakpoint) {
      return this.mapOptionSp
    }
    return this.mapOptionTb;
  }

  _initMap(elem, center) {
    const option = this._getDeviceOption();
    option.center = center;
    return new google.maps.Map(elem, option);
  }

  _addPin(pinStyle, map, position) {
    switch (pinStyle) {

    //DEFAULT MARKER
    default:

      new google.maps.Marker({
        position: position,
        map: map,
        icon: this.pins.pin
      });

    }
  }

  _watchResize(map) {
    return LazyEvent.attachLazyResizeCb(window, () => {
      const center = map.getCenter();
      map.setCenter(center);
      google.maps.event.trigger(map, "resize");
      map.setOptions(this._getDeviceOption());
    }, 200);
  }
}
