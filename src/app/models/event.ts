export interface IEvent {
  id: string;
  calendarCategoryId: CalendarCategory;
  title: string;
  locationType: string;
  location: string;
  startTime: Date;
  endTime: Date;
  allDayEvent: string;
  regionId: string;
  industry?: string;
  offeringId?: string;
  supportingMaterialsLink?: string;
  impactGoal?: string;
  eventOutcome?: string;
  partnerId?: string;
  createdDate?: string;
  createdBy?: string;
  ICSFile?: string;
  geographicalLocationId?: GeographicalLocation;
  _id?: string;
  description?: string;
}
export interface GeographicalLocation {
  id: string;
  locationName: string;
  address: string;
  description: string;
}
export interface Partner {
  id: string;
  partnerName: string;
  description: string;
}
export interface Region {
  id: string;
  regionName: string;
  description: string;
}
export interface Industry {
  id: string;
  industryName: string;
  description: string;
}
export interface CalendarCategory {
  id: string;
  categoryName: string;
  description: string;
  color: string;
}
