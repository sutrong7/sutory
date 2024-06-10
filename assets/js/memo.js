// 주요 DOM 요소 선택
const openBtn = document.querySelector('.btn-write')
const memoPad = document.querySelector('.memo-pad')
const closeBtns = document.querySelectorAll('.btn-closeMemo')
const listBtn = document.querySelector('.listBtn')
const memoList = document.querySelector('.memo-board')
const memoBtn = document.querySelector('.saveBtn')
const main = document.querySelector('.main')

// 로컬 스토리지에서 메모 불러오기
let memos = JSON.parse(localStorage.getItem('memos')) ?? []

// 스크롤 위치에 따른 버튼 표시
window.addEventListener('scroll', () => {
  openBtn.classList.toggle('active', window.scrollY > 300)
})

// 메모 패드 열기
openBtn.addEventListener('click', () => {
  memoPad.style.display = 'block'
})

// 메모 패드 닫기
closeBtns.forEach((button) => {
  button.addEventListener('click', () => {
    memoPad.style.display = 'none'
    memoList.style.display = 'none'
    document.body.style.overflow = '' // 스크롤 해제
  })
})

// 메모 패드 외부 클릭 시 닫기
// document.addEventListener('click', (event) => {
//   if (!memoPad.contains(event.target) && !openBtn.contains(event.target)) {
//     memoPad.style.display = 'none'
//   }
// })

// 메모 리스트 열기
listBtn.addEventListener('click', () => {
  memoList.style.display = 'block'
  memoPad.style.display = 'none'
  document.body.style.overflow = 'hidden' // 스크롤 막기
})

// 메모 저장
memoBtn.addEventListener('click', () => {
  let memoTitle = main.querySelector('.memo-title').value.trim()
  let memoContent = main.querySelector('.memo-content').value.trim()

  if (!memoTitle || !memoContent) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }

  let id = JSON.parse(localStorage.getItem('id')) ?? 0
  let now = new Date()

  let newMemo = {
    id: id,
    title: memoTitle,
    content: memoContent,
    date: `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`,
  }

  memos.push(newMemo)
  localStorage.setItem('memos', JSON.stringify(memos))
  localStorage.setItem('id', JSON.stringify(++id))

  setMemo()
  main.querySelector('.memo-title').value = ''
  main.querySelector('.memo-content').value = ''
  alert('저장 되었습니다')
  memoPad.style.display = 'none'
})

// 메모 목록 업데이트
function setMemo() {
  const memoListElement = main.querySelector('.memo-list')

  // 기존 메모 제거
  memoListElement.innerHTML = ''

  // 로컬 스토리지에서 메모 불러오기
  for (let i = memos.length - 1; i >= 0; i--) {
    let memoItem = document.createElement('div')
    memoItem.classList.add('memo-item')
    memoItem.setAttribute('data-id', memos[i].id)

    let title = document.createElement('h5')
    title.classList.add('list-title')
    title.textContent = memos[i].title

    let date = document.createElement('span')
    date.textContent = memos[i].date

    let content = document.createElement('p')
    content.classList.add('list-content')
    content.textContent = memos[i].content

    let editBtn = document.createElement('button')
    editBtn.classList.add('editBtn')
    editBtn.textContent = '수정'
    editBtn.addEventListener('click', setEditBtn, false)

    let deleteBtn = document.createElement('button')
    deleteBtn.classList.add('deleteBtn')
    deleteBtn.textContent = '삭제'
    deleteBtn.addEventListener('click', setDeleteBtn, false)

    let btnWrap = document.createElement('div')
    btnWrap.classList.add('btn-wrap')
    btnWrap.append(editBtn, deleteBtn)

    memoItem.append(title, date, content, btnWrap)
    memoListElement.append(memoItem)
  }
}

// 메모 삭제
function setDeleteBtn(e) {
  let memoId = e.target.closest('.memo-item').dataset.id
  memos = memos.filter((memo) => memo.id != memoId)
  localStorage.setItem('memos', JSON.stringify(memos))
  setMemo()
}

// 메모 수정
function setEditBtn(e) {
  let memoId = e.target.closest('.memo-item').dataset.id
  let memo = memos.find((memo) => memo.id == memoId)
  memoPad.style.display = 'block'

  if (memo) {
    main.querySelector('.memo-title').value = memo.title
    main.querySelector('.memo-content').value = memo.content
    memos = memos.filter((memo) => memo.id != memoId)
    localStorage.setItem('memos', JSON.stringify(memos))
    setMemo()
  }
}

// 페이지 로드 시 메모 설정
setMemo()
