<template>
  <div class='weather-wrapper'>
    <div class="title h30">
      <h3 class="p-5">{{ location.address }}</h3>
    </div>

    <div class="p-10 m-10">
      <div class="p-10">
        This application is running on an https server for better security. Unfortunatly the weather API's free tier only allows for http. This causes an issue with mixed http/https content. 
      </div>
      <div class="p-10">
        If you're interested in funding that API cost for this project, or if you want to run this project yourself, you can contact me or find the code on my 
        <a href="https://github.com/N8ers" target="_blank">GitHub</a>.
      </div>  
    </div>

    <!-- <Spinner v-if='!weather && !weatherError' /> -->

    <div v-if='weatherError'>
      <h4 class="mt-10">We ran into a problem getting your weather!</h4>

      <p class="mt-10">
        This app is using the openweathermap api (http), and this app is running on https.
        Sometimes there are issues with the cors prefix used to query the openweathermap api.
      </p>

      <p class="mt-10">
        Sorry for the inconvenience,
        feel free to run this app locally with your own api key if you'd like!
      </p>
      <div class="mt-10 btn-primary">
        <a href="https://github.com/N8ers/dashboard">dashboard source code</a>
      </div>
    </div>

    <div v-if='weather'>

      <div class="column-2-even">
        <div>
          <div class="current-temp">{{ currently.temp }}&#176;F</div>
          <div class="current-humidity">{{ currently.humidity }}% humidity</div>
        </div>
        <div>
          <img :src="'http://openweathermap.org/img/w/' + currently.icon + '.png'" />
          <div>{{ currently.description }}</div>
        </div>
      </div>

      <div v-for="(day, index) in forcast" :key="day.day">
        <div :class="index % 2 === 0 ? 'even-day': 'odd-day'" class="columns-internal">
          <div class="forcast-column align-left weather-grid-item-1">
            <span class="">{{ day.day }}</span>
          </div>
          <div class="forcast-column weather-grid-item-2">
            <span> <img :src="'http://openweathermap.org/img/w/' + day.icon + '.png'" /></span>
          </div>
          <div class="forcast-column align-right weather-grid-item-3">
            <span>{{ day.hi }}&#176;</span>
            <span> | </span>
            <span>{{ day.lo }}&#176;</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { format, addDays } from 'date-fns';

import Spinner from './Spinner.vue';

const weatherKey = process.env.VUE_APP_OpenWeatherKey;

export default {
  name: 'Weather',
  props: {
    location: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  components: {
    Spinner,
  },
  data() {
    return {
      weather: null,
      weatherError: null,
    };
  },
  methods: {
    async getWeather() {
      const apiKey = weatherKey;
      const corsPrefix = 'https://cors-anywhere.herokuapp.com/';
      const units = 'imperial';
      const { lat, lng } = this.location;
      const prodUrl = `${corsPrefix}http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly&appid=${apiKey}&units=${units}`;
      const devUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly&appid=${apiKey}&units=${units}`;
      const url = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;
      const response = await axios.get(url);
      if (response.status === 403) {
        this.weatherError = true;
      } else {
        this.weather = response.data;
      }
    },
    dayClass(dayIndex) {
      const day = dayIndex ? format(addDays(new Date(), dayIndex), 'iiii') : 'Today';
      return {
        day,
        hi: Math.round(this.weather.daily[dayIndex].temp.max),
        lo: Math.round(this.weather.daily[dayIndex].temp.min),
        icon: this.weather.daily[dayIndex].weather[0].icon,
        description: this.weather.daily[dayIndex].weather[0].description,
      };
    },
  },
  computed: {
    currently() {
      return {
        temp: Math.round(this.weather.current.temp),
        humidity: Math.round(this.weather.current.humidity),
        icon: this.weather.current.weather[0].icon,
        description: this.weather.current.weather[0].description,
      };
    },
    forcast() {
      return [
        this.dayClass(0),
        this.dayClass(1),
        this.dayClass(2),
        this.dayClass(3),
        this.dayClass(4),
      ];
    },
  },
  created() {
    if (this.location.lat && this.location.lng) {
      this.getWeather();
    }
  },
};
</script>
