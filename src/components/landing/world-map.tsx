import { FC } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps"

interface WorldMapSimpleProps {
  highlightedCountries: string[]
}

export const WorldMapSimple: FC<WorldMapSimpleProps> = ({
  highlightedCountries,
}) => {
  const geoUrl = "/geo.json"

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
              const countryName = geo.properties.name || ""
              const isHighlighted = highlightedCountries.includes(countryName)
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHighlighted ? "red" : "#EEE"}
                  stroke="#FFF"
                  className={isHighlighted ? "red-pulse" : ""}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: isHighlighted ? "darkred" : "red",
                      outline: "none",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}
