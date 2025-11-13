export interface WeatherConditions {
  temp: number;
  feelslike: number;
  humidity: number;
  precip: number;
  precipprob: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  cloudcover: number;
  visibility: number;
  uvindex: number;
  conditions: string;
  icon: string;
  datetime: string;
}

export interface DayWeather {
  datetime: string;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslike: number;
  humidity: number;
  precip: number;
  precipprob: number;
  windspeed: number;
  pressure: number;
  cloudcover: number;
  visibility: number;
  uvindex: number;
  conditions: string;
  description: string;
  icon: string;
  hours: WeatherConditions[];
}

export interface WeatherData extends WeatherConditions {
  days: DayWeather[];
  description: string;
  city: string;
  country: string;
  timezone: string;
}

export interface FavoriteCity {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
