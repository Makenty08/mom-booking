interface DayPlan {
  morning: string;
  afternoon: string;
  evening: string;
}

export interface TripPLan {
  [key: string]: DayPlan;
}

export interface Request {
  cityName: string;
  checkIn: string;
  checkOut: string;
}
