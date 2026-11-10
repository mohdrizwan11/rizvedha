# Map dataset: provenance and manual review

## India states / UTs used by the SVG engine

- Distributor: bharatlas, [States (2024), SOI derivative](https://bharatlas.com/view/soi_states). Original downloadable [SOI_States.geojson](https://pub-0429b8e3b5a946e69ea007df844a6f1c.r2.dev/admin/states/SOI_States.geojson).
- Source described by distributor: Survey of India derivative; retrieved 9 November 2026. The source has 40 features, including 36 named state/UT features and four inter-state disputed-area polygons.
- Licence: distributor lists `CC0-1.0 / CC-BY-4.0` for the state-layer collection. Treat the exact upstream rights and attribution as **requiring manual confirmation** before publication. The [Government of India geospatial guidelines](https://dst.gov.in/sites/default/files/Final%20Approved%20Guidelines%20on%20Geospatial%20Data_0.pdf) identify SOI maps/digital boundary data as the standard for India political maps and address digital display and printing; they do not by themselves verify this transformed derivative.
- Processing: geometries simplified independently with Shapely `simplify(0.006, preserve_topology=True)` in longitude/latitude degrees, then ring orientation corrected for d3-geo, quantised to 100,000 steps and encoded to TopoJSON. Two tiny degenerate Andaman & Nicobar polygons produced by quantisation were removed. Simplification may affect tiny islands, coastlines and shared borders. Disputed inter-state polygons are shown separately and not assigned an answer.
- **Important:** this is an educational derivative of SOI-sourced geometry, not a certified or current Survey of India publication. Its transformation, disputed regions, island coverage, source version and compliance with the latest SOI depiction must be independently checked before publication or legal reliance. The UI links to the dataset and calls out this status.

## Harappan locations

The historical site's point positions are approximate. Non-India geographic context comes from Natural Earth via `world-atlas` (public-domain dataset); India uses the simplified SOI derivative above. Harappa, Mohenjo-daro, Dholavira and Lothal markers and coordinates require independent review. Historical relationships cite [NCERT, Bricks, Beads and Bones](https://ncert.nic.in/textbook/pdf/lehs101.pdf) and [UNESCO Dholavira](https://whc.unesco.org/en/list/1645/).

## Other data

Topic entries link individually to their source pages. Data and translations are independently written and require editorial review. For India Basics, `retrieved_on` records source retrieval and `last_verified` is null until independent verification. Older Rivers records retain legacy metadata and need independent review. The schema validation guarantees required metadata and format, not factual correctness or copyright clearance.

## V3 preliminary source check — 9 November 2026

The [Survey of India vector catalogue](https://surveyofindia.gov.in/UserFiles/files/Vector%20Data%20Catalog%202025(1).pdf) was fetched; listing a vector product does not clear reuse rights for this specific derived geometry. The [SOI political map page](https://www.surveyofindia.gov.in/pages/political-map-of-india/1000) fetched without map entries in the extracted page. The [Bhartiya Map directory](https://bhartiyamap.com/download-maps/) links to SOI reference maps but does not establish a licence for our simplified derivative. The previously linked DST guidelines PDF now returns a 404 page. Exact boundary comparison, all islands and licence/permissions remain unresolved; this map is not certified.
