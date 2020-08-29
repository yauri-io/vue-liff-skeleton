<script>
import Spinner from "@/components/Spinner";
import {R_MAIN} from "@/constants";

export default {
  name: 'App',
  components: {Spinner},
  data() {
    return {
      scriptId: 'liffSDK',
      scriptSrc: 'https://static.line-scdn.net/liff/edge/2/sdk.js',
      liffId: process.env.VUE_APP_LIFF_ID,
      loggedIn: false
    }
  },
  created() {
    if (!document.getElementById(this.scriptId)) {
      this.loadLiffSDK();
    }
  },
  methods: {
    loadLiffSDK() {
      const head = document.getElementsByTagName('head')[0];
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.scriptSrc;
      script.id = this.scriptId;
      script.onload = () => {
        this.initLiff();
      };
      script.onerror = (err) => {
        console.log('Liff SDK load error', err);
      };
      head.append(script);
    },
    async initLiff() {
      try {
        await liff.init({liffId: this.liffId});
        this.initApp();
      } catch (err) {
        console.error(err);
        // TODO: show error message
      }
    },
    initApp() {
      this.loggedIn = liff.isLoggedIn();
      if (this.loggedIn) {
        return this.$router.push({name: R_MAIN});
      }
      liff.login();
    }
  }
}
</script>

<template>
  <div v-if="!loggedIn" class="w-full flex justify-center h-full">
    <div class="flex items-center">
      <div>
        <Spinner/>
      </div>
      <div>Loading</div>
    </div>
  </div>
  <router-view/>
</template>
