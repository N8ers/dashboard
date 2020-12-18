<template>
  <div class='weather-wrapper green-border'>
    <div>weather in {{ userSettings.location }}</div>
    <div v-if='weather'>

      <div class="current">
        <span>{{ currently.temp }}&#176;F</span>
        <span>{{ currently.humidity }}% humidity</span>
        <span><img :src="'http://openweathermap.org/img/w/' + currently.icon + '.png'" /></span>
      </div>

      <table class="table">
        <tr v-for="day in forcast" :key="day.day">
          <td>{{ day.day }}</td>
          <td> <img :src="'http://openweathermap.org/img/w/' + day.icon + '.png'" /></td>
          <td>{{ day.hi }}&#176;F</td>
          <td>{{ day.lo }}&#176;F</td>
        </tr>
      </table>

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
      // const city = this.userSettings.location;
      const corsPrefix = 'https://cors-anywhere.herokuapp.com/';
      const units = 'imperial';
      const lat = 39.7684;
      const lng = 86.1581;
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
      };
    },
  },
  computed: {
    currently() {
      return {
        temp: Math.round(this.weather.current.temp),
        humidity: Math.round(this.weather.current.humidity),
        icon: this.weather.current.weather[0].icon,
      };
    },
    forcast() {
      return {
        day1: this.dayClass(0),
        day2: this.dayClass(1),
        day3: this.dayClass(2),
        day4: this.dayClass(3),
        day5: this.dayClass(4),
      };
    },
  },
  created() {
    this.getWeather();
  },
};
</script>

<style>
.weather-wrapper {
  width: 300px;
  margin: 0 auto;
}

.current {
  border: 1px solid black;
}

.table {
  margin: 0 auto;
  text-align: left;
}

.table td {
  margin-right: 10px;
}

</style>
