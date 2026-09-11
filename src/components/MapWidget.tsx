import React, { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, WMSTileLayer, Polygon, Polyline, CircleMarker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Layers, Crop, Droplets, Thermometer, Wind, Bug, Sprout, X, Plus, BarChart, TrendingUp, ArrowRight } from 'lucide-react';
import Plot from 'react-plotly.js';

// Get Esri Tile URL
const ESRI_TILE_URL = import.meta.env.VITE_ESRI_TILE_URL || 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

interface FarmField {
  id: string;
  name: string;
  crop: string;
  area: string;
  moisture: string;
  health: 'good' | 'attention' | 'critical';
  coordinates: [number, number][]; // Leaflet uses [lat, lng], original was [lng, lat]. We will treat as [lat, lng] here.
}

// Convert original [lng, lat] to [lat, lng] for Leaflet
const initialFarmFields: FarmField[] = [
  {
    id: '1', name: 'North Field', crop: 'Wheat', area: '5.2 ha', moisture: '65%', health: 'good',
    coordinates: [[18.5104, 73.8467], [18.5104, 73.8567], [18.5204, 73.8567], [18.5204, 73.8467], [18.5104, 73.8467]]
  },
  {
    id: '2', name: 'South Field', crop: 'Corn', area: '3.8 ha', moisture: '58%', health: 'attention',
    coordinates: [[18.5004, 73.8467], [18.5004, 73.8567], [18.5104, 73.8567], [18.5104, 73.8467], [18.5004, 73.8467]]
  },
  {
    id: '3', name: 'East Field', crop: 'Soybeans', area: '4.5 ha', moisture: '45%', health: 'critical',
    coordinates: [[18.5104, 73.8567], [18.5104, 73.8667], [18.5204, 73.8667], [18.5204, 73.8567], [18.5104, 73.8567]]
  },
  {
    id: '4', name: 'West Field', crop: 'Rice', area: '6.0 ha', moisture: '72%', health: 'good',
    coordinates: [[18.5104, 73.8367], [18.5104, 73.8467], [18.5204, 73.8467], [18.5204, 73.8367], [18.5104, 73.8367]]
  }
];

const MapEvents = ({ 
  isDrawing, 
  onMapClick 
}: { 
  isDrawing: boolean; 
  onMapClick: (latlng: [number, number]) => void;
}) => {
  useMapEvents({
    click(e) {
      if (isDrawing) {
        onMapClick([e.latlng.lat, e.latlng.lng]);
      }
    }
  });
  return null;
};

