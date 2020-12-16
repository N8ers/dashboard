<template>
  <div class='weather-wrapper'>
    <div>weather in {{ userSettings.location }}</div>
    <div v-if='weather'>

      <div>
        <span>{{ currently.temp }}&#176;F</span>
        <span>{{ currently.humidity }}% humidity</span>
        <span>{{ currently.icon }}</span>
      </div>

      <table class="table">
        <tr v-for="day in forcast" :key="day.day">
          <td>{{ day.day }}</td>
          <td>{{ day.hi }}&#176;F</td>
          <td>{{ day.lo }}&#176;F</td>
        </tr>
      </table>
      <!-- <div v-for="day in forcast" :key="day.day">
         {{ day.day }} hi{{ day.hi }}&#176;F | lo:{{ day.lo }}&#176;F
      </div> -->

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { format, addDays } from 'date-fns';
import userSettings from '../../userSettings.json';

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
      const apiKey = '5995721e7c8cb4c389ef7a0924b1b0eb';
      // const city = this.userSettings.location;
      const corsPrefix = 'https://cors-anywhere.herokuapp.com/';
      const units = 'imperial';
      const lat = 39.7684;
      const lng = 86.1581;
      // const response = await axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${this.userSettings.location}&appid=${apiKey}&units=imperial`);
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
  border: 1px solid black;
  width: 300px;
  margin: 0 auto;
}

.table {
  margin: 0 auto;
  text-align: left;
}

.table td {
  margin-right: 10px;
}

</style>
