/* HEADER 시작 (유림) */

/* POP UP PORTFOLIO NOTICE */
let noticePopup = document.querySelector('.notice_portfolio'),
    popupClose = noticePopup.querySelector('.popup_close'),
    dontSee = noticePopup.querySelector('#dont_see');

//쿠키 생성 함수
function setCookie(name,value,day){
  let date = new Date();
  date.setDate(date.getDate()+day);
  document.cookie = `${name}=${value};expires=${date.toUTCString()}`;
}

// 쿠키 확인 함수
function cookieCheck(name){
  let cookieArr = document.cookie.split(';');
  let visited = false;
  for(let cookie of cookieArr){
    if(cookie.search(name) > -1){
      visited = true;
      break;
     }
    }
    //만약 visited의 값이 false라면 dialog가 보인다
    if(!visited){
      noticePopup.setAttribute('open','');
    }
}
cookieCheck('CGV');

/* 
  popupClose 클릭 시, 
    팝업 display none
    dontSee에 체크 되어있다면,
      쿠키 생성,아니라면 쿠키 만료.
*/
popupClose.addEventListener('click',()=>{
  noticePopup.style.display = 'none';
  if(dontSee.checked){
    setCookie('CGV','home', 1);
  }else{
    setCookie('CGV','home', -1);
  }
 });
 

/* ADD BANNER */
//BANNER FADEIN & OUT
let adWrapper = document.querySelector('.ad_wrapper'),
    adSlide = document.querySelectorAll('.ad_wrapper li'),
    adCount = adSlide.length,
    curentAddIndex = 0,
    adTimer,
    adWidth = 1920;

/* 
ad리스트의 ul의 넓이를 ad의 갯수만큼 확장
admoveSlide 실행 시, 각 요소에 active 클래스로 opacity 조절
adAutoMove 실행 시, 3초마다 슬라이드 이동
*/
adWrapper.style.width = `${adCount.length * adWidth}px`;

function admoveSlide(num){
  adSlide.forEach(item=>{
    item.classList.remove('active');
  })
  adSlide[num].classList.add('active');
  curentAddIndex = num;
}

function adAutoMove(){
  adTimer = setInterval(()=>{
  let nextIdx = (curentAddIndex+1)%adCount;
  admoveSlide(nextIdx);
}, 3000);
}
adAutoMove();


//BANNER CLOSE
let adClose = document.querySelector('.ad_close'),
    ad = document.querySelector('.ad_wrap');

/* 
adClose 버튼 클릭시. 
  toggle을 활용하여 클래스명 active 추가/삭제 및 ad 높이 조절,
  adClose 버튼이 클래스명 active 포함 시, chevron 아이콘으로 html 변경
  아니라면, x마크 아이콘으로 변경 
 */
adClose.addEventListener('click',()=>{
  ad.classList.toggle('active');
  if(ad.classList.contains('active')){
    adClose.innerHTML = '<i class="fa-solid fa-angle-down"></i>'
  } else{
    adClose.innerHTML = '<i class="fa-solid fa-xmark"></i>'
  }
})

let login = document.querySelector('.login'),
    loginIcon = document.querySelector('.login a i');

login.addEventListener('mouseover',()=>{
  loginIcon.classList.replace('fa-lock','fa-lock-open');
  loginIcon.style.transform = `translateX(4px)`;
  })
login.addEventListener('mouseout',()=>{
  loginIcon.classList.replace('fa-lock-open','fa-lock')
  loginIcon.style.transform = `translateX(0)`;
})

/* MIAN MENU DROPDOWN */
// MENU DROPDOWN
let mainMenu = document.querySelectorAll('.menu li'),
    subMenu = document.querySelectorAll('.submenu'),
    menuDown = document.querySelector('.menu_bg'),
		menuHeight = menuDown.offsetHeight,
    subMenuHeight = 0;

/* 
1.각 서브메뉴의 높이를 구하고, 
메뉴 호버시 DROPDOWN될 서브메뉴 배경 부분의 높이를 변수 menuTotalHeight에 할당
*/
subMenu.forEach(item=>{
	if(item.offsetHeight > subMenuHeight){
		subMenuHeight = item.offsetHeight;
	}
})
let menuTotalHeight = `${menuDown.offsetHeight + subMenuHeight + 80}px`

