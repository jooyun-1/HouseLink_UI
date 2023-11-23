<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { ref } from 'vue'
import KakaoMap from './KakaoMap.vue'
import router from '../router'
import axios from 'axios'

const search = () => {
  const searchInputSel = document.querySelector('#searchInput')
  const searchInput = searchInputSel.value

  axios
    .get('http://localhost:8080/house/search/' + searchInput)
    .then((res) => {
      const aparts = res.data
      updateSearchResult(aparts)
      // setMarker(aparts)
    })
    .catch((err) => {
      console.log(err)
    })
}

const updateSearchResult = (aparts) => {
  document.getElementById('search-result').innerHTML = ''
  // for (let key in aparts) {
  for (let i = 0; i < aparts.length; i++) {
    const item = aparts[i]
    const area = item.area
    const name = item.apartmentName
    const floor = item.floor
    const price = item.dealAmount
    const date = item.dealYear + '년 ' + item.dealMonth + '월 ' + item.dealDay + '일'

    const card = document.createElement('div')
    card.className = 'card w-96 bg-base-100 shadow-sm'

    const cardbody = document.createElement('div')
    cardbody.className = 'card-body'

    const title = document.createElement('h2')
    title.className = 'card-title flex w-full justify-between cursor-pointer flex-wrap'

    const leftTitle = document.createElement('div')
    const apartname = document.createElement('span')
    apartname.className = 'text-indigo-900 mr-[6px]'
    apartname.textContent = name

    const address = item.roadName + ' ' + item.roadNameBonbun
    // const address = `${item['도로명']['#text']} ${item['도로명건물본번호코드']['#text']}`
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new window.kakao.maps.LatLng(37.501307715371695, 127.03961032986173), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      }
    const script = document.createElement('script')
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=5460c565ce28365d60584e53309d69dd&libraries=services&autoload=false'
    document.head.appendChild(script)
    var map = new window.kakao.maps.Map(mapContainer, mapOption)
    var geocoder = new window.kakao.maps.services.Geocoder()

    geocoder.addressSearch(address, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === window.kakao.maps.services.Status.OK) {
        apartname.id = `${result[0].y} ${result[0].x}`
      }
    })

    apartname.onclick = () => {
      const coord = apartname.id.split(' ')
      const moveLocation = new window.kakao.maps.LatLng(coord[0], coord[1])
      const tempPrice = item.dealAmount.replace(',', '')

      const dealtoMillion = Number(tempPrice) / 10 ** 4
      geocoder.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new window.kakao.maps.Marker({
            map: map,
            position: coords
          })
          var customOverlay = new window.kakao.maps.CustomOverlay({
            position: coords,
            content: `<div style="
    display: block;
    background: #50627F;
    color: #fff;
    text-align: center;
    height: 50px;
    line-height:22px;
    border-radius:4px;
    margin-top : 25px;
    padding:0px 10px;
">${item.apartmentName}
    <br>
    ${dealtoMillion} 억
    </div>`
          })
          customOverlay.setMap(map, marker)
        }
        map.panTo(moveLocation)
      })
    }

    const floorspan = document.createElement('span')
    floorspan.className = 'text-sm'
    floorspan.textContent = `${floor}층`
    leftTitle.appendChild(apartname)
    leftTitle.appendChild(floorspan)

    const badge = document.createElement('div')
    badge.className = 'badge badge-ghost font-normal'
    badge.textContent = date
    title.appendChild(leftTitle)
    title.appendChild(badge)
    cardbody.appendChild(title)

    const priceP = document.createElement('p')
    const pricetitle = document.createElement('span')
    pricetitle.textContent = '거래금액'
    pricetitle.className = 'text-indigo-800 font-medium mr-[10px]'
    priceP.appendChild(pricetitle)
    const pricespan = document.createElement('span')
    const tempPrice = price.replace(',', '')
    const dealtoMillion = Number(tempPrice) / 10 ** 4
    pricespan.textContent = dealtoMillion + '억'
    priceP.appendChild(pricespan)
    cardbody.appendChild(priceP)

    const areaP = document.createElement('p')
    const areatitle = document.createElement('span')
    areatitle.textContent = '전용면적'
    areatitle.className = 'text-indigo-800 font-medium mr-[10px]'
    areaP.appendChild(areatitle)
    const areaspan = document.createElement('span')
    areaspan.textContent = Math.round(area / 3.3) + '평'
    areaP.appendChild(areaspan)
    cardbody.appendChild(areaP)

    const detailButton = document.createElement('input')

    detailButton.type = 'button'
    detailButton.className = 'input input-bordered w-full max-w-md'
    detailButton.textContent = name

    detailButton.value = '리뷰보러가기'
    detailButton.onclick = () => {
      router.push({ name: 'detail', params: { name: detailButton.textContent } })
    }

    cardbody.append(detailButton)
    card.appendChild(cardbody)

    document.getElementById('search-result').appendChild(card)
  }
}
</script>

<template lang="">
  <head>
    <link
      rel="stylesheet"
      as="style"
      crossorigin
      href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable.css"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/daisyui@3.6.4/dist/full.css"
      rel="stylesheet"
      type="text/css"
    />
  </head>
  <Header />
  <div>
    <section>
      <div class="bg-black relative">
        <img src="../assets/banner.jpg" alt="" class="w-screen max-h-96 object-cover opacity-60" />
        <div
          class="w-full flex flex-wrap gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center"
        >
          <input
            type="text"
            placeholder="아파트 또는 지역명을 입력하세요"
            id="searchInput"
            class="input input-bordered input-md w-full max-w-xs"
          />
        </div>
        <button
          id="search"
          @click="search()"
          class="bg-indigo-500 hover:bg-indigo-400 px-10 py-2 font-semibold text-white rounded-full absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          검색하기
        </button>
      </div>
    </section>
    <section>
      <main class="pt-10 w-screen bg-neutral-50 flex flex-col justify-center">
        <h1 class="font-bold text-primary text-center text-2xl">실거래가 정보</h1>
        <section class="flex gap-[1rem] justify-center mt-[2.5rem] mb-[5rem]">
          <div
            id="search-result"
            class="w-[30rem] h-[40rem] overflow-y-auto flex flex-col items-center gap-[1rem]"
          >
            <div class="card w-96 bg-base-100 shadow-sm" id="no-result">
              <div class="card-body">
                <h2 class="card-title justify-center">검색 결과가 없습니다.</h2>
              </div>
            </div>
          </div>

          <div id="map" class="w-[50rem] h-[40rem]">
            <KakaoMap />
          </div>
        </section>
      </main>
    </section>
    <dialog id="detailModal" class="modal">
      <div
        class="modal-box flex flex-col justify-center w-[25rem]"
        style="display: flex; flex-direction: column"
      >
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div>
          <label class="label">
            <span class="label-text">건물명</span>
            <input type="text" id="birth" maxlength="20" class="input" />
          </label>

          <label class="label">
            <span class="label-text">면적</span>
          </label>
        </div>
        <div>
          <label class="label">
            <span>Review</span>
            <table>
              <th>제목</th>
              <th>날짜</th>
            </table>
          </label>
        </div>
        <!-- <div class="flex gap-[10px] p-4 pl-0 pb-0">
            <button class="btn w-1/2" @click="moveSign">회원가입</button>
            <button class="btn btn-primary w-1/2" onclick="login()">로그인</button>
          </div> -->
      </div>
    </dialog>
  </div>
  <Footer />
</template>

<style scoped></style>
