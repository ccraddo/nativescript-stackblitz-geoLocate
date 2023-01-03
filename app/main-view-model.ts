import { Observable } from '@nativescript/core';
import * as geolocation from '@nativescript/geolocation';
import { CoreTypes } from '@nativescript/core';

export class HelloWorldModel extends Observable {
  private _counter: number;
  private _message: string;
  private _loc: geolocation.Location;
  private _lat: string;

  constructor() {
    super();
    // Initialize default values.
    geolocation.enableLocationRequest();
    this.getLocation();
    this._lat = 'Latitude: 0';
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    if (this._message !== value) {
      this._message = value;
      this.notifyPropertyChange('message', value);
    }
  }

  get lat(): string {
    if (this._lat !== 'undefined') return 'Latitude: ' + this._loc?.latitude;
    else return 'Latitude: 0';
  }

  set lat(value: string) {
    if (this._lat !== value) {
      this._lat = value;
      this.notifyPropertyChange('lat', value);
    }
  }

  get lng(): string {
    return this._loc?.longitude.toString();
  }

  get alt(): string {
    return this._loc?.altitude.toString();
  }

  onTap() {
    this.getLocation();
    console.log(this._loc);

    // Get current location with high accuracy
  }

  private updateMessage(ful) {
    if (this._counter <= 0) {
      this.message =
        'Hoorraaay! You unlocked the NativeScript clicker achievement!';
    } else {
      this.message = ` lat:${ful?.latitude} lng:${ful?.longitude}`;
    }

    // log the message to the console
    console.log(this.message);
    console.log(ful);
  }

  private getLocation() {
    var location = geolocation.getCurrentLocation({
      desiredAccuracy: CoreTypes.Accuracy.high,
      maximumAge: 5000,
      timeout: 20000,
    });

    location.then((ful) => {
      this._loc = ful;
      this.lat = 'Latitude: ' + this._loc?.latitude;
    });
  }
}
