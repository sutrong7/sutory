



$(document).ready(function () {
     /**
     * Footer Copy
     */
    $('footer .btn-copy').click(function (event) {
        event.preventDefault(); // 링크 기본 동작 방지
        const value = $(this).data('value'); // data-value 속성 값 가져오기
        const tempInput = $('<input id="temp">'); // 임시 입력 요소 생성
        $('body').append(tempInput); // body에 임시 입력 요소 추가
        tempInput.val(value).select(); // 임시 입력 요소에 값 설정 및 선택
        document.execCommand('copy'); // 클립보드에 복사
        $('#temp').remove(); // 임시 입력 요소 제거
        alert('클립보드에 복사되었습니다: ' + value); // 알림 메시지
    });


      /**
     * Footer Data
     */
      $.ajax({
        url: './assets/js/data/data.json',
        dataType: 'json',
        success: function (data) {
          const footWorksList = $('#footWorksList')
          let fhtml = ``
          footWorksList.empty()
    
          $.each(data, function (index, item) {  
            // FOOTER WORKS
            if (index < 8) {
              fhtml += `
                  <li>
                    <a href="https://sutrong7.github.io/${item.id}/" class="thumb_wrap">
                      <img src="./assets/images/${item.id}.JPG" alt="${item.id}">
                        <span class="blind">${item.id}</span>
                    </a>
                  </li>
                `
            }
          })  
          footWorksList.append(fhtml)
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error('Request Failed: ' + textStatus, errorThrown)
        },
      })
});

/* Footer Work */

$(document).ready(function () {
  
  })
