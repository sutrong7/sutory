$(document).ready(function () {
  /**
   * Data
   */
  $.ajax({
    url: './assets/js/data/data.json',
    dataType: 'json',
    success: function (data) {
      const worksList = $('#worksList')
      const footWorksList = $('#footWorksList')
      const worksTab = $('#worksTab')
      let whtml = ``
      let thtml = ``
      let bhtml = `<li class="tab_item on"><button type="button" onclick="viewAllItem(this)">전체 보기</button></li>`
      let type = $('.content').attr('id')
      let addedTags = new Set()
      worksList.empty()
      worksTab.empty()

      $.each(data, function (index, item) {
        if (type == item.type) {
          $.each(item.tag, function (index, tagItem) {
            thtml += `<li class="txt">#${tagItem}</li>`
          })

          whtml += `
              <li class="gallery_item">
              <a href="https://sutrong7.github.io/${item.id}" class="item_link drawBorder">
                  <div class="item_wrap">
                      <div class="thumb_box"><img src="./assets/images/${item.id}.JPG" alt="${item.id}"></div>
                      <div class="text_box">
                          <h3 class="tit">${item.name}</h3>
                          <ul class="tag_list">
                            ${thtml}
                          </ul>
                      </div>
                  </div>
              </a>
              <div class="util">            
              <div class="btn_wrap">
                  <button class="btn-info" onclick="location.replace('https://velog.io/@sutrong7/${item.detail}')"><svg
                  xmlns="http://www.w3.org/2000/svg" width="16"
                  height="16" fill="currentColor" class="bi bi-search"
                  viewBox="0 0 16 16">
                  <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg></button>
              `
        
          // whtml += ` 
          //     <button class="btn-link" onclick="window.open('https://sutrong7.github.io/${item.id}/')"><svg
          //         xmlns="http://www.w3.org/2000/svg" width="16"
          //         height="16" fill="currentColor" class="bi bi-share"
          //         viewBox="0 0 16 16">
          //         <path
          //             d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
          //     </svg></button></div>
          // </div>
          // </li>              
          //   `

          // WORKS TAB
          $.each(item.tag, function (index, tagItem) {
            if (!addedTags.has(tagItem) && index < data.length) {
              bhtml += `<li class="tab_item"><button type="button" onclick="filterItem('${tagItem}' , this)">#${tagItem}</button></li>`
              addedTags.add(tagItem)
            }
          })
        }
        thtml = ``
      })

      worksList.append(whtml)
      worksTab.append(bhtml)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error('Request Failed: ' + textStatus, errorThrown)
    },
  })
})
function filterItem(keyword, element) {
  let $element = $(element)
  $element.parent().addClass('on').siblings().removeClass('on')

  let worksItemList = $('.gallery_item') // 각 갤러리 항목을 선택

  worksItemList.each(function () {
    let tagItemList = $(this).find('.tag_list .txt') // 각 갤러리 항목 내의 태그 리스트 선택
    let matchFound = false

    tagItemList.each(function () {
      if ($(this).text().trim() === `#${keyword}`) {
        // 태그가 키워드와 일치하는지 확인
        matchFound = true
        return false // 일치하는 태그를 찾으면 루프 종료
      }
    })

    if (matchFound) {
      $(this).show() // 일치하는 항목 표시
    } else {
      $(this).hide() // 일치하지 않는 항목 숨기기
    }
  })

  console.log(`Filtered by: ${keyword}`)
}

function viewAllItem(element) {
  let $element = $(element)
  let worksItemList = $('.gallery_item')
  worksItemList.each(function () {
    $(this).show()
    $element.parent().addClass('on').siblings().removeClass('on')
  })
}