function FitBoundsToFields({ fields }: { fields: typeof initialFarmFields }) {
  const map = useMap();

  useEffect(() => {
    if (fields.length === 0) return;
    const allPoints = fields.flatMap(field => field.coordinates);
    if (allPoints.length === 0) return;
    const bounds = L.latLngBounds(allPoints);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [fields, map]);

  return null;
}

const SoilLegend = () => {
  const legendItems = [
    { color: '#f0f63d', label: '< 5.0 (Strongly Acidic)' },
    { color: '#a5db36', label: '5.0 - 6.0 (Moderately Acidic)' },
    { color: '#4bb736', label: '6.0 - 7.0 (Neutral)' },
    { color: '#2a9945', label: '7.0 - 8.0 (Slightly Alkaline)' },
    { color: '#0fccd9', label: '> 8.0 (Strongly Alkaline)' },
    { color: '#ffffff', label: 'No Data / Unclassified', border: true }
  ];

  return (
    <div className="absolute bottom-4 left-4 z-[400] bg-gray-900/90 text-gray-100 p-3 rounded-lg shadow-lg border border-gray-700 text-sm backdrop-blur-sm pointer-events-none">
      <div className="font-semibold mb-2 text-white">Soil pH (0-5cm)</div>
      <div className="space-y-1.5">
        {legendItems.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div 
              className={`w-4 h-4 rounded-sm ${item.border ? 'border border-gray-500' : ''}`}
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-[10px] text-gray-400">Source: SoilGrids &copy; ISRIC</div>
    </div>
  );
};

const MapWidget = () => {
  const [activeLayer, setActiveLayer] = useState<string>('satellite');
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawPoints, setDrawPoints] = useState<[number, number][]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [farmFields, setFarmFields] = useState<FarmField[]>(initialFarmFields);
  const [newField, setNewField] = useState({
    name: '', crop: '', area: '', moisture: '', health: 'good' as const
  });

  const startDrawing = () => {
    setIsDrawing(true);
    setDrawPoints([]);
    setSelectedField(null);
  };

  const handleMapClick = useCallback((latlng: [number, number]) => {
    setDrawPoints(prev => [...prev, latlng]);
  }, []);

  const finishDrawing = () => {
    if (drawPoints.length >= 3) {
      const closedPolygon = [...drawPoints, drawPoints[0]];
      setShowAddModal(true);
      setNewField(prev => ({
        ...prev,
        area: calculateArea(closedPolygon).toFixed(1) + ' ha'
      }));
    }
    setIsDrawing(false);
  };

  // Very rough area calculation for demonstration
  const calculateArea = (coordinates: [number, number][]): number => {
    const latLngs = coordinates.map(([lat, lng]) => ({ lat, lng }));
    let area = 0;
    for (let i = 0; i < latLngs.length - 1; i++) {
      area += (latLngs[i].lng * latLngs[i + 1].lat) - (latLngs[i + 1].lng * latLngs[i].lat);
    }
    return Math.abs(area) * 10000;
  };

  const handleAddField = () => {
    const newFieldData: FarmField = {
      id: (farmFields.length + 1).toString(),
      coordinates: [...drawPoints, drawPoints[0]],
      ...newField
    };
    setFarmFields(prev => [...prev, newFieldData]);
    setShowAddModal(false);
    setDrawPoints([]);
    setNewField({ name: '', crop: '', area: '', moisture: '', health: 'good' });
  };

  const calculateAnalytics = () => {
    const totalArea = farmFields.reduce((sum, field) => sum + parseFloat(field.area.split(' ')[0]), 0);
    const cropDistribution = farmFields.reduce((acc, field) => {
      acc[field.crop] = (acc[field.crop] || 0) + parseFloat(field.area.split(' ')[0]);
      return acc;
    }, {} as Record<string, number>);
    const healthDistribution = farmFields.reduce((acc, field) => {
      acc[field.health] = (acc[field.health] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const avgMoisture = farmFields.reduce((sum, field) => sum + parseFloat(field.moisture.replace('%', '')), 0) / farmFields.length;
    return { totalArea, cropDistribution, healthDistribution, avgMoisture };
  };

  const getLayerUrl = (type: string): string => {
    switch (type) {
      case 'satellite': return ESRI_TILE_URL;
      case 'terrain': return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      case 'soil': return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      default: return ESRI_TILE_URL;
    }
  };

  const getLayerAttribution = (type: string): string => {
    switch (type) {
      case 'satellite': return 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
      case 'terrain': return 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)';
      case 'soil': return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      default: return 'Tiles &copy; Esri';
    }
  };

  const getHealthColor = (health: string, isFill = false): string => {
    switch (health) {
      case 'good': return isFill ? '#10B981' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'attention': return isFill ? '#FBBF24' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'critical': return isFill ? '#EF4444' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return isFill ? '#9CA3AF' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const layerOptions = [
    { id: 'satellite', icon: Layers, label: 'Satellite View' },
    { id: 'terrain', icon: MapPin, label: 'Terrain View' },
    { id: 'soil', icon: Sprout, label: 'Soil Map' }
  ];

  const renderAnalytics = () => {
    const analytics = calculateAnalytics();
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Field Analytics</h2>
            <button onClick={() => setShowAnalytics(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-400">Total Area</h3>
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-500" />
              </div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-500">{analytics.totalArea.toFixed(1)} ha</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-400">Avg. Moisture</h3>
                <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-500">{analytics.avgMoisture.toFixed(1)}%</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Total Fields</h3>
                <Crop className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">{farmFields.length}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Crop Distribution</h3>
              <Plot
                data={[{ values: Object.values(analytics.cropDistribution), labels: Object.keys(analytics.cropDistribution), type: 'pie' }]}
                layout={{ height: 300, margin: { t: 0, r: 0, l: 0, b: 0 }, paper_bgcolor: 'transparent', plot_bgcolor: 'transparent', font: { color: document.documentElement.classList.contains('dark') ? '#fff' : '#000' } }}
                config={{ responsive: true, displayModeBar: false }}
              />
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Field Health Status</h3>
              <Plot
                data={[{ x: Object.keys(analytics.healthDistribution), y: Object.values(analytics.healthDistribution), type: 'bar', marker: { color: ['#10B981', '#F59E0B', '#EF4444'] } }]}
                layout={{ height: 300, margin: { t: 0, r: 0, l: 40, b: 40 }, paper_bgcolor: 'transparent', plot_bgcolor: 'transparent', font: { color: document.documentElement.classList.contains('dark') ? '#fff' : '#000' } }}
                config={{ responsive: true, displayModeBar: false }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Agricultural Fields</h2>
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-green-600" />
          <span className="text-sm text-gray-600 dark:text-gray-300">Pune Region</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700 dark:text-gray-300">Map Layers</h3>
          <div className="space-y-2">
            {layerOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setActiveLayer(option.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  activeLayer === option.id ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <option.icon className="h-5 w-5" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 space-y-4">
          {isDrawing && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-blue-700 dark:text-blue-300">Click on the map to draw field boundaries. Click at least 3 points to create a field.</p>
              <div className="flex gap-2 mt-2">
                <button onClick={finishDrawing} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Finish Drawing</button>
                <button onClick={() => { setIsDrawing(false); setDrawPoints([]); }} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Cancel</button>
              </div>
            </div>
          )}

          <div className="aspect-[16/9] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 z-0 relative">
            <MapContainer 
              center={[18.515, 73.85]} 
              zoom={13} 
              style={{ height: '100%', width: '100%', zIndex: 0 }}
              className="z-0"
            >
              <FitBoundsToFields fields={farmFields} />
              
              {activeLayer === 'soil' ? (
                <WMSTileLayer
                  url="https://maps.isric.org/mapserv?map=/map/phh2o.map"
                  layers="phh2o_0-5cm_mean"
                  format="image/png"
                  transparent={true}
                  attribution="SoilGrids &copy; ISRIC"
                />
              ) : (
                <TileLayer url={getLayerUrl(activeLayer)} attribution={getLayerAttribution(activeLayer)} />
              )}
              
              <MapEvents isDrawing={isDrawing} onMapClick={handleMapClick} />

              {farmFields.map(field => (
                <Polygon 
                  key={field.id} 
                  positions={field.coordinates} 
                  pathOptions={{ 
                    color: '#000000', 
                    weight: 2, 
                    fillColor: getHealthColor(field.health, true), 
                    fillOpacity: 0.5 
                  }} 
                  eventHandlers={{ click: () => setSelectedField(field.id) }} 
                />
              ))}

              {drawPoints.length > 0 && (
                <>
                  <Polyline positions={drawPoints} pathOptions={{ color: '#2563EB', weight: 2, dashArray: '2, 1' }} />
                  {drawPoints.map((pt, i) => <CircleMarker key={i} center={pt} radius={5} pathOptions={{ color: '#2563EB' }} />)}
                </>
              )}
            </MapContainer>
            
            {activeLayer === 'soil' && <SoilLegend />}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {farmFields.map(field => (
              <div key={field.id} className={`p-4 rounded-lg border transition-colors ${selectedField === field.id ? 'border-green-500 bg-green-50 dark:border-green-600 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">{field.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-300">Crop:</span><span className="font-medium dark:text-gray-200">{field.crop}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-300">Area:</span><span className="font-medium dark:text-gray-200">{field.area}</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-600 dark:text-gray-300">Health:</span><span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(field.health)}`}>{field.health}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button onClick={startDrawing} disabled={isDrawing} className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
          <Plus className="h-5 w-5" /> Draw New Field
        </button>
        <button onClick={() => setShowAnalytics(true)} className="flex-1 border border-green-600 text-green-600 py-2 px-4 rounded-lg hover:bg-green-50 transition-colors dark:text-green-400 flex items-center justify-center gap-2">
          <BarChart className="h-5 w-5" /> View Analytics
        </button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Add New Field</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddField(); }} className="space-y-4">
              <input type="text" required value={newField.name} onChange={(e) => setNewField(prev => ({ ...prev, name: e.target.value }))} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" placeholder="Field name" />
              <input type="text" required value={newField.crop} onChange={(e) => setNewField(prev => ({ ...prev, crop: e.target.value }))} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" placeholder="Crop type" />
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => { setShowAddModal(false); setDrawPoints([]); }} className="px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300 dark:border-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">Add Field</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showAnalytics && renderAnalytics()}
    </div>
  );
};

export default MapWidget;