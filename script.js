const header = document.querySelector('#siteHeader');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobileNav');
const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
const revealEls = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('[data-count]');
const contactForm = document.querySelector('.contact-form');
const pricingTabs = document.querySelectorAll('[data-pricing-tab]');
const pricingCards = document.querySelectorAll('.pricing-card');
const pricingSearch = document.getElementById('pricingSearch');
const summaryPlan = document.getElementById('summaryPlan');
const summaryBase = document.getElementById('summaryBase');
const summaryTotal = document.getElementById('summaryTotal');
const addonCheckboxes = document.querySelectorAll('.addon-list input');
const serviceItems = document.querySelectorAll('.service-item');
const serviceDetailTitle = document.getElementById('serviceDetailTitle');
const serviceDetailText = document.getElementById('serviceDetailText');
const serviceDetailFeatures = document.getElementById('serviceDetailFeatures');
const serviceDetailImage = document.getElementById('serviceDetailImage');
const serviceDetailLink = document.getElementById('serviceDetailLink');
const serviceSlider = document.getElementById('services-slider');
const sliderPrev = document.querySelector('.slider-prev');
const sliderNext = document.querySelector('.slider-next');
let countersStarted = false;
let serviceAutoScroll = null;
const stickyPanel = `<div class="fixed bottom-6 right-6 flex flex-col gap-3 z-50"><button class="p-3 rounded-full bg-purple-600 text-white shadow-lg hover:scale-110 transition-all" aria-label="Chatbot"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zm-2 10H6V7h12v12zm-9-6c-.83 0-1.5-.67-1.5-1.5S8.17 10 9 10s1.5.67 1.5 1.5S9.83 13 9 13zm7.5-1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM8 15h8v2H8v-2z"></path></svg></button><a href="https://wa.me/9266594199" target="_blank" rel="noopener noreferrer" class="p-3 rounded-full bg-green-600 text-white shadow-lg hover:scale-110 transition-all" aria-label="WhatsApp"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" class="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 75.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-2 4.6-2z"></path></svg></a></div>`;
if (!document.querySelector('[aria-label="Chatbot"]')) {
  document.body.insertAdjacentHTML('beforeend', stickyPanel);
}
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 16);
};
const closeMenu = () => {
  if (!mobileNav || !menuToggle) return;
  mobileNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
};
if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });
}
navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  const hrefPage = href === './' ? 'index.html' : href.split('/').pop();
  if (hrefPage === currentPage || (hrefPage === '' && currentPage === 'index.html')) {
    link.classList.add('active');
  }
  link.addEventListener('click', () => closeMenu());
});
const animateCounter = (counter) => {
  const target = Number(counter.dataset.count);
  if (!target) return;
  const duration = 1200;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = Math.floor(eased * target).toLocaleString('en-IN');
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      counter.textContent = target.toLocaleString('en-IN');
    }
  };
  requestAnimationFrame(tick);
};
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      if (!countersStarted && entry.target.closest('.stats-grid')) {
        counters.forEach(animateCounter);
        countersStarted = true;
      }
    });
  },
  { threshold: 0.18 }
);
revealEls.forEach((element) => revealObserver.observe(element));
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = contactForm.querySelector('.form-status');
    if (status) {
      status.textContent = 'Thank you. Your enquiry has been prepared for the SRJ team.';
    }
    contactForm.reset();
  });
}
if (serviceItems.length && serviceDetailTitle && serviceDetailText && serviceDetailFeatures && serviceDetailImage) {
  const updateServiceDetail = (item) => {
    const title = item.dataset.title || 'Select a Service to Learn More';
    const description = item.dataset.description || 'Choose any service from the left panel to review the scope, outcomes, and how SRJ can support your next project.';
    const features = item.dataset.features ? item.dataset.features.split('|') : [];
    const image = item.dataset.image || 'https://www.srjglobalsoftech.com/assets/website-CD1X5ljx.avif';
    serviceDetailTitle.textContent = title;
    serviceDetailText.textContent = description;
    serviceDetailFeatures.innerHTML = features.map((feature) => `<li>${feature}</li>`).join('');
    serviceDetailImage.src = image;
    serviceDetailImage.alt = title;
    serviceDetailLink.href = 'contact.html';
  };
  const currentService = document.querySelector('.service-item.active') || serviceItems[0];
  if (currentService) {
    currentService.classList.add('active');
    updateServiceDetail(currentService);
  }
  serviceItems.forEach((item) => {
    item.addEventListener('click', () => {
      serviceItems.forEach((button) => button.classList.remove('active'));
      item.classList.add('active');
      updateServiceDetail(item);
    });
  });
}
if (sliderPrev && sliderNext && serviceSlider) {
  const scrollAmount = () => Math.max(serviceSlider.clientWidth * 0.75, 320);
  const stopServiceAutoScroll = () => {
    if (serviceAutoScroll) {
      clearInterval(serviceAutoScroll);
      serviceAutoScroll = null;
    }
  };
  const startServiceAutoScroll = () => {
    stopServiceAutoScroll();
    serviceAutoScroll = setInterval(() => {
      serviceSlider.scrollLeft += 1;
      if (serviceSlider.scrollLeft + serviceSlider.clientWidth >= serviceSlider.scrollWidth - 2) {
        serviceSlider.scrollLeft = 0;
      }
    }, 30);
  };
  sliderPrev.addEventListener('click', () => serviceSlider.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
  sliderNext.addEventListener('click', () => serviceSlider.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
  serviceSlider.addEventListener('mouseenter', stopServiceAutoScroll);
  serviceSlider.addEventListener('mouseleave', startServiceAutoScroll);
  serviceSlider.addEventListener('touchstart', stopServiceAutoScroll, { passive: true });
  serviceSlider.addEventListener('touchend', startServiceAutoScroll);
  startServiceAutoScroll();
}
if (pricingTabs.length && pricingCards.length) {
  const updatePricingSummary = () => {
    let selectedCard = document.querySelector('.pricing-card.active');
    if (!selectedCard) {
      selectedCard = pricingCards[0];
      if (selectedCard) selectedCard.classList.add('active');
    }
    const planName = selectedCard ? selectedCard.querySelector('h3').textContent : 'Basic';
    const basePrice = selectedCard ? Number(selectedCard.dataset.basePrice || 0) : 0;
    const addonTotal = Array.from(addonCheckboxes).reduce((sum, checkbox) => {
      return checkbox.checked ? sum + Number(checkbox.dataset.addonPrice || 0) : sum;
    }, 0);
    const totalPrice = basePrice + addonTotal;
    summaryPlan.textContent = planName;
    summaryBase.textContent = `₹${basePrice.toLocaleString('en-IN')}`;
    summaryTotal.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
  };
  pricingTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      pricingTabs.forEach((button) => button.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.dataset.pricingTab;
      pricingCards.forEach((card) => {
        const matches = category === 'all' || card.dataset.category === category;
        card.style.display = matches ? 'block' : 'none';
      });
    });
  });
  pricingCards.forEach((card) => {
    card.addEventListener('click', () => {
      pricingCards.forEach((item) => item.classList.remove('active'));
      card.classList.add('active');
      updatePricingSummary();
    });
  });
  addonCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', updatePricingSummary);
  });
  if (pricingSearch) {
    pricingSearch.addEventListener('input', () => {
      const query = pricingSearch.value.toLowerCase().trim();
      pricingCards.forEach((card) => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const body = card.querySelector('p').textContent.toLowerCase();
        const visible = title.includes(query) || body.includes(query);
        card.style.display = visible ? 'block' : 'none';
      });
    });
  }
  updatePricingSummary();
}
window.addEventListener('scroll', setHeaderState);
window.addEventListener('resize', () => {
  if (window.innerWidth > 1020) closeMenu();
});
setHeaderState();
