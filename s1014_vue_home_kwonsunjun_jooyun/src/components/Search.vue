<script setup>
import { ref } from 'vue'
import KakaoMap from './KakaoMap.vue'
// import { useRouter, useRoute } from 'vue-router'
import router from '../router'
// const route = useRoute()
// const router = useRouter()
const yearOptions = ref([])

const date = new Date()

const year = date.getFullYear()
for (let i = year; i > year - 20; i--) {
  yearOptions.value.push(i)
  // yearOpt += `<option value="${i}">${i}년</option>`
}

// yearEl = yearOpt;

// 브라우저가 열리면 시도정보 얻기.
sendRequest('sido', '*00000000')

const yearChange = () => {
  const month = date.getMonth() + 1
  const monthEl = document.querySelector('#month')
  let monthOpt = `<option disabled selected value="">매매월</option>`
  const yearSel = document.querySelector('#year')
  const m = yearSel[yearSel.selectedIndex].value == date.getFullYear() ? month : 13
  for (let i = 1; i < m; i++) {
    monthOpt += `<option value="${i < 10 ? '0' + i : i}">${i}월</option>`
  }
  monthEl.innerHTML = monthOpt
}

const sidoChange = (clickedSido) => {
  // 시도가 바뀌면 구군정보 얻기.
  // document.querySelector('#sido').addEventListener('change', function () {
  if (clickedSido) {
    let regcode = clickedSido.substr(0, 2) + '*00000'
    sendRequest('gugun', regcode)
  } else {
    initOption('gugun')
    initOption('dong')
  }
}

// 구군이 바뀌면 동정보 얻기.
const gugunChange = (clickedGuGun) => {
  // document.querySelector('#gugun').addEventListener('change', function () {
  if (clickedGuGun) {
    let regcode = clickedGuGun.substr(0, 5) + '*'
    sendRequest('dong', regcode)
  } else {
    initOption('dong')
  }
}

const search = () => {
  const pageNo = 1
  const numOfRows = 10

  const gugunSel = document.querySelector('#gugun')
  const regCode = gugunSel[gugunSel.selectedIndex].value.substr(0, 5)

  const yearSel = document.querySelector('#year')
  const year = yearSel[yearSel.selectedIndex].value
  const monthSel = document.querySelector('#month')
  const month = monthSel[monthSel.selectedIndex].value
  const dealYM = year.substr(0, 4) + month

  const key =
    'ytDs%2B%2FVKSAwYlWnI3NoOv6SLraVlQ0%2F6jvroGtzyAzmdtx3yXPgkslB2EcTM9H%2BTaGq8wu7DEEZcFwf6MCMSuQ%3D%3D'

  const parameter = `&pageNo=${pageNo}&numOfRows=${numOfRows}&LAWD_CD=${regCode}&DEAL_YMD=${dealYM}`

  fetch(
    `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?serviceKey=${key}` +
      parameter
  )
    .then((response) => response.text())
    .then((str) => new DOMParser().parseFromString(str, 'application/xml'))
    .then((xml) => {
      const aparts = xmlToJson(xml)?.response?.body?.items.item
      updateSearchResult(aparts)
      // eslint-disable-next-line no-undef
      setMarker(aparts)
    })
}

const updateSearchResult = (aparts) => {
  document.getElementById('search-result').innerHTML = ''

  for (let key in aparts) {
    const item = aparts[key]

    const name = item['아파트']['#text']
    const price = item['거래금액']['#text'].trim()
    const area = item['전용면적']['#text'].trim()
    const date = `${item['년']['#text']}년 ${item['월']['#text']}월 ${item['일']['#text']}일`
    const floor = item['층']['#text']

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

    const address = `${item['도로명']['#text']} ${item['도로명건물본번호코드']['#text']}`
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
      map.panTo(moveLocation)
    }
    for (key in aparts) {
      const item = aparts[key]
      console.log(item)
      const address = `${item['도로명']['#text']} ${item['도로명건물본번호코드']['#text']}`

      geocoder.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new window.kakao.maps.Marker({
            map: map,
            position: coords
          })

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${item['아파트']['#text']}</div>`
          })
          infowindow.open(map, marker)
        }
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
    pricespan.textContent = price + '만원'
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

function sendRequest(selid, regcode) {
  const url = 'https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes'
  let params = 'regcode_pattern=' + regcode + '&is_ignore_zero=true'
  fetch(`${url}?${params}`)
    .then((response) => response.json())
    .then((data) => addOption(selid, data))
}

function addOption(selid, data) {
  let opt = ``
  initOption(selid)
  switch (selid) {
    case 'sido':
      opt += `<option disabled selected value="">시/도</option>`
      data.regcodes.forEach(function (regcode) {
        opt += `
                  <option value="${regcode.code}">${regcode.name}</option>
                  `
      })
      break
    case 'gugun':
      opt += `<option disabled selected value="">구/군</option>`
      for (let i = 0; i < data.regcodes.length; i++) {
        if (i != data.regcodes.length - 1) {
          if (
            data.regcodes[i].name.split(' ')[1] == data.regcodes[i + 1].name.split(' ')[1] &&
            data.regcodes[i].name.split(' ').length != data.regcodes[i + 1].name.split(' ').length
          ) {
            data.regcodes.splice(i, 1)
            i--
          }
        }
      }
      // eslint-disable-next-line no-case-declarations
      let name = ''
      data.regcodes.forEach(function (regcode) {
        if (regcode.name.split(' ').length == 2) name = regcode.name.split(' ')[1]
        else name = regcode.name.split(' ')[1] + ' ' + regcode.name.split(' ')[2]
        opt += `
                  <option value="${regcode.code}">${name}</option>
                  `
      })
      break
    case 'dong':
      opt += `<option disabled selected value="">동</option>`
      // eslint-disable-next-line no-case-declarations
      let idx = 2
      data.regcodes.forEach(function (regcode) {
        if (regcode.name.split(' ').length != 3) idx = 3
        opt += `
                  <option value="${regcode.code}">${regcode.name.split(' ')[idx]}</option>
                  `
      })
  }
  document.querySelector(`#${selid}`).innerHTML = opt
}

function initOption(selid) {
  let options = document.querySelector(`#${selid}`)
  options.length = 0
  // let len = options.length;
  // for (let i = len - 1; i >= 0; i--) {
  //   options.remove(i);
  // }
}

function xmlToJson(xml) {
  // Create the return object
  var obj = {}

  if (xml.nodeType == 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj['@attributes'] = {}
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j)
        obj['@attributes'][attribute.nodeName] = attribute.nodeValue
      }
    }
  } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue
  }

  // do children
  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i)
      var nodeName = item.nodeName
      if (typeof obj[nodeName] == 'undefined') {
        obj[nodeName] = xmlToJson(item)
      } else {
        if (typeof obj[nodeName].push == 'undefined') {
          var old = obj[nodeName]
          obj[nodeName] = []
          obj[nodeName].push(old)
        }
        obj[nodeName].push(xmlToJson(item))
      }
    }
  }
  return obj
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
  <div>
    <section>
      <div class="bg-black relative">
        <img src="../assets/banner.jpg" alt="" class="w-screen max-h-96 object-cover opacity-60" />
        <div
          class="w-full flex flex-wrap gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center"
        >
          <select id="sido" class="select w-32" @change="sidoChange($event.target.value)">
            <option disabled selected>시/도</option>
          </select>
          <select id="gugun" class="select w-32" @change="gugunChange($event.target.value)">
            <option disabled selected>구/군</option>
          </select>
          <select id="dong" class="select w-32">
            <option disabled selected>동</option>
          </select>
          <select id="year" class="select w-32" @change="yearChange">
            <option disabled selected hidden value="">매매년도</option>
            <option v-for="yearOption in yearOptions" :key="yearOption">{{ yearOption }}년</option>
          </select>
          <select id="month" class="select w-32" @change="monthChange">
            <option disabled selected>매매월</option>
          </select>
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
</template>

<style lang=""></style>
