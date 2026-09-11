import axios from 'axios';
import { format, parseISO, isValid } from 'date-fns';

export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
    precipitation: number;
    uvIndex: number;
    cloudCover: number;
    feelsLike: number;
    visibility: number;
    pressure: number;
  };
  forecast: Array<{
    date: string;
    temp: number;
    tempMin: number;
    tempMax: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
    precipitation: number;
    uvIndex: number;
    cloudCover: number;
    sunrise: string;
    sunset: string;
  }>;
  hourly: Array<{
    time: string;
    temp: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    cloudCover: number;
    conditions: string;
  }>;
}

class WeatherAPI {
  private static BASE_URL = import.meta.env.VITE_OPEN_METEO_FORECAST_API || 'https://api.open-meteo.com/v1/forecast';
  private static GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

  static async getWeatherData(location: string): Promise<WeatherData> {
    try {
      // 1. Geocode the location
      const geoResponse = await axios.get(this.GEOCODE_URL, {
        params: {
          name: location,
          count: 1,
          format: 'json'
        }
      });

      if (!geoResponse.data?.results?.length) {
        throw new Error('Location not found');
      }

      const { latitude, longitude } = geoResponse.data.results[0];

      // 2. Fetch weather from Open-Meteo
      const response = await axios.get(this.BASE_URL, {
        params: {
          latitude,
          longitude,
          current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,cloud_cover,weather_code,surface_pressure,apparent_temperature',
          hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,cloud_cover,weather_code',
          daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum',
          timezone: 'auto'
        }
      });

      if (!response.data) {
        throw new Error('Invalid weather data format');
      }

      const data = response.data;

      // Helper function to format dates
      const formatDate = (dateString: string | undefined, formatString: string): string => {
        if (!dateString) return 'Invalid Date';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Invalid Date' : format(date, formatString);
      };

      // Process current weather
      const current = {
        temp: Math.round(data.current?.temperature_2m || 0),
        humidity: data.current?.relative_humidity_2m || 0,
        windSpeed: Math.round(data.current?.wind_speed_10m || 0),
        description: this.getWeatherDescription(data.current?.weather_code),
        icon: this.getWeatherIcon(data.current?.weather_code),
        precipitation: data.current?.precipitation || 0,
        uvIndex: data.daily?.uv_index_max?.[0] || 0,
        cloudCover: data.current?.cloud_cover || 0,
        feelsLike: Math.round(data.current?.apparent_temperature || 0),
        visibility: 10,
        pressure: data.current?.surface_pressure || 1013
      };

      // Process daily forecast
      const forecast = [];
      const daysCount = data.daily?.time?.length || 0;
      for (let i = 1; i < Math.min(daysCount, 8); i++) {
        forecast.push({
          date: formatDate(data.daily.time[i], 'yyyy-MM-dd'),
          temp: Math.round((data.daily.temperature_2m_max[i] + data.daily.temperature_2m_min[i]) / 2),
          tempMin: Math.round(data.daily.temperature_2m_min[i]),
          tempMax: Math.round(data.daily.temperature_2m_max[i]),
          humidity: 50, // Approximation
          windSpeed: 0, // Approximation
          description: this.getWeatherDescription(data.daily.weather_code[i]),
          icon: this.getWeatherIcon(data.daily.weather_code[i]),
          precipitation: data.daily.precipitation_sum[i] || 0,
          uvIndex: data.daily.uv_index_max[i] || 0,
          cloudCover: 50, // Approximation
          sunrise: formatDate(data.daily.sunrise[i], 'HH:mm'),
          sunset: formatDate(data.daily.sunset[i], 'HH:mm')
        });
      }

      // Process hourly forecast for the next 24 hours
      const hourly = [];
      const currentHourIndex = data.hourly?.time?.findIndex((t: string) => new Date(t) > new Date()) || 0;
      const startIndex = Math.max(0, currentHourIndex - 1);
      
      for (let i = startIndex; i < Math.min(startIndex + 24, data.hourly?.time?.length || 0); i++) {
        hourly.push({
          time: formatDate(data.hourly.time[i], 'HH:mm'),
          temp: Math.round(data.hourly.temperature_2m[i]),
          humidity: data.hourly.relative_humidity_2m[i],
          windSpeed: Math.round(data.hourly.wind_speed_10m[i]),
          precipitation: data.hourly.precipitation[i] || 0,
          cloudCover: data.hourly.cloud_cover[i] || 0,
          conditions: this.getWeatherDescription(data.hourly.weather_code[i])
        });
      }

      return {
        current,
        forecast,
        hourly
      };
    } catch (error) {
      console.error('Weather API Error:', error);
      throw new Error('Failed to fetch weather data. Please try again.');
    }
  }

  private static getWeatherDescription(code: number | undefined): string {
    if (code === undefined) return 'Clear';
    // WMO Weather interpretation codes
    const codes: Record<number, string> = {
      0: 'Clear sky',
      1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Fog', 48: 'Depositing rime fog',
      51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
      61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
      71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
      80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
      95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail'
    };
    return codes[code] || 'Clear';
  }

  private static getWeatherIcon(code: number | undefined): string {
    if (code === undefined) return '☀️';
    if (code === 0 || code === 1) return '☀️';
    if (code === 2) return '⛅';
    if (code === 3) return '☁️';
    if (code >= 45 && code <= 48) return '🌫️';
    if (code >= 51 && code <= 65) return '🌧️';
    if (code >= 71 && code <= 77) return '🌨️';
    if (code >= 80 && code <= 82) return '🌧️';
    if (code >= 95 && code <= 99) return '⛈️';
    return '☀️';
  }
}

export default WeatherAPI;