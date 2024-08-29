import { useState, useEffect } from "react";

export function Marker(options: any) {
  const [marker, setMarker] = useState<any>();

  useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
      marker.setIcon({
        url: "/image/ic_locatepin.svg",
        scaledSize: new window.google.maps.Size(35, 41),
      });
    }
  }, [marker, options]);

  return null;
}

export default Marker;
