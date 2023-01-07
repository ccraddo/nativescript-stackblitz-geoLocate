import { EventData, Page } from '@nativescript/core';
import { LocationModel } from './main-view-model';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;

  page.bindingContext = new LocationModel();
}
