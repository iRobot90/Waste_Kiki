import { Box, Flex, HStack, SkeletonText, Text } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Polyline } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { useRef, useState } from "react";

let pos;
navigator.geolocation.getCurrentPosition(
  (position) => {
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    console.log(pos);
  },
  (error) => {
    console.log(error);
  },
  { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
);

function Map() {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  if (!pos) {
    return <SkeletonText />;
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        <MapContainer
          center={[pos.lat, pos.lng]}
          zoom={15}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[pos.lat, pos.lng]}>
            <Popup>Your location</Popup>
          </Marker>
          {directionsResponse && <Polyline positions={directionsResponse} />}
        </MapContainer>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
        </HStack>
      </Box>
    </Flex>
  );
}

export default Map;