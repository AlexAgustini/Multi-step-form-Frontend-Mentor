const firstStepEl = document.querySelector(".first-step-container");
const secondStepEl = document.querySelector(".second-step-container");
const thirdStepEl = document.querySelector(".third-step-container");
const fourthStepEl = document.querySelector(".fourth-step-container");
const allSteps = document.querySelectorAll(".step");
const firstSection = document.querySelector(".first-section");
const secondSection = document.querySelector(".second-section");
const thirdSection = document.querySelector(".third-section");
const fourthSection = document.querySelector(".fourth-section");
const allSections = document.querySelectorAll(".section");
const allSectionsArray = Array.from(allSections);
const anchorTagCheckout = document.querySelector(".change-plan");
let currentPage = 0;


function hideOthers(passedSection) {
    const filteredItems = allSectionsArray.filter(item => item != passedSection)
    filteredItems.forEach((item) => {
        item.classList.add("hidden")
    })
}

anchorTagCheckout.addEventListener("click", (e) => {
    const section = secondSection
    hideOthers(e.target, section)
    if (secondSection.classList.contains("hidden")) {
        secondSection.classList.remove("hidden")
        currentPage = 1
    }
})

firstStepEl.addEventListener("click", (e) => {
    const section = firstSection
    hideOthers(e.target, section)
    if (firstSection.classList.contains("hidden")) {
        firstSection.classList.remove("hidden")
        currentPage = 0
    }
})

secondStepEl.addEventListener("click", (e) => {
    const section = secondSection
    hideOthers(e.target, section)
    if (secondSection.classList.contains("hidden")) {
        secondSection.classList.remove("hidden")
        currentPage = 1
    }
})

thirdStepEl.addEventListener("click", (e) => {
    const section = thirdSection
    hideOthers(e.target, section)
    if (thirdSection.classList.contains("hidden")) {
        thirdSection.classList.remove("hidden")
        currentPage = 2
    }
})

fourthStepEl.addEventListener("click", (e) => {
    const section = fourthSection
    hideOthers(e.target, section)
    if (fourthSection.classList.contains("hidden")) {
        fourthSection.classList.remove("hidden")
        currentPage = 3
    }
})

allSteps.forEach(step => {
    step.addEventListener('click', ()=> {
        allSteps.forEach(step => {
            step.querySelector('button').classList.remove('active')
        })
        step.querySelector('button').classList.add('active')
    })
})

const nextPageBtn = document.querySelectorAll(".next-btn");
const previousPageBtn = document.querySelectorAll(".back-btn");

nextPageBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        currentPage++
        displayPage()
    })
})

previousPageBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        currentPage--
        displayPage()
    })
})

function displayPage() {
    allSectionsArray.forEach((section) => {
        if (currentPage === allSectionsArray.length || currentPage > allSectionsArray.length || currentPage < 0) {
            return
        }
        section.classList.add('hidden');
        allSections[currentPage].classList.remove('hidden');
    })
}

// Section data store  ---------------------

const yearMonthToggle = document.querySelector('.monthly-yearly-toggle');
let toggleStatus = 'month'

yearMonthToggle.addEventListener('click', () => {
    let toggleParent = yearMonthToggle;
    let toggle = toggleParent.querySelector('.toggle-inner');

    if (toggleStatus === 'month') {
        toggle.classList.toggle('scroll');
        toggleStatus = 'year';
        document.querySelector(".yearly.default-p").classList.add('active');
        document.querySelector(".monthly.default-p").classList.remove('active');

    } else {
        toggle.classList.toggle('scroll');
        toggleStatus = 'month'
        document.querySelector(".yearly.default-p").classList.remove('active');
        document.querySelector(".monthly.default-p").classList.add('active');
    }

    yearlyOrMonthly();
})

