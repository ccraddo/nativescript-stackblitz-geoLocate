import { Observable } from '@nativescript/core';
import * as geolocation from '@nativescript/geolocation';
import { CoreTypes } from '@nativescript/core';

export class HelloWorldModel extends Observable {
  private _counter: number;
  private _message: string;

  constructor() {
    super();

    // Initialize default values.
    this._counter = 42;
    this.updateMessage(null);
    geolocation.enableLocationRequest();
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

  onTap() {
    this._counter--;
    var location = geolocation.getCurrentLocation({
      desiredAccuracy: CoreTypes.Accuracy.high,
      maximumAge: 5000,
      timeout: 20000,
    });

    location.then((ful) => {
      this.updateMessage(ful);
    });
    // Get current location with high accuracy
  }

  private updateMessage(ful) {
    if (this._counter <= 0) {
      this.message =
        'Hoorraaay! You unlocked the NativeScript clicker achievement!';
    } else {
      this.message = `${this._counter}`;
    }

    // log the message to the console
    console.log(this.message);
    console.log(ful);
  }
}
