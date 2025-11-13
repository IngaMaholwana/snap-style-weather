import { WeatherData } from "@/types/weather";

class WeatherService {
  private API_KEY = "F8MXLZXQYEVGS58KTN4JLY7RX";
  private BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

  async getData(location: string, unit: string = "us"): Promise<any> {
    const response = await fetch(
      `${this.BASE_URL}${location}?key=${this.API_KEY}&unitGroup=${unit}&include=hours,current`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    return await response.json();
  }

  async getWeather(location: string, unit: string = "us"): Promise<WeatherData> {
    try {
      const data = await this.getData(location, unit);
      return this.transformResponse(data);
    } catch (error) {
      throw new Error("No Results Found");
    }
  }

  transformResponse(data: any): WeatherData {
    const todaysData = data.currentConditions;
    const location = this.splitLocation(data.resolvedAddress);
    
    return {
      ...todaysData,
      days: this.getNextDaysWeather(data),
      description: data.description,
      city: location.city,
      country: location.country,
      timezone: data.timezone,
    };
  }

  splitLocation(address: string): { city: string; country: string } {
    const parts = address.split(",");
    const response = { city: "", country: "" };
    
    if (parts.length > 1) {
      response.city = parts.slice(0, parts.length - 1).join(",").trim();
      response.country = parts[parts.length - 1].trim();
    } else {
      response.city = parts.join("").trim();
    }
    
    return response;
  }

  getNextDaysWeather(data: any) {
    return data.days.slice(0, 7);
  }

  async getCurrentLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  async getWeatherByCoordinates(lat: number, lng: number, unit: string = "metric"): Promise<WeatherData> {
    return this.getWeather(`${lat},${lng}`, unit);
  }
}

export const weatherService = new WeatherService();