/* 
2.각 메인메뉴에 마우스 오버 시, menuTotalHeight로 메뉴 높이 변경
 마우스 아웃 시, 기본 menuHeight로 변경
*/
mainMenu.forEach(item=>{
	item.addEventListener('mouseover',()=>{
		menuDown.style.height = menuTotalHeight;
	});
	item.addEventListener('mouseout',()=>{
		menuDown.style.height = `${menuHeight}px`;
	});
})


// MENU STICKY
let menuSticky = document.querySelector('.main_menu'),
    menuWrap = document.querySelector('.menuwrap')
    menuLi = document.querySelectorAll('.menu_li a'),
    menuScroll = menuDown.offsetTop,
    body = document.body,
    scrollAmout = window.scrollY;

/* 
1.윈도우 스크롤 발생시,
  스크롤양이 메뉴의 offsetTop보다 크다면,
    메뉴에 클래스명 sticky추가 후, 최상단 고정 및 배경색 그라디언트 변경
    각 메인 메뉴의 글자색 흰색으로 변경 
  아니라면, 클래스 sticky 삭제 후, 원래대로 변경
*/
window.addEventListener('scroll',()=>{
    if(window.scrollY >= menuScroll){
      body.classList.add('sticky');
      menuWrap.style.height = 0;
      menuSticky.style.background = "linear-gradient(to right, rgb(215, 67, 87), rgb(241,79,58) 59%, rgb(239, 100, 47))";
      for(li of menuLi){
        li.style.color = "#fff";
      }
    } else {
      body.classList.remove('sticky');
      menuSticky.style.background = "";
      for(li of menuLi){
        li.style.color = "";
      }
    }
})


/* SEARCH MODAL */
let lightbox = document.querySelector('#lightbox'),
    modalOpen = document.querySelector('#modal_open'),
    modalClose = document.querySelector('.modal_close'),
    modal = document.querySelector('.modal_box');

/* 
modalOpen 버튼(검색 버튼) 클릭 시, 
  모달 display block 효과로 화면에 띄우고,
  배경색 클래스명 visible 추가해서 보이게
modalClose 버튼 클릭 시, 
  모달 display none 으로 숨기고,
  배경색 클래스명 visible 삭제
*/
modalOpen.addEventListener('click',()=>{
  modal.style.display = 'block';
  lightbox.classList.add('visible');
});
modalClose.addEventListener('click',()=>{
  modal.style.display = 'none';
  lightbox.classList.remove('visible');
});
/* HEADER 끝 (유림) */

/* MAIN_1 시작 (이원) */
// 무비 트레일러 버튼
let video = document.querySelector('#Elemental'),
videoSoundoffBtn = document.querySelector('.soundoffbtn'),
videoToggleBtn = document.querySelector('.mVbtn'),
videoSoundBtn = document.querySelector('.sound');

// 무비 트레일러
let videoslideWrapper = document.querySelector('.MovieVideo_slide_wrap'), 
    videoslides = document.querySelectorAll('.MovieVideo_slide'), 
    videoslideCount = videoslides.length,
    videoslideWidth = 1272,
    videoslideMargin = 30,
    showSlides = 3,
    videocurrentIdx = 0,
    videoprevCrousel = document.querySelector('.mV_leftCrousel'),
    videonextCrousel = document.querySelector('.mV_rightCrousel');

// 무비 영상 복사본 생성하기
    for(var i = 0;i<videoslideCount;i++){
      var cloneSlide = videoslides[i].cloneNode(true);
      cloneSlide.classList.add('clone');
      videoslideWrapper.appendChild(cloneSlide);
  }
  for(var i = videoslideCount -1; i>=0 ; i--){
      var cloneSlide = videoslides[i].cloneNode(true);
      cloneSlide.classList.add('clone');
      videoslideWrapper.prepend(cloneSlide);
  }

// 무비 트레일러 슬라이드 배치
let allSlides = videoslideWrapper.querySelectorAll('li');
videoslideWrapper.style.width = videoslideWidth * allSlides.length + 'px';

// 무비 트레일러 슬라이드 가운데로 재배치
function setSlide(){
  videoslideWrapper.style.transform = `translateX(-${videoslideWidth*(showSlides+1)}px)`;
  setTimeout(()=>{videoslideWrapper.classList.add('animated')},100);
}
setSlide();