function yearlyOrMonthly() {
    if (toggleStatus === 'month') {

        firstPlanCard.querySelector('.default-p').textContent = '$9/mo';
        secondPlanCard.querySelector('.default-p').textContent = '$12/mo';
        thirdPlanCard.querySelector('.default-p').textContent = '$15/mo';

        const discountMsgs = document.querySelectorAll(".yearly-discount");
        discountMsgs.forEach(msg => {
            msg.classList.add('active')
        });

        addOn1.querySelector('h4').textContent = '+$1/mo';
        addOn2.querySelector('h4').textContent = '+$2/mo';
        addOn3.querySelector('h4').textContent = '+$2/mo';

        chosedAddonsInfo.forEach(elem => {
            elem.price = elem.price / 10
        });

        chosedPlanPrice = chosedPlanPrice / 10 ;


    } else {
        
        firstPlanCard.querySelector('.default-p').textContent = '$90/yr';
        secondPlanCard.querySelector('.default-p').textContent = '$120/yr';
        thirdPlanCard.querySelector('.default-p').textContent = '$150/yr';

        const discountMsgs = document.querySelectorAll(".yearly-discount");
        discountMsgs.forEach(msg => {
            msg.classList.remove('active')
        });

        addOn1.querySelector('h4').textContent = '+$10/yr';
        addOn2.querySelector('h4').textContent = '+$20/yr';
        addOn3.querySelector('h4').textContent = '+$20/yr';

        chosedAddonsInfo.forEach(elem => {
            elem.price = elem.price * 10
        });

        chosedPlanPrice = chosedPlanPrice * 10;
    }
    checkTotal();
    updateCheckoutInfo();
}

function updateCheckoutInfo() {
    let currentAddons = Array.from(document.querySelectorAll(".selected-add-on"));
    let selectedPlanPriceElText = selectedPlanPriceEl.textContent.replace(/\D/g, "");

    if (toggleStatus === 'year') {
        if (chosedPlanPrice) {
            let converted = `$${selectedPlanPriceElText * 10}`
            selectedPlanPriceEl.textContent = converted;
        }
        let valueOne = currentAddons.filter(addon => addon.querySelector('h5').textContent.replace(/\D/g, "") === '1');
        let valueTwo = currentAddons.filter(addon => addon.querySelector('h5').textContent.replace(/\D/g, "") === '2');
        valueOne.forEach(elem => elem.querySelector('h5').textContent = '+$10/yr');
        valueTwo.forEach(elem => elem.querySelector('h5').textContent = '+$20/yr');
    } else {
        if (chosedPlanPrice) {
            let converted = `$${selectedPlanPriceElText / 10}`
            selectedPlanPriceEl.textContent = converted
        };
        let valueOne = currentAddons.filter(addon => addon.querySelector('h5').textContent.replace(/\D/g, "") === '10');
        let valueTwo = currentAddons.filter(addon => addon.querySelector('h5').textContent.replace(/\D/g, "") === '20');
        valueOne.forEach(elem => elem.querySelector('h5').textContent = '+$1/mo');
        valueTwo.forEach(elem => elem.querySelector('h5').textContent = '+$2/mo');
    }
}

// SECTION PLANS ---------------------------------

const firstPlanCard = document.querySelector(".plan-card-1");
const secondPlanCard = document.querySelector(".plan-card-2");
const thirdPlanCard = document.querySelector(".plan-card-3");
const allPlansCards = document.querySelectorAll(".plan-card");
let chosedPlanName
let chosedPlanPrice
let planSelected = false

let chosedPlanTitleEl = document.querySelector('.selected-plan-title');
let selectedPlanPriceEl = document.querySelector('.selected-plan-price');

allPlansCards.forEach((card) => {
    card.addEventListener("click", (e) => {
        if (warningMsg) {
            warningMsg.remove()
        }
        allPlansCards.forEach(card => {
            card.style.border = '1px solid transparent'
        })
        storePlanData(e.target, card);
        planSelected = true
    })
})

