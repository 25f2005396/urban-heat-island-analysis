# 🌡️ Urban Heat Island Analysis — Chennai

> **Project P2 | Indian Space Academy — Remote Sensing & GIS Internship**  
> Mapping Urban Heat Islands using Land Surface Temperature, Built-up Density, and GIS Analysis

---

## 📌 Overview

This project analyzes the **Urban Heat Island (UHI)** effect in **Chennai, Tamil Nadu, India** using Landsat-8 satellite imagery processed on **Google Earth Engine (GEE)**. It derives NDVI, NDBI, and Land Surface Temperature (LST) to identify thermal hotspots driven by urban development.

---

## 🗂️ Repository Structure

```
URBAN-HEAT-ISLAND-ANALYSIS/
│
├── Images/
│   ├── AOI.png                    # Area of Interest map
│   ├── Landsat_RGB.png            # Landsat-8 RGB composite
│   ├── NDVI.png                   # Vegetation index map
│   ├── NDBI.png                   # Built-up density map
│   ├── LST.png                    # Land Surface Temperature map
│   ├── LST_NDBI_Relationship.png  # LST vs NDBI correlation
│   ├── LST_Statistics.png         # GEE console statistics output
│   └── UHI_Zones.png              # Urban Heat Island zones map
│
├── Urban_Heat_Island_Analysis_GEE.js   # Google Earth Engine script
├── Urban_Heat_Island_Analysis_Report.pdf
└── README.md
```

---

## 🎯 Objectives

- Calculate **Land Surface Temperature (LST)** from Landsat-8 thermal band
- Map **vegetation cover** using NDVI and **built-up areas** using NDBI
- Identify **Urban Heat Island zones** (LST > 40°C)
- Analyze the spatial relationship between urbanization and surface temperature

---

## 🛰️ Data Used

| Parameter     | Details                                      |
|---------------|----------------------------------------------|
| Satellite     | Landsat-8 OLI/TIRS Collection 2 Level 2      |
| Platform      | Google Earth Engine (GEE)                    |
| Study Area    | Chennai, Tamil Nadu, India                   |
| Date Range    | 01 January 2023 – 31 December 2023           |
| Cloud Cover   | < 10%                                        |

### Bands Used

| Band            | Description         | Purpose              |
|-----------------|---------------------|----------------------|
| Band 4 (Red)    | Red wavelength      | NDVI calculation     |
| Band 5 (NIR)    | Near Infrared       | NDVI & NDBI calculation |
| Band 6 (SWIR)   | Short Wave Infrared | NDBI calculation     |
| Band 10 (TIRS)  | Thermal Infrared    | LST calculation      |

---

## 🔬 Methodology

```
AOI Definition → Load Landsat-8 → NDVI → NDBI → LST → UHI Zones → Export
```

1. **AOI Selection** — Rectangular region covering Chennai & surroundings defined in GEE
2. **Landsat-8 Loading** — Median composite of cloud-free imagery (< 10% cloud cover)
3. **NDVI** — `(NIR − Red) / (NIR + Red)` — identifies vegetation cover
4. **NDBI** — `(SWIR − NIR) / (SWIR + NIR)` — identifies built-up areas
5. **LST** — Derived from Band 10 (thermal), converted from Kelvin to °C
6. **UHI Identification** — Pixels with LST > 40°C classified as UHI zones
7. **Export** — Results saved as GeoTIFF (`.tif`) for use in GIS software

---

## 📊 Results

| Parameter      | Value           |
|----------------|-----------------|
| Minimum LST    | 24.84 °C        |
| Mean LST       | 36.34 °C        |
| Maximum LST    | 73.72 °C        |
| Total UHI Area | 3,732.99 sq. km |

**Key Findings:**
- Densely built-up regions consistently showed higher surface temperatures
- Vegetated and coastal areas exhibited significantly lower LST values
- A strong positive correlation was observed between NDBI and LST
- UHI zones cover a substantial portion of the Chennai metropolitan region

---

## 🚀 How to Run

1. Open [Google Earth Engine Code Editor](https://code.earthengine.google.com/)
2. Copy and paste the script from `Urban_Heat_Island_Analysis_GEE.js`
3. Click **Run** — the maps will render in the GEE viewer
4. Use the **Tasks** panel to export LST and UHI rasters to Google Drive

> **Note:** A free GEE account is required. Sign up at [earthengine.google.com](https://earthengine.google.com/)

---

## 🛠️ Tools & Technologies

- **Google Earth Engine** — Cloud-based satellite image processing
- **Landsat-8 OLI/TIRS** — Multispectral + thermal satellite data (USGS)
- **QGIS** *(optional)* — For further visualization and cartographic output

---

## 📚 References

1. [Google Earth Engine](https://earthengine.google.com/)
2. [GEE Code Editor](https://code.earthengine.google.com/)
3. [USGS EarthExplorer](https://earthexplorer.usgs.gov/)
4. [GEE Data Catalog — Landsat 8 Collection 2 Level 2](https://developers.google.com/earth-engine/datasets/catalog/LANDSAT_LC08_C02_T1_L2)

---

## 👤 Author

**Neelisetty Venkata Naga Teja**  
Student Intern — Vellore Institute of Technology, Chennai  
Indian Space Academy | Remote Sensing & GIS Internship

---

## 📄 License

This project was developed as part of an academic internship. Feel free to reference or build upon it with appropriate attribution.