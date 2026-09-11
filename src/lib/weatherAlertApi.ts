import axios from 'axios';

export interface WeatherAlert {
  headline: string;
  severity: 'Minor' | 'Moderate' | 'Severe' | 'Extreme';
  urgency: string;
  areas: string;
  category: string;
  certainty: string;
  event: string;
  note: string;
  effective: string;
  expires: string;
  desc: string;
  instruction: string;
}

export interface WeatherAlertResponse {
  alerts: WeatherAlert[];
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
  };
}

class WeatherAlertAPI {
  private static FORECAST_URL = import.meta.env.VITE_OPEN_METEO_FORECAST_API || 'https://api.open-meteo.com/v1/forecast';
  private static GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

  static async getAlerts(location: string): Promise<WeatherAlertResponse> {
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

      const locData = geoResponse.data.results[0];

      // 2. Fetch forecast to derive alerts locally
      const response = await axios.get(this.FORECAST_URL, {
        params: {
          latitude: locData.latitude,
          longitude: locData.longitude,
          current: 'temperature_2m,wind_speed_10m,precipitation',
          daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max',
          timezone: 'auto'
        }
      });

      if (!response.data) {
        throw new Error('Invalid response from Open-Meteo');
      }

      const current = response.data.current;
      const daily = response.data.daily;
      const derivedAlerts: WeatherAlert[] = [];
      const now = new Date().toISOString();
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

      // Check High Wind Warning
      if (current.wind_speed_10m > 40 || daily.wind_speed_10m_max[0] > 40) {
        derivedAlerts.push({
          headline: 'High Wind Warning',
          severity: 'Severe',
          urgency: 'Expected',
          areas: location,
          category: 'Met',
          certainty: 'Likely',
          event: 'High Wind',
          note: 'Derived from Open-Meteo Forecast',
          effective: now,
          expires: expires,
          desc: `Wind speeds are expected to exceed 40 km/h.`,
          instruction: 'Secure loose objects and take precautions for high winds.'
        });
      }

      // Check Heavy Rain
      if (current.precipitation > 20 || daily.precipitation_sum[0] > 50) {
        derivedAlerts.push({
          headline: 'Heavy Rainfall Warning',
          severity: 'Severe',
          urgency: 'Expected',
          areas: location,
          category: 'Met',
          certainty: 'Likely',
          event: 'Heavy Rain',
          note: 'Derived from Open-Meteo Forecast',
          effective: now,
          expires: expires,
          desc: `Heavy rainfall expected in your area.`,
          instruction: 'Ensure adequate field drainage and pause susceptible operations.'
        });
      }

      // Check Frost
      if (current.temperature_2m < 2 || daily.temperature_2m_min[0] < 2) {
        derivedAlerts.push({
          headline: 'Frost Advisory',
          severity: 'Moderate',
          urgency: 'Expected',
          areas: location,
          category: 'Met',
          certainty: 'Likely',
          event: 'Frost',
          note: 'Derived from Open-Meteo Forecast',
          effective: now,
          expires: expires,
          desc: `Temperatures are dropping near freezing. Frost is likely.`,
          instruction: 'Protect sensitive crops and plants from frost damage.'
        });
      }

      // Check Heat
      if (current.temperature_2m > 40 || daily.temperature_2m_max[0] > 40) {
        derivedAlerts.push({
          headline: 'Extreme Heat Warning',
          severity: 'Severe',
          urgency: 'Expected',
          areas: location,
          category: 'Met',
          certainty: 'Likely',
          event: 'Extreme Heat',
          note: 'Derived from Open-Meteo Forecast',
          effective: now,
          expires: expires,
          desc: `Temperatures exceeding 40°C.`,
          instruction: 'Increase crop irrigation and avoid outdoor labor during peak hours.'
        });
      }

      return {
        alerts: derivedAlerts,
        location: {
          name: locData.name,
          region: locData.admin1 || '',
          country: locData.country || '',
          lat: locData.latitude,
          lon: locData.longitude
        }
      };
    } catch (error) {
      console.error('Weather Alert Error:', error);
      // Fail gracefully returning empty alerts instead of crashing
      return {
        alerts: [],
        location: { name: location, region: '', country: '', lat: 0, lon: 0 }
      };
    }
  }

  static getSeverityColor(severity: string): string {
    switch (severity.toLowerCase()) {
      case 'minor':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'moderate':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'severe':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'extreme':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  }
}

export default WeatherAlertAPI;