/*
 * common animation
 */

// gsap.set('[data-fade-down]', { yPercent: -20, opacity: 0 })
// gsap.set('[data-fade-up]', { yPercent: 20, opacity: 0 })
// /**
//  * @i index
//  * @el element
//  *
//  */
// $('[data-fade-down]').each(function (i, el) {
//   gsap.to(el, {
//     scrollTrigger: {
//       trigger: el,
//       start: '0% 80%',
//       end: '100% 0%',
//       toggleActions: 'restart none none none',
//       // markers:true,
//     },
//     yPercent: 0,
//     opacity: 1,
//   })
// })
// $('[data-fade-up]').each(function (i, el) {
//   gsap.to(el, {
//     scrollTrigger: {
//       trigger: el,
//       start: '0% 80%',
//       end: '100% 0%',
//       // markers:true,
//     },
//     yPercent: 0,
//     opacity: 1,
//   })
// })

/*
 * name
 */

// 위치 정보 가져오기
navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

// 위치 정보 가져오기 성공 시 실행되는 콜백 함수
function successCallback(position) {
  const latitude = position.coords.latitude // 위도
  const longitude = position.coords.longitude // 경도

  // 위도와 경도를 이용하여 지명 가져오기
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
  )
    .then((response) => response.json())
    .then((data) => {
      const location = data.localityInfo.administrative[2].name
      document.querySelector('.location').classList.add('on')
      document.querySelector('.location').textContent = location
      // console.log(`Current Location: ${location}`);
    })
    .catch((error) =>
      console.error(
        'An error occurred while retrieving location information:',
        error,
      ),
    )
}

// 위치 정보 가져오기 실패 시 실행되는 콜백 함수
function errorCallback(error) {
  console.error(
    'An error occurred while retrieving location information:',
    error,
  )
}

function updateClock() {
  // 현재 시간 가져오기
  const currentDate = new Date()

  // 시간 정보 가져오기
  const hours = ('0' + currentDate.getHours()).slice(-2) // 시
  const minutes = ('0' + currentDate.getMinutes()).slice(-2) // 분
  const seconds = ('0' + currentDate.getSeconds()).slice(-2) // 초

  // 일자 정보 가져오기
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const month = months[currentDate.getMonth()] // 월
  const date = currentDate.getDate() // 일
  const year = currentDate.getFullYear() // 연도

  // 오전/오후 구분
  const meridiem = hours < 12 ? 'AM' : 'PM'

  document.querySelector(
    '.time',
  ).innerHTML = `${hours}:${minutes}:${seconds} <span class="meridiem">${meridiem}</span>`

  document.querySelector('.day').innerHTML = `${month} ${date}, ${year}`
}
setInterval(updateClock, 1000)

/**
 * visual Ani
 */

const introAniTl = gsap.timeline({})
introAniTl
  .set('.v_tit div', {
    yPercent: -60,
    opacity: 0,
  })
  .to('.v_tit div', {
    yPercent: 0,
    opacity: 1,
    stagger: 0.3,
    onComplete: function () {
      // introAniTl 애니메이션이 끝나면 nameAniTl 애니메이션을 시작합니다.
      nameAniTl.play()
    },
  })

const nameAniTl = gsap.timeline({ paused: true })
nameAniTl
  .set('.v_tit .middle', {
    opacity: 1,
    xPercent: 0,
  })
  .set('.v_title span', {
    color: '#fff',
  })
  .to('.v_tit .point', {
    color: '#0eff85',
    duration: 0.3,
    delay: 0.7,
  })
  .to('.v_tit .name .middle', {
    opacity: 0,
    duration: 0.2,
  })
  .to('.v_tit .name .last', {
    xPercent: -300,
  })

// nameAniTl을 4초마다 반복 실행하는 함수
function repeatNameAni() {
  nameAniTl.restart()
}

// nameAniTl이 한 번 실행된 후 4초마다 반복 실행되도록 설정
nameAniTl.eventCallback('onComplete', function () {
  setTimeout(repeatNameAni, 10000)
})

// introAniTl과 nameAniTl을 모두 실행
introAniTl.play()
// nameAniTl.delay(3);

/**
 * scroll Down
 */

$(document).on('click', '.btn_scr', function () {
  const targetpos = $('.sc-result').offset().top
  $('html, body').animate(
    {
      scrollTop: targetpos,
    },
    1000,
  )
})