function storePlanData(chosedCard, parentCard) {
    chosedCard = parentCard
    chosedCard.style.border = '1px solid var(--clr-purple-blue)'

    chosedPlanName = chosedCard.querySelector('h4').textContent;
    chosedPlanPrice = chosedCard.querySelector('p').textContent;

    if (toggleStatus === 'month') {
        chosedPlanTitleEl.textContent = chosedPlanName + ' (Monthly)'
    } else {
        chosedPlanTitleEl.textContent = chosedPlanName + ' (Yearly)'
    }
    selectedPlanPriceEl.textContent = chosedPlanPrice

    chosedPlanPrice = parseInt(chosedPlanPrice.replace(/\D/g, ""));

    checkTotal()
}

// SECTION PLANS ---------------------------------

// SECTION ADDONS -------------------------------
const addOn1 = document.querySelector(".add-on1");
const addOn2 = document.querySelector(".add-on2");
const addOn3 = document.querySelector(".add-on3");
const allAddOns = document.querySelectorAll(".add-ons-card");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const selectedAddonsContainerCheckout = document.querySelector('.selected-add-ons');
let chosedAddonsInfo = [];


checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        if (checkbox.checked === false) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    })
});

allAddOns.forEach((addOnCard) => {
    addOnCard.addEventListener("click", () => {
        const checkboxValue = addOnCard.querySelector("input");

        if (checkboxValue.checked === false) {
            checkboxValue.checked = true;
            addOnCard.style.border = '1px solid var(--clr-purple-blue)';
            let addonObject = {
                price: +addOnCard.querySelector('h4').textContent.replace(/\D/g, ""),
                id: addOnCard.querySelector('h5').textContent   
            };
            if (chosedAddonsInfo.length === 3) return;
            chosedAddonsInfo.push(addonObject);
            createAddon(addOnCard);

        } else {
            let filteredAddons = chosedAddonsInfo.filter(elem => elem.id !== addOnCard.querySelector('h5').textContent);
            chosedAddonsInfo = filteredAddons;
            checkboxValue.checked = false;
            addOnCard.style.border = '1px solid transparent';
            removeAddon(addOnCard);
        }
        checkTotal()
    })
})

function createAddon(cardPassed) {
    cardPassed = {
        name: cardPassed.querySelector('h4').textContent,
        price: cardPassed.querySelector('h5').textContent
    };
    selectedAddonsContainerCheckout.insertAdjacentHTML('afterbegin',
        `<div class="selected-add-on">
           <h4 class="selected-add-on-title">${cardPassed.price}</h4>
           <h5 class="selected-add-on-price">${cardPassed.name}</h5>
       </div>`);
}

function removeAddon(cardPassed) {
    let currentAddons = Array.from(document.querySelectorAll('.selected-add-on'));
    let removedAddon = currentAddons.filter(elem => {
         return elem.querySelector('h4').textContent === cardPassed.querySelector('h5').textContent
     });
     removedAddon[0].remove();
}

// Section addons end-------------------------------

const totalCostTitleEl = document.querySelector('.total-cost-title');
const totalCostPriceEl = document.querySelector('.total-cost');

function checkTotal() {
    let addonsInfoTotalPrice = chosedAddonsInfo.map(addon => {
        return addon.price
    })
    const totalAddOnsPrice = addonsInfoTotalPrice.reduce((partialSum, a) => {
        return partialSum + a
    }, 0);
    totalCostTitleEl.textContent = `Total (per ${toggleStatus})`
    if (typeof (chosedPlanPrice) === 'number') {
        totalCostPriceEl.textContent = ` $ ${totalAddOnsPrice + chosedPlanPrice}`
    } else {
        totalCostPriceEl.textContent = `$ ${totalAddOnsPrice}`
    }
}

const concludeBtn = document.querySelector(".conclude-btn");
let warningMsg

concludeBtn.addEventListener('click', () => {
    if (planSelected === false) {
        if (!document.querySelector(".warning-msg")) {
            warningMsg = document.createElement('span');
            warningMsg.textContent = "You haven't selected a plan!"
            warningMsg.classList.add('warning-msg')
            selectedAddonsContainerCheckout.append(warningMsg);   
        }
    } else {
        hideOthers()
        const lastSection = document.querySelector(".last-section");
        lastSection.classList.remove('hidden')
    }
})