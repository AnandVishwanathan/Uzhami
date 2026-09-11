import React, { useState } from 'react';
import { Map as MapIcon, Layers, Wind, Thermometer, Droplets, Cloud } from 'lucide-react';

const FarmMap = () => {
  const [selectedLayer, setSelectedLayer] = useState('wind');

  const layers = [
    { id: 'wind', icon: Wind, label: 'Wind', param: 'wind' },
    { id: 'temp', icon: Thermometer, label: 'Temperature', param: 'temp' },
    { id: 'rain', icon: Droplets, label: 'Rain', param: 'rain' },
    { id: 'clouds', icon: Cloud, label: 'Clouds', param: 'clouds' },
    { id: 'pressure', icon: Layers, label: 'Pressure', param: 'pressure' }
  ];

  const getWindyUrl = (layer: string) => {
    return `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=5&overlay=${layer}&product=ecmwf&level=surface&lat=18.521&lon=73.85`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <MapIcon className="h-8 w-8 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Farm Map</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm dark:bg-gray-800">
        <div className="p-6">
          {/* Layer Controls */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Map Layers</h2>
            <div className="flex flex-wrap gap-3">
              {layers.map(layer => (
                <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.param)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedLayer === layer.param
                    ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <layer.icon className="h-5 w-5" />
                <span>{layer.label}</span>
              </button>
              ))}
            </div>
          </div>

          {/* Map Container */}
          <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900" style={{ height: '70vh' }}>
            <iframe
              src={getWindyUrl(selectedLayer)}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Windy Weather Map"
              className="absolute inset-0"
            />
          </div>

          {/* Legend */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">Map Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Wind Speed (km/h)</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-red-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Temperature (°C)</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Precipitation (mm)</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Cloud Cover (%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmMap;