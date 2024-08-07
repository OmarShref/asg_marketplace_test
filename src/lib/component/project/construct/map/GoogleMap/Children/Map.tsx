import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDeepCompareEffectForMaps } from "../../../../../../controller/mapController";
import { mapOptions } from "@/lib/core/basic/Constants";

type Props = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: any) => void;
  onIdle?: (map: any) => void;
  options?: any;
};
export function Map({
  onClick,
  onIdle,
  children,
  style,
  ...options
}: Props | any) {
  const ref = useRef(null);
  const [map, setMap] = useState<any>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          zoom: mapOptions.defaultZoom,
          streetViewControl: false,
          zoomControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
          gestureHandling: "greedy",
        }),
      );
    }
  }, [ref, map]);
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);
  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName),
      );
      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement<any>(child, { map });
        }
      })}
    </>
  );
}

export default Map;
