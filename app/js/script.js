//SLIDER START
var slideIndex = 1;
  showDivs(slideIndex);

  function plusDivs(n) {
    showDivs(slideIndex += n);
  }

  function currentDiv(n) {
    showDivs(slideIndex = n);
  }

  function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    if (n > x.length) {slideIndex = 1;}
    if (n < 1) {slideIndex = x.length;}
    for (i = 0; i < x.length; i++) {
       x[i].style.opacity = "0";
    }
    for (i = 0; i < dots.length; i++) {
       dots[i].className = dots[i].className.replace(" w3-red", "");
    }
    x[slideIndex-1].style.opacity = "1";
    dots[slideIndex-1].className += " w3-red";
  }

  function next() {
    plusDivs(1);
  }

  setInterval( next, 4000 );
//SLIDER END

//FEEDBACK START
(function () {
  let show = document.getElementById('show'),
  feedback = document.getElementById('feedback'),
  mainFeedback = document.getElementById('main-feedback'),
     close = document.getElementById('close');

  show.addEventListener('click', function() {
  feedback.style.visibility = 'visible';
  feedback.style.opacity = '1';
  mainFeedback.style.visibility = 'visible';
  mainFeedback.style.opacity = '1';
    });

  close.addEventListener('click', function() {
    feedback.style.opacity = '0';
    feedback.style.visibility = 'hidden';
    mainFeedback.style.opacity = '0';
    mainFeedback.style.visibility = 'hidden';

    });
})();
//FEEDBACK END
