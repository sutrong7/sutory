$(window).ready(function () {
  $('.vibey_roll').slick({
    autoplay: true,
    autoplaySpeed: 0,
    speed: 5000,
    arrows: false,
    swipe: false,
    slidesToShow: 7,
    cssEase: 'linear',
    pauseOnFocus: false,
    pauseOnHover: false,

    responsive: [
    	{
    		breakpoint: 980,
    		settings: {
    			slidesToShow: 4,
    		}
    	},
    	{
    		breakpoint: 680,
    		settings: {
    			slidesToShow: 3,
    		}
    	},
    	{
    		breakpoint: 480,
    		settings: {
    			slidesToShow: 2,
    		}
    	}
    ]
  })

  $('.news_roll').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  })
})
