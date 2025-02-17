(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// pop up


$(document).on('click', '#signIn', function (event) {
  event.preventDefault();
  $('#modal').css('display', 'block');
  $('.modal-bg-signup').hide();
  $('.modal-bg-signin').fadeIn(800);
  $("#errorMessage").hide()
});


$(document).on('click', '#signUp', function (event) {
  event.preventDefault();
  $('#modal').css('display', 'block');
  $('.modal-bg-signin').hide();
  $('.modal-bg-signup').fadeIn(800);
});

$(document).on('click', '.generateOTP', function (event) {
  event.preventDefault();
  OTPValidate();
});

$(document).ready(function () {

  if(localStorage.getItem("username")){
    $("#logoutButton").show();
  }else{
    $("#signIn").show();
  }

  $('#date').val(new Date().toISOString().slice(0, 10));
  $('.otpNumber').keyup(function () {
      if (this.value.length === this.maxLength) {
          $(this).next('.otpNumber').focus();
      }
  });
});

$(document).on('click', '.popup-overlay, .modal-bg', function (e) {
  if (e.target.className == 'popup-overlay') {
      $(".popup-overlay").hide();
  }
  if (e.target.className.includes('modal-bg')) {
      $(".modal-bg").hide();
  }
})
// pop up


// automatic text change

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Dream", "Learn", "Achieve"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});
// automatic text change

//form validation 

$(document).on('click', '.counsellingsubmitForm', function (event) {
  event.preventDefault(); 
  let isValidate = false;
  localStorage.getItem("username") ?  isValidate = formValidation("counselling-form input") : $("#signIn").trigger("click");
  if(isValidate == true && $("#sendOTPMessage").attr("isVerified") == true){

  }else if(isValidate == true && $("#sendOTPMessage").attr("isVerified") == false){
    
  }
})

$(document).on('click', '#verifyOTP', function (event) {
  event.preventDefault(); 
  let isValidate = formValidation("otpNumber")
})

$(document).on('click', '.registrationSubmit .signIN', function (event) {
  event.preventDefault(); 
  let isValidate = formValidation("modal-bg-signin input");
  if(isValidate == true){
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    login(email, password);
  }
})

$(document).on('click', '.registrationSubmit #register', function (event) {
  event.preventDefault(); 
  let isValidate = formValidation("modal-bg-signup input");
  if($("#regPassword").val() != $("#confirmpassword").val()){
    $("#confirmpassword").css("border", "1px solid red");
  }else{
    $("#confirmpassword").css("border", "0px solid red");
  }
  if(isValidate == true){
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    register(username, email, password);
  }
})

function formValidation(className) {
  let isVerfified = true;
  $("."+className).each(function (index, element) {
    console.log(element)
    if (!$(this).val()) {
      $(this).css("border", "1px solid red");
      isVerfified = false;
    }
    else {
      $(this).css("border", "0px solid rgba(185, 182, 211, 0.7");
    }
  })
  return isVerfified
}

function OTPValidate (){
  if ($("#mobileNumber").val()) {
    $('#modal').css('display', 'block');
    $('.OTP_popup').fadeIn(800);
    $("#mobileNumber").css("border", "0px solid red");
  }else{
    $("#mobileNumber").css("border", "1px solid red");
  }
}

document.getElementById('mobileNumber').addEventListener('keypress', function (e) {
  if (e.key < '0' || e.key > '9') {
      e.preventDefault();
  }
});

document.getElementById('Zipcode-field').addEventListener('keypress', function (e) {
  if (e.key < '0' || e.key > '9') {
      e.preventDefault();
  }
});

document.getElementById('class-field').addEventListener('keypress', function (e) {
  if (e.key < '0' || e.key > '9') {
      e.preventDefault();
  }
});
//form validation 

//form validation 

// Event listener for counseling form submission
document.getElementById('counsellingForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event?.target);
  try {
      const response = await fetch('https://project-1-tuqh.onrender.com/api/counsellingform', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(formData))
      });
      if (!response.ok) throw new Error('Failed to submit form');
      alert('Form submitted successfully');
  } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
  }
});

