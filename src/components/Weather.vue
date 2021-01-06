<template>
  <div class='weather-wrapper'>
    <h3 class="title h-30">{{ location.address }}</h3>
    <div v-if='weather'>

      <div class="current columns-internal">
        <div class="colum align-left">
          <div class="current-temp">{{ currently.temp }}&#176;F</div>
          <div class="current-humidity">{{ currently.humidity }}% humidity</div>
        </div>
        <div class="colum">
          <img class="current-icon" :src="'http://openweathermap.org/img/w/' + currently.icon + '.png'" />
          <div>{{ currently.description }}</div>
        </div>
      </div>

      <div v-for="(day, index) in forcast" :key="day.day">
        <div :class="index % 2 === 0 ? 'even-day': 'odd-day'" class="columns-internal">
          <div class="forcast-column align-left">
            <span class="">{{ day.day }}</span>
          </div>
          <div class="forcast-column">
            <span> <img :src="'http://openweathermap.org/img/w/' + day.icon + '.png'" /></span>
          </div>
          <div class="forcast-column align-right">
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
import userSettings from '../../userSettings.json';

const weatherKey = process.env.VUE_APP_OpenWeatherKey;

export default {
  name: 'Weather',
  data() {
    return {
      userSettings,
      weather: null,
    };
  },
  methods: {
    async getWeather() {
      const apiKey = weatherKey;
      const corsPrefix = 'https://cors-anywhere.herokuapp.com/';
      const units = 'imperial';
      const { lat, lng } = this.location;
      const response = await axios.get(`${corsPrefix}http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly&appid=${apiKey}&units=${units}`);
      this.weather = response.data;
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
    location() {
      return this.$store.state.db.location;
    },
  },
  created() {
    if (this.location.lat && this.location.lng) {
      this.getWeather();
    }
  },
  watch: {
    '$store.state.db.location': function () {
      this.getWeather();
    },
  },
};
</script>