$(document).ready(function () {
  /**
   * Data
   */
  $.ajax({
    url: './assets/js/data/data.json',
    dataType: 'json',
    success: function (data) {
      const portfolioList = $('#portfolioList')
      const worksList = $('#worksList')
      const worksImgList = $('#worksImgList')

      let phtml = ``
      let whtml = ``
      let thtml = ``
      let ihtml = ``

      let portfolioNum = 1
      let worksNum = 1

      portfolioList.empty()
      worksList.empty()
      worksImgList.empty()

      $.each(data, function (index, item) {
        if (item.type === 'portfolio') {
          $.each(item.tag, function (index, tagItem) {
            thtml += `<li class="tag-item">#${tagItem}</li>`
          })
          phtml += `
            <div class="works-item">
              <a href="https://sutrong7.github.io/${
                item.id
              }/" class="link-wrap">
                <div class="number">
                  <p>${String(portfolioNum).padStart(2, '0')}</p>
                </div>
                <div class="title">
                  <h3>${item.name}</h3>
                  <ul class="tag-list">
                    ${thtml}
                  </ul>
                </div>
                <div class="button">
                  <div class="btn-more"></div>
                </div>
              </a>
            </div>
          `
          thtml = ``
          portfolioNum++
        }

        if (item.type === 'works') {
          $.each(item.tag, function (index, tagItem) {
            thtml += `<li class="tag-item">#${tagItem}</li>`
          })

          if (index < 5) {
            ihtml += `
            <div class="image-item">
              <img src="./assets/images/${item.id}.JPG" alt="${item.id}">
            </div>
          `

            whtml += `
            <div class="works-item">
              <a href="https://sutrong7.github.io/${
                item.id
              }/" class="link-wrap">
                <div class="number">
                  <p>${String(worksNum).padStart(2, '0')}</p>
                </div>
                <div class="title">
                  <h3>${item.name}</h3>
                  <ul class="tag-list">
                    ${thtml}
                  </ul>
                </div>
                <div class="button">
                  <div class="btn-more"></div>
                </div>
              </a>
            </div>
          `
            thtml = ``
            worksNum++
          }
        }
      })

      portfolioList.append(phtml)
      worksImgList.append(ihtml)
      worksList.append(whtml)

      /**
       * WORKS
       */
      gsap.registerPlugin(ScrollTrigger)

      ScrollTrigger.matchMedia({
        '(min-width: 980px)': function () {
          // gsap 애니메이션 설정
          const worksAni = gsap.timeline({
            scrollTrigger: {
              trigger: '.sc-works .left',
              start: 'top top',
              end: 'bottom 70%',
              scrub: 1,
              pin: true,
              toggleActions: 'play none none reset',
            },
          })

          const worksListItems = $('.sc-works .works-item')

          worksListItems.each(function (i, el) {
            gsap.to(el, {
              scrollTrigger: {
                trigger: el,
                start: 'top 25%', // 항목이 뷰포트의 75% 지점에 도달할 때 시작
                end: 'bottom 75%', // 항목이 뷰포트의 25% 지점에 도달할 때 끝
                markers: false,
                scrub: 5,
                onEnter: () => {
                  worksListItems.removeClass('active')
                  $(el).addClass('active')
                  $('.image-item').removeClass('active')
                  $('.image-item').eq(i).addClass('active')
                },
                onLeaveBack: () => {
                  worksListItems.removeClass('active')
                  $(el).addClass('active')
                  $('.image-item').removeClass('active')
                  $('.image-item').eq(i).addClass('active')
                },
              },
            })
          })
        },
      })

      initializeSliders() // 슬라이더 초기화 함수 호출

      $(window).on('resize', function () {
        initializeSliders() // 창 크기 조정 시 슬라이더 초기화 함수 호출
      })
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error('Request Failed: ' + textStatus, errorThrown)
    },
  })

  function initializeSliders() {
    if (window.innerWidth <= 980) {
      $('.slider-img, .slider-tit').addClass('active')

      if (!$('.slider-img').hasClass('slick-initialized')) {
        $('.slider-img').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: '.slider-tit',
          autoplay: true,
          autoplaySpeed: 5000,
        })
      }
      if (!$('.slider-tit').hasClass('slick-initialized')) {
        $('.slider-tit').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          asNavFor: '.slider-img',
          dots: false,
          arrows: false,
          centerMode: false,
          focusOnSelect: true,
          autoplay: true,
          autoplaySpeed: 5000,
        })
      }
    } else {
      $('.slider-img, .slider-tit').removeClass('active')
      if ($('.slider-img').hasClass('slick-initialized')) {
        $('.slider-img').slick('unslick')
      }
      if ($('.slider-tit').hasClass('slick-initialized')) {
        $('.slider-tit').slick('unslick')
      }
    }
  }
})
