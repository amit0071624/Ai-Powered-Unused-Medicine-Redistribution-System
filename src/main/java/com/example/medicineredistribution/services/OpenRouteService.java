package com.example.medicineredistribution.services;


import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

@Service
public class OpenRouteService {
    private final String API_KEY = "5b3ce3597851110001cf62487de8fa1c97174908a08d94d9119f462f"; // Replace with your key

    public String getEstimatedTime(double startLat, double startLon, double endLat, double endLon) {
        String url = "https://api.openrouteservice.org/v2/directions/driving-car?api_key=" + API_KEY +
                "&start=" + startLon + "," + startLat + "&end=" + endLon + "," + endLat;

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        JSONObject jsonResponse = new JSONObject(response);
        int durationInSeconds = jsonResponse.getJSONArray("routes").getJSONObject(0).getInt("duration");
        int minutes = durationInSeconds / 60;

        return "Estimated delivery time: " + minutes + " minutes";
    }
}