// 무비 슬라이드 이동함수
function moveslide(num){
  videoslideWrapper.style.left = -num * videoslideWidth + 'px';
  videocurrentIdx = num;
  console.log(videocurrentIdx);
  let activeIdx = videocurrentIdx + showSlides+1;
  for(slide of allSlides){
    slide.classList.remove('active');
  }
    allSlides[activeIdx].classList.add('active');

  allSlides.forEach(item=>{
    let slideVideo = item.querySelector('video');
    slideVideo.pause();
  });

  if(videocurrentIdx == showSlides || videocurrentIdx == -showSlides){
      setTimeout(function(){
        videoslideWrapper.classList.remove('animated');
        videoslideWrapper.style.left = '0px'; 
        videocurrentIdx = 0;
        for(slide of allSlides){
          slide.classList.remove('active');
          console.log('active제거');
        }
        allSlides[4].classList.add('active');
      },500);

      setTimeout(function(){
        videoslideWrapper.classList.add('animated');
      },600);
  }
  videoToggleBtn.classList.remove('active');
  videoSoundBtn.classList.remove('active');
}
moveslide(0);

// 무비 트레일러 캐러셀 클릭 시 이동
 videonextCrousel.addEventListener('click',()=>{
  moveslide(videocurrentIdx+1);
})
videoprevCrousel.addEventListener('click',()=>{
  moveslide(videocurrentIdx-1);
})

// 무비 트레일러 버튼 클릭 시 할 일
videoToggleBtn.addEventListener('click',()=>{
  videoToggleBtn.classList.toggle('active');
  let activeVideo = videoslideWrapper.querySelector('.active video');
  if(videoToggleBtn.classList.contains('active')){
    activeVideo.play();
  }else{
    activeVideo.pause();
  }
})

videoSoundBtn.addEventListener('click',()=>{
  videoSoundBtn.classList.toggle('active');
  let activeVideo = videoslideWrapper.querySelector('.active video');
  if(videoSoundBtn.classList.contains('active')){
    activeVideo.muted = true;
  } else {
    activeVideo.muted = false;
  }
})

// 무비차트 & 상영예정작 타이틀 클릭 시 해당 슬라이드 등장
let movieChart = document.querySelector('#btnMovieChart'),
movieReserve = document.querySelector('#btnReserMovie'),
allTitle = document.querySelectorAll('.movieChart_tt a'),
MovieChartSlide = document.querySelectorAll('.movieChart_list > div');

allTitle.forEach(item=>{
  item.addEventListener('click',(e)=>{
    e.preventDefault();
    for(let title of allTitle){
      title.classList.remove('active');
    }
    e.currentTarget.classList.add('active');
    for(let slide of MovieChartSlide){
      slide.style.display = 'none';
    }
    let target = e.currentTarget.getAttribute('href');
    console.log(target);
    document.querySelector(target).style.display = 'block';
  })
})

// 무비차트 및 상영예정작 슬라이드
let slideContainers = document.querySelectorAll('.slidewrapper')

slideContainers.forEach(item=>{
  multipleSlide(item);
});

function multipleSlide(target){
  
let slideWrapper = target.querySelector('.MovieChart_slide_wrap'),
slides = document.querySelectorAll('.MovieChart_slide'),
slideCount = slides.length,
slideWidth = 222,
slideMargin = 40,
slidesPerView = 5,
currentIdx = 0,
prevBtn = target.querySelector('.mC_prevBtn'),
nextBtn = target.querySelector('.mC_nextBtn');
  
slideWrapper.style.width = slideCount*(slideWidth+slideMargin)+'px';

function moveSlides(num){
    slideWrapper.style.left = -num*(slideWidth+slideMargin)+'px';
    currentIdx = num;

    if(currentIdx === 0){
        prevBtn.style.visibility = 'hidden';
        nextBtn.style.visibility = 'visible';
    } else {
        prevBtn.style.visibility = 'visible';
        nextBtn.style.visibility = 'hidden';
    }
}
moveSlides(0)

// 무비차트 및 상영예정작 캐러셀 이동
nextBtn.addEventListener('click',()=>{
    if(currentIdx < slideCount-slidesPerView){
      moveSlides(currentIdx+5);
    }
  });
prevBtn.addEventListener('click',()=>{
    if(currentIdx > 0){
      moveSlides(currentIdx-5);
    }
  });
}
/* MAIN_1 끝 (이원) */

/* MAIN_2 시작 (수연) */
/* MAIN_2 시작 (수연) */

/* MAIN_3 시작 (정석) */
/* MAIN_3 끝 (정석) */
 /* HEADER 끝 (유림) */



/* MAIN_2 시작 (수연) */
/* MAIN_2 끝 (수연) */

/* MAIN_3 시작 (정석) */
/* MAIN_3 끝 (정석) */
