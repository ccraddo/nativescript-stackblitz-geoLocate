import { Observable } from '@nativescript/core';
import * as geolocation from '@nativescript/geolocation';
import { CoreTypes } from '@nativescript/core';

export class LocationModel extends Observable {
  private _message: string;
  private _lat: string = '';
  private _lng: string = '';
  private _alt: string = '';

  constructor() {
    super();
    console.log('constructor');
    this.getLocation();
  }

  get lat(): string {
    if (this._lat !== 'undefined') return 'Latitude: ' + this._lat;
    else return 'Latitude: 0';
  }

  set lat(value: string) {
    if (this._lat !== value && value !== 'undefined') {
      this._lat = value;
      this.notifyPropertyChange('lat', value);
    }
  }

  get lng(): string {
    if (this._lng !== 'undefined') return 'Lognitude: ' + this._lng;
    else return 'Longitude: 0';
  }

  set lng(value: string) {
    if (this._lng != value && value !== 'undefined') {
      this._lng = value;
      this.notifyPropertyChange('lng', value);
    }
  }

  get alt(): string {
    if (this._alt !== 'undefined') return 'Elevation: ' + this._alt;
    else return 'Elevation: 0';
  }

  set alt(value: string) {
    if (this._alt != value && value !== 'undefined') {
      this._alt = value;
      this.notifyPropertyChange('alt', value);
    }
  }

  onTap() {
    this.getLocation();
  }

  private getLocation() {
    console.log('getLocation()');
    var gl = geolocation
      .isEnabled()
      .then((isEnabled) => {
        console.log(`isEnabled= ${isEnabled}`);
        if (!isEnabled) {
          console.log('send enabled location request');
          gl = geolocation
            .enableLocationRequest(true, true)
            .then(() => {
              console.log('enabled location request');
              geolocation
                .getCurrentLocation({
                  desiredAccuracy: CoreTypes.Accuracy.high,
                  maximumAge: 5000,
                  timeout: 20000,
                })
                .then((loc) => {
                  console.log(
                    `getCurrentLocation inside enable loc ${JSON.stringify(
                      loc
                    )}`
                  );
                  this.setLatLongAlt(loc);
                });
            })
            .catch((e) => {
              console.log('catch geolocation.enableLocationRequest');
              console.log(e);
            });
        } else {
          console.log(`getCurrentLocation isEnabled = ${isEnabled}`);
          geolocation
            .getCurrentLocation({
              desiredAccuracy: CoreTypes.Accuracy.high,
              maximumAge: 5000,
              timeout: 20000,
            })
            .then((loc) => {
              console.log(`already enabled loc = ${JSON.stringify(loc)}`);
              this.setLatLongAlt(loc);
            })
            .catch((error) => {
              console.log(
                `catch geolocation.getCurrentLocation error ${error}`
              );
            });
        }
      })
      .catch((reason) => {
        console.log(`catch geolocation.isEnabled reason = ${reason}`);
      });

    console.log('exit getLocation');
  }

  // convert meters to feet
  private m2f(meters: number): number {
    return meters * 3.28084;
  }

  private setLatLongAlt(loc: geolocation.Location) {
    const { latitude, longitude, altitude } = loc;
    console.log(`lat = ${latitude}`);
    let curLoc = JSON.parse(JSON.stringify(loc));
    this.lat = 'Latitude: ' + latitude;
    this.lng = 'Longitude: ' + longitude;
    this.alt =
      '' +
      this.r(altitude, 1) +
      'm/' +
      this.r(this.m2f(altitude), 0).toString() +
      'ft';
  }
  private r(n: number, places: number) {
    let roundedNumber = Math.trunc(
      (n * Math.pow(10, places)) / Math.pow(10, places)
    );

    return roundedNumber;
  }
}
