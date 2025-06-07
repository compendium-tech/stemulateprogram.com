import { FC } from "react" // No longer need useRef, useLayoutEffect, useState
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
} from "react-simple-maps"

interface CityData {
  name: string
  coordinates: [number, number] // [longitude, latitude]
}

interface WorldMapSimpleProps {
  highlightedCities: CityData[]
}

// --- UPDATED COMPONENT: CityMarker (text elements removed) ---
const CityMarker: FC<{ city: CityData }> = ({ city }) => {
  // Removed textRef, textDimensions, useState, and useLayoutEffect
  // as they are no longer needed without the text label.

  return (
    <Marker key={city.name} coordinates={city.coordinates}>
      <g
        // You can keep onMouseOver/onMouseOut here if you want any hover effect
        // on the pin itself (e.g., change its color or size).
        // For now, I'll remove the opacity manipulation for text/rect.
        onMouseOver={() => {
          /* Optional: add pin hover effects here */
        }}
        onMouseOut={() => {
          /* Optional: remove pin hover effects here */
        }}
        style={{ cursor: "pointer" }} // Still indicates the pin is interactive
      >
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
          fill="red"
          stroke="#FFF"
          strokeWidth={0.5}
          transform="scale(0.8) translate(-12 -22)"
        />
        {/* Removed the <rect> element (text background) */}
        {/* Removed the <text> element (city name) */}
      </g>
    </Marker>
  )
}
// --- End UPDATED CityMarker component ---

export const WorldMapSimple: FC<WorldMapSimpleProps> = ({
  highlightedCities,
}) => {
  const geoUrl = "/geo.json"

  // Sorting cities by latitude (y-coordinate) is still a good practice
  // even without text labels, to maintain a consistent rendering order for pins.
  const sortedCities = [...highlightedCities].sort(
    (a, b) => a.coordinates[1] - b.coordinates[1]
  )

  return (
    <div className="w-full">
      <ComposableMap
        projectionConfig={{ scale: 145 }}
        width={800}
        height={400}
        viewBox="0 0 800 400"
        style={{ width: "100%", height: "100%" }}
      >
        <Graticule stroke="#DDD" strokeWidth={0.2} />
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EEE"
                  stroke="#FFF"
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: "red",
                      outline: "none",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              )
            })
          }
        </Geographies>

        {/* Render each CityMarker component from the sorted list */}
        {sortedCities.map((city) => (
          <CityMarker key={city.name} city={city} />
        ))}
      </ComposableMap>
    </div>
  )
}
