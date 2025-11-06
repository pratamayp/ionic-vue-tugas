<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Informasi Cuaca</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card v-if="weather">
        <ion-card-header>
          <ion-card-subtitle>
          Latitude: {{ weather.latitude }}, Longitude: {{ weather.longitude }}
          </ion-card-subtitle>
          <ion-card-title>Informasi Lokasi</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Zona waktu: {{ weather.timezone }}
        </ion-card-content>
      </ion-card>

      <ion-list v-if="hourlyDisplay.length">
        <ion-list-header>
          <ion-label>Prakiraan Suhu per Jam</ion-label>
        </ion-list-header>
        <ion-item v-for="(item, index) in hourlyDisplay" :key="index">
          <ion-label>
            <h2>{{ formatTime(item.time) }}</h2>
            <p>{{ item.temperature }} °C</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-spinner v-else class="ion-text-center" name="crescent" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { formatTime } from '@/util';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonList, IonListHeader, IonLabel, IonItem, IonSpinner
} from '@ionic/vue'
import { onMounted, ref } from 'vue';

interface WeatherResponse {
  latitude: number
  longitude: number
  timezone: string
  timezone_abbreviation: string
  hourly: {
    time: string[]
    temperature_2m: number[]
  }
}

interface HourlyData {
  time: string
  temperature: number
}

const weather = ref<WeatherResponse | null>(null)
const hourlyDisplay = ref<HourlyData[]>([])

onMounted(async () => {
  try {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m'
    const res = await fetch(url)
    const data:WeatherResponse = await res.json()
    weather.value = data

    hourlyDisplay.value = data.hourly.time.map((t, i) => ({
      time: t,
      temperature: data.hourly.temperature_2m[i]
    })).slice(0, 10)

  } catch (error) {
    console.error('Gagal mengambil data', error)
  }
})


</script>

<style scoped>
ion-card {
  margin-bottom: 16px;
}
ion-item {
  --min-height: 48px;
}
h2 {
  margin: 0;
  font-weight: 600;
}
p {
  margin: 2px 0 0;
  color: var(--ion-color-medium);
}
ion-spinner {
  display: block;
  margin: 48px auto;
}

ion-card-title{
  font-size: 1.5rem;
  margin-bottom: 4px;
}
</style>
