import axios from 'axios';
import { format, subDays } from 'date-fns';

class WeatherAnalyticsAPI {
  private static BASE_URL = import.meta.env.VITE_OPEN_METEO_ARCHIVE_API || 'https://archive-api.open-meteo.com/v1/archive';
  private static GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

  static async getAnalyticsData(location: string) {
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

      // 2. Fetch historical data from Open-Meteo for the last 30 days
      const endDate = format(new Date(), 'yyyy-MM-dd');
      const startDate = format(subDays(new Date(), 30), 'yyyy-MM-dd');

      const response = await axios.get(this.BASE_URL, {
        params: {
          latitude,
          longitude,
          start_date: startDate,
          end_date: endDate,
          daily: [
            'temperature_2m_mean',
            'temperature_2m_max',
            'temperature_2m_min',
            'precipitation_sum',
            'wind_speed_10m_max',
            'wind_direction_10m_dominant',
            'shortwave_radiation_sum', // rough equivalent for solar radiation
            'et0_fao_evapotranspiration'
          ].join(','),
          hourly: [
            'relative_humidity_2m',
            'dew_point_2m',
            'surface_pressure',
            'soil_temperature_0_to_7cm',
            'soil_moisture_0_to_7cm'
          ].join(','),
          timezone: 'auto'
        }
      });

      console.log('Raw Open-Meteo Archive Response:', response.data);

      if (!response.data || !response.data.daily) {
        throw new Error('Invalid response format from Open-Meteo Archive API');
      }

      const { daily, hourly } = response.data;
      const daysCount = daily.time.length;
      
      // Transform Open-Meteo data into the format expected by AnalyticsPage
      const transformedDays = [];
      
      for (let i = 0; i < daysCount; i++) {
        // Find corresponding hourly indices for this day (24 hours per day)
        const hourStart = i * 24;
        const hourEnd = hourStart + 24;
        
        // Calculate daily averages for hourly metrics
        let avgHumidity = 0;
        let avgDew = 0;
        let avgPressure = 0;
        let avgSoilTemp = 0;
        let avgSoilMoisture = 0;
        let validHoursCount = 0;

        for (let j = hourStart; j < Math.min(hourEnd, hourly.time?.length || 0); j++) {
          if (hourly.relative_humidity_2m[j] !== null) {
            avgHumidity += hourly.relative_humidity_2m[j];
            avgDew += hourly.dew_point_2m[j];
            avgPressure += hourly.surface_pressure[j];
            avgSoilTemp += hourly.soil_temperature_0_to_7cm[j] || 0;
            avgSoilMoisture += hourly.soil_moisture_0_to_7cm[j] || 0;
            validHoursCount++;
          }
        }

        if (validHoursCount > 0) {
          avgHumidity /= validHoursCount;
          avgDew /= validHoursCount;
          avgPressure /= validHoursCount;
          avgSoilTemp /= validHoursCount;
          avgSoilMoisture /= validHoursCount;
        }

        transformedDays.push({
          datetime: daily.time[i],
          temp: daily.temperature_2m_mean[i],
          tempmax: daily.temperature_2m_max[i],
          tempmin: daily.temperature_2m_min[i],
          precip: daily.precipitation_sum[i],
          windspeed: daily.wind_speed_10m_max[i],
          winddir: daily.wind_direction_10m_dominant[i] || 0,
          dniradiation: daily.shortwave_radiation_sum[i] || 0, // MJ/m2 to W/m2 approximation or direct use
          et0: daily.et0_fao_evapotranspiration[i],
          humidity: avgHumidity,
          dew: avgDew,
          pressure: avgPressure,
          soiltemp01: avgSoilTemp,
          soilmoisture01: avgSoilMoisture
        });
      }

      return { days: transformedDays };
    } catch (error) {
      console.error('Weather Analytics API Error:', error);
      throw new Error('Failed to fetch historical weather data');
    }
  }
}

export default WeatherAnalyticsAPI;