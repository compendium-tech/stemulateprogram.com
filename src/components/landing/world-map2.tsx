import { FC } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
} from "react-simple-maps"

export interface CityData {
  name: string
  coordinates: [number, number] // [longitude, latitude]
}

interface WorldMapSimpleProps {
  highlightedCities: CityData[]
}

const CityMarker: FC<{ city: CityData }> = ({ city }) => {
  return (
    <Marker key={city.name} coordinates={city.coordinates}>
      <g style={{ cursor: "pointer" }}>
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
          fill="red"
          stroke="#FFF"
          strokeWidth={0.5}
          transform="scale(0.8) translate(-12 -22)"
        />
      </g>
    </Marker>
  )
}

export const WorldMapSimple: FC<WorldMapSimpleProps> = ({
  highlightedCities,
}) => {
  const geoUrl = "/geo.json"

  // Sorting cities by latitude (y-coordinate) is still a good practice
  // even without text labels, to maintain a consistent rendering order for pins.
  const sortedCities = [...highlightedCities].sort(
    (a, b) => b.coordinates[1] - a.coordinates[1]
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

        {sortedCities.map((city) => (
          <CityMarker key={city.name} city={city} />
        ))}
      </ComposableMap>
    </div>
  )
}
