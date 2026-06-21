// =====================================================
// Project P2: Urban Heat Island Analysis
// Google Earth Engine JavaScript
// Author: NEELISETTY VENKATA NAGA TEJA
// =====================================================

// -----------------------------
// Area of Interest (AOI)
// -----------------------------
var geometry =
    ee.Geometry.Polygon(
        [[[79.4704720551217, 13.507351204025888],
          [79.4704720551217, 12.412632823473231],
          [80.57185144965295, 12.412632823473231],
          [80.57185144965295, 13.507351204025888]]],
        null, false);

// Center map
Map.centerObject(geometry, 9);

// -----------------------------
// Load Landsat 8 Collection 2 Level-2
// -----------------------------
var landsat = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(geometry)
  .filterDate('2023-01-01', '2023-12-31')
  .filter(ee.Filter.lt('CLOUD_COVER', 10));

// Median composite
var image = landsat.median().clip(geometry);

var optical = image.select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'])
  .multiply(0.0000275)
  .add(-0.2);

image = image.addBands(optical, null, true);

// -----------------------------
// RGB Visualization
// -----------------------------
Map.addLayer(image,{
  bands:['SR_B4','SR_B3','SR_B2'],
  min:0,
  max:0.3
},'Landsat 8 RGB');

// -----------------------------
// NDVI
// -----------------------------
var ndvi = image.normalizedDifference(['SR_B5','SR_B4']).rename('NDVI');

Map.addLayer(ndvi,{
  min:-0.2,
  max:0.8,
  palette:['brown','yellow','green']
},'NDVI');

print('NDVI Image', ndvi);

// -----------------------------
// NDBI
// -----------------------------
var ndbi = image.normalizedDifference(['SR_B6','SR_B5']).rename('NDBI');

Map.addLayer(ndbi,{
  min:-0.5,
  max:0.5,
  palette:['blue','white','red']
},'NDBI');

print('NDBI Image', ndbi);

// -----------------------------
// Land Surface Temperature (LST)
// -----------------------------
var lst = image.select('ST_B10')
  .multiply(0.00341802)
  .add(149.0)
  .subtract(273.15)
  .rename('LST');

Map.addLayer(lst,{
  min:20,
  max:45,
  palette:['blue','cyan','green','yellow','orange','red']
},'Land Surface Temperature');

print('LST Image', lst);

// -----------------------------
// Urban Heat Island (UHI)
// -----------------------------
var uhi = lst.gt(40);

Map.addLayer(
  uhi.updateMask(uhi),
  {palette:['red']},
  'Urban Heat Island'
);

print('Urban Heat Island Zones', uhi);

// -----------------------------
// LST Statistics
// -----------------------------
var stats = lst.reduceRegion({
  reducer: ee.Reducer.mean()
    .combine({
      reducer2: ee.Reducer.min(),
      sharedInputs: true
    })
    .combine({
      reducer2: ee.Reducer.max(),
      sharedInputs: true
    }),
  geometry: geometry,
  scale: 30,
  maxPixels: 1e13
});

print('LST Statistics', stats);

// -----------------------------
// Export LST
// -----------------------------
Export.image.toDrive({
  image: lst,
  description: 'Chennai_LST_Map',
  folder: 'EarthEngine',
  fileNamePrefix: 'Chennai_LST',
  region: geometry,
  scale: 30,
  maxPixels: 1e13
});

// -----------------------------
// UHI Area Calculation
// -----------------------------
var pixelArea = ee.Image.pixelArea();

var uhiArea = pixelArea.updateMask(uhi);

var uhiStats = uhiArea.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: geometry,
  scale: 30,
  maxPixels: 1e13
});

var uhiAreaSqKm = ee.Number(uhiStats.get('area')).divide(1000000);

print('Total UHI Area (sq. km)', uhiAreaSqKm);

// -----------------------------
// Export UHI
// -----------------------------
Export.image.toDrive({
  image: uhi,
  description: 'UHI_Zones_Chennai',
  folder: 'EarthEngine',
  fileNamePrefix: 'UHI_Zones_Chennai',
  region: geometry,
  scale: 30,
  maxPixels: 1e13
});

// -----------------------------
// Built-up Density vs Temperature
// -----------------------------
var builtupTemp = ndbi.addBands(lst);

Map.addLayer(
  ndbi,
  {
    min:-0.5,
    max:0.5,
    palette:['blue','white','red']
  },
  'Built-up Density (NDBI)'
);

Map.addLayer(
  lst,
  {
    min:20,
    max:45,
    palette:['blue','green','yellow','orange','red']
  },
  'Temperature (LST)'
);

print('Built-up Density and Temperature Relationship', builtupTemp);

// =====================================================
// End of Script
// =====================================================
