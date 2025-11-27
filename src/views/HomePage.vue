<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="refresh-container">
        <ion-button fill="solid" @click="fetchCoins" :disabled="loading">
          {{ loading ? 'Memuat...' : 'Refresh' }}
        </ion-button>
      </div>

      <ion-list v-if="coins.length">
        <ion-item v-for="coin in coins" :key="coin.id">
          <ion-label class="row">
            <div class="column">
              <div class="top">Rank</div>
              <div class="bottom">{{ coin.rank }}</div>
            </div>

            <div class="column">
              <div class="top">{{ coin.name }}</div>
              <div class="bottom">{{ coin.symbol }}</div>
            </div>

            <div class="column">
              <div class="top">USD</div>
              <div class="bottom">${{ coin.price_usd }}</div>
            </div>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-spinner
        v-else-if="loading"
        class="ion-text-center"
        name="crescent"
      />

      <p v-else class="empty-text">
        Tidak ada data. Coba tekan tombol Refresh.
      </p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonSpinner,
  IonLabel,
} from '@ionic/vue';
import { ref, onMounted } from 'vue';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  price_usd: string;
  percent_change_24h: string;
  rank: number;
}

const coins = ref<Coin[]>([]);
const loading = ref(false);

const fetchCoins = async () => {
  loading.value = true;
  try {
    const res = await fetch('https://api.coinlore.net/api/tickers/');
    const data = await res.json();

    coins.value = data.data.slice(0, 20);
  } catch (e) {
    console.error('Gagal mengambil data', e);
  }
  loading.value = false;
};

onMounted(fetchCoins);
</script>

<style scoped>
.ion-padding {
  text-align: center;
}

.refresh-container {
  text-align: center;
  margin-bottom: 16px;
}

.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
}

.column {
  display: flex;
  flex-direction: column;
  width: 33%;
}

.top {
  font-size: 13px;
  color: var(--ion-color-medium);
  text-align: left;
}

.bottom {
  margin-top: 4px;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
}
</style>
