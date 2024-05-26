$(function () {
  /**
   * Page Location
   */
  $(document).ready(function() {
    const urlPath = window.location.pathname.split('/').filter(Boolean).pop();
    console.log(urlPath)
    const $navItems = $('.nav_item a');

    $navItems.each(function() {
        const $link = $(this);
      const href = $link.attr('href');
      console.log(urlPath.toLowerCase())
        if (urlPath && urlPath.toLowerCase() === href.toLowerCase()) {
            $link.parent().addClass('on');
        }
    });
  });
  
  
  /**
   * Fixed Header
   */
  let didScroll = false
  let lastScrollTop = 0
  let delta = 5 // 동작의 구현이 시작되는 위치
  let navbarHeight = $('.header').outerHeight() // 영향을 받을 요소를 선택

  // 반응형 헤더일 경우 창 사이즈 변경 시 높이 다시 받아옴
  $(window).resize(function (event) {
    navbarHeight = $('.header').outerHeight()
  })

  // 스크롤시에 사용자가 스크롤했다는 것을 알림
  $(window).scroll(function (event) {
    didScroll = true
  })

  // didScroll 값을 0.25초 마다 확인한 뒤 스크롤 움직였으면 (true) hasScrolled() 호출
  // 호출한 뒤 스크롤 확인상태를 false 로 초기화(재설정)
  setInterval(function () {
    // console.log(didScroll)
    //didScroll은 스크롤을 움직였을 때 true가 됨
    if (didScroll) {
      hasScrolled()
      didScroll = false
    }
  }, 250)

  // 동작을 구현
  function hasScrolled() {
    // 접근하기 쉽게 현재 스크롤의 위치를 저장
    let st = $(this).scrollTop()

    // 설정한 delta 값보다 더 스크롤되었는지를 확인
    // 마지막 스크롤 - 현재 스크롤 지점 절대값이 델타 5값 넘지 않으면 함수 종료
    if (Math.abs(lastScrollTop - st) <= delta) {
      return
    }

    // 헤더의 높이보다 더 스크롤되었는지 확인하고 스크롤의 방향이 위인지 아래인지를 확인
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down : 메뉴 비활성
      console.log(
        `헤더높이 : ${navbarHeight}px , 현재위치: ${parseInt(
          st,
        )}px , 마지막위치: ${parseInt(lastScrollTop)}px`,
      )
      $('.header').removeClass('fixed').addClass('nofixed')
    } else {
      // Scroll Up : 메뉴 활성
      if (st + $(window).height() < $(document).height()) {
        console.log(
          `현재위치: ${parseInt(st)}px , 창높이: ${$(
            window,
          ).height()}px , 현재위치+창높이: ${parseInt(
            st + $(window).height(),
          )}px , 문서높이: ${$(document).height()}px`,
        )
        $('.header').removeClass('nofixed').addClass('fixed')
      }
    }

    // lastScrollTop 에 현재 스크롤위치를 지정
    lastScrollTop = st
  }

  const moMenuAniTl = gsap.timeline({})

  // 모바일 메뉴 활성화
  $('.menuBtn_m').click(function () {
    $('.wrap').addClass('show')
    $('body').addClass('scrollLock')
    moMenuAniTl.to('.header_mobile .menu_inner', { right: 0 })
    moMenuAniTl.to('.m_nav_list > li ', {
      opacity: 1,
      y: 0,
      delay: 1,
      stagger: 0.2,
    })
  })

  // 모바일 메뉴 비활성화
  $('.menuBtn_mClose').click(function () {
    $('.wrap').removeClass('show')
    $('body').removeClass('scrollLock')
    moMenuAniTl.to('.header_mobile .menu_inner', { right: '-100%' })
    moMenuAniTl.to('.m_nav_list > li ', {
      opacity: 0,
      y: 80,
    })
  })
})
