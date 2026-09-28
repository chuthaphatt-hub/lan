# GeoJSON data directory

The supplied research GeoJSON files are copied into this directory. The map uses their observed schema; it does not use fabricated records.

- `detections_grouped_con2.geojson` — point detections with `kalae_count`, `kom_count`, `text_lanna_count` and paired confidence fields `kalae_conf`, `kom_conf`, `text_lanna_conf`
- Other `detections_*.geojson` — point detections with counts but no confidence fields
- `hotspot_*.geojson` — precomputed results with actual fields `Gi_Bin`, `GiZScore`, `GiPValue`, and `NNeighbors`
- `old_city.geojson`, `periphery.geojson`, `municipality.geojson` — study-area polygons
- `roads_*.geojson` and `subdistricts.geojson` — supplementary reference layers

No sample geometries or attribute values are supplied. The default point layer is the supplied `detections_grouped_con2.geojson`, so the confidence slider and heatmap use real confidence values.
