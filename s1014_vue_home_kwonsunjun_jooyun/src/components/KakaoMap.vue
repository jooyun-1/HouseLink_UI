<template></template>
<style scope>
#map {
  width: 50rem;
  height: 40rem;
}
</style>
<script>
export default {
  name: 'KakaoMap',
  data() {
    return {
      map: null
    }
  },
  setup() {},
  created() {},
  mounted() {
    if (window.kakao && window.kakao.maps) {
      //카카오 객체가 있고, 카카오 맵그릴 준비가 되어 있다면 맵 실행
      this.loadMap()
    } else {
      //없다면 카카오 스크립트 추가 후 맵 실행
      this.loadScript()
    }
  },
  unmounted() {},
  methods: {
    loadScript() {
      const script = document.createElement('script')
      script.src =
        '//dapi.kakao.com/v2/maps/sdk.js?appkey=5460c565ce28365d60584e53309d69dd&libraries=services&autoload=false'
      script.onload = () => window.kakao.maps.load(this.loadMap)

      document.head.appendChild(script)
    },
    loadMap() {
      const container = document.getElementById('map')
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      }
      this.map = new window.kakao.maps.Map(container, options)
      this.loadMaker()
    },
    loadMaker() {
      const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667)

      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      })

      marker.setMap(this.map)
    }
  }
}
</script>