// Function to handle registration form submission
 const register = async (username, email, password) => {
  try {
      const response = await fetch('https://project-1-tuqh.onrender.com/api/users/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
          throw new Error('User already exists. Change email.');
      }

      const message = await response.text();
      $("#signIn").trigger("click") // Alert the success or error message
  } catch (error) {
      console.error('Registration failed due to username or email already existing:', error.message);
      alert(error.message); // Alert the success or error message
  }
};

// Function to handle login form submission
const login = async (email, password) => {
  try {
      const response = await fetch('https://project-1-tuqh.onrender.com/api/users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(` ${errorData}`);
      }
  
      const data = await response.json();
      localStorage.setItem("username",data.username);
      // Show logout button and hide login form
      $("#logoutButton").show();
      $("#signIn").hide();
      $(".popup-overlay").hide();
      $(".modal-bg").hide();
  } catch (error) {
    $("#errorMessage").show()
  }
};

// Function to handle logout
const logout = () => {
  // Hide logout button and show login form
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('logoutButton').style.display = 'none';
  document.getElementById('signIn').style.display = 'block';
  localStorage.removeItem("username"); 
};

// Event listener for logout button
document.getElementById('logoutButton').addEventListener('click', logout);

//contactform
//document.getElementById('contactForm').addEventListener('submit', async (event) => {
  //event.preventDefault();
  //const formData = new FormData(event.target);
  //const data = Object.fromEntries(formData.entries());

  //try {
    //const response = await fetch('https://project-1-tuqh.onrender.com/api/contactform', {
      //method: 'POST',
      //headers: {
        //'Content-Type': 'application/json',
      //},
      //body: JSON.stringify(data),
    //});

    //if (!response.ok) throw new Error('Failed to submit form');
    //alert('Form submitted successfully');
  //} catch (error) {
    //console.error('Error:', error);
    //alert('Error submitting form');
  //}
//});

//twilio
async function sendOTP() {
  const mobileNumber = document.getElementById('mobileNumber').value;
  const sendOTPMessage = document.getElementById('sendOTPMessage');

  try {
      const response = await fetch('https://project-1-tuqh.onrender.com/sendOTP', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mobileNumber }),
      });

      const data = await response.json();

      if (response.ok) {
          sendOTPMessage.textContent = 'OTP sent successfully.';
      } else {
        OTPValidate();
      }
  } catch (error) {
       OTPValidate();
      console.error('Error sending OTP:', error);
  }
}

async function verifyOTP(event) {
  event.preventDefault();

  const otpInputs = document.querySelectorAll('.otpNumber');
  let otp = '';
  otpInputs.forEach(input => {
      otp += input.value;
  });

  const mobileNumber = document.getElementById('mobileNumber').value;
  const verifyOTPMessage = document.getElementById('verifyOTPMessage');

  try {
      const response = await fetch('https://project-1-tuqh.onrender.com/verifyOTP', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ otp, mobileNumber }),
      });

      const data = await response.json();

      if (response.ok) {
          verifyOTPMessage.textContent = 'OTP verified successfully.';
          $("#sendOTPMessage").attr("isVerified",true);
      } else {
          verifyOTPMessage.textContent = data.error || 'Failed to verify OTP.';
          $("#sendOTPMessage").attr("isVerified",false);
      }
  } catch (error) {
      verifyOTPMessage.textContent = 'Failed to verify OTP.';
      console.error('Error verifying OTP:', error);
      $("#sendOTPMessage").attr("isVerified",false);
  }
}


//contactform
document.getElementById('contactForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  const contactMessage = document.getElementById('contactMessage');

  try {
    const response = await fetch('https://project-1-tuqh.onrender.com/contactForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      contactMessage.textContent = 'Your message has been sent. Thank you!';
    } else {
      contactMessage.textContent = result.error || 'Failed to send email.';
    }
  } catch (error) {
    contactMessage.textContent = 'Failed to send email.';
    console.error('Error:', error);
  }
});
