const eventsContainer = document.getElementById("events-container");

const sortContainer = document.getElementById("sort-container");
const sortButton = document.getElementById("sort-button");
const cancelMark = document.getElementById("cancel-mark");

const sortPopupButton = document.getElementById("sort-popup-button");
const sortTitle = document.getElementById("sort-title");
const sortFee = document.getElementById("sort-fee");

const sortDate = document.getElementById("sort-date");
const filterContainer = document.getElementById("filter-container");
const filtersButton = document.getElementById("filters-button");

const filterPopupButton = document.getElementById("filter-popup-button");
const cancelFilter = document.getElementById("cancel-filter");

const signup = document.getElementById("signup");

const today = document.getElementById("today");
const tomorrow = document.getElementById("tomorrow");
const thisWeek = document.getElementById("this-week");

const myevents = document.getElementById("myevents");
const removeContainer = document.getElementById("remove-container");
const filtersActive = document.getElementById("filters-active");

const sortActive = document.getElementById("sort-active");
const searchInput = document.getElementById("search-input");

// const eventsData = [
//   {
//     id: 1,
//     event_name: "Tech Conference 2023",
//     date: "2023-06-01",
//     time: "09:00 AM - 06:00 PM",
//     location: "Convention Center, City A",
//     description:
//       "A conference dedicated to showcasing the latest advancements in technology.",
//     entry_fee: 50,
//     image_url:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRr3hkSH2Hg3bOUlljcb6F8QAkTg_WkwR4Cy_4-Cl7fqxEqWH2P-8PXyMD5LGJpYRfFiM&usqp=CAU",
//   },
//   {
//     id: 2,
//     event_name: "Music Festival",
//     date: "2023-06-02",
//     time: "02:00 PM - 11:00 PM",
//     location: "Outdoor Park, City B",
//     description:
//       "A lively music festival featuring various genres and talented artists.",
//     entry_fee: 30,
//     image_url:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuMvrJ0Tg07t78JXz8HtQFDDGSCU9truK9ZX582VLy&s",
//   },
//   {
//     id: 3,
//     event_name: "Business Workshop",
//     date: "2023-06-01",
//     time: "10:00 AM - 04:00 PM",
//     location: "Business Center, City C",
//     description:
//       "A workshop focused on improving business strategies and entrepreneurship skills.",
//     entry_fee: 20,
//     image_url:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5vUEadFvlH5Pz1W4S841lEdN15gboCyJEcw&usqp=CAU",
//   },
//   {
//     id: 4,
//     event_name: "Charity Gala Dinner",
//     date: "2023-06-03",
//     time: "06:30 PM - 11:00 PM",
//     location: "Grand Hotel, City D",
//     description:
//       "An elegant evening of dining and entertainment to raise funds for a charitable cause.",
//     entry_fee: 100,
//     image_url:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwdvlw1F-Om6WBorzcBTLzlKLuJVfWdlvtmQ&usqp=CAU",
//   },
//   {
//     id: 5,
//     event_name: "Art Exhibition",
//     date: "2023-07-10",
//     time: "10:00 AM - 06:00 PM",
//     location: "Art Exhibition",
//     description:
//       "A curated art exhibition showcasing diverse artistic expressions.",
//     entry_fee: 10,
//     image_url:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Pn0pMg3Nd5SMitk3uF_tW6yVFlg53ASMHA&usqp=CAU",
//   },
//   {
//     id: 6,
//     event_name: "Sports Tournament",
//     date: "2023-08-05",
//     time: "08:00 AM - 05:00 PM",
//     location: "Sports Complex, City F",
//     description:
//       "A competitive sports tournament featuring various sports disciplines.",
//     entry_fee: 15,
//     image_url:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj1Nf2wfvCG0xWdyKupXmzIwjpJRd-zFyMbQ&usqp=CAU",
//   },
//   {
//     id: 7,
//     event_name: "Food Festival",
//     date: "2023-09-17",
//     time: "12:00 PM - 09:00 PM",
//     location: "Downtown Square, City G",
//     description:
//       "A gastronomic extravaganza showcasing a wide array of culinary delights.",
//     entry_fee: 25,
//     image_url:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO5DnMi0uw4XEfJkCmmETwzhvmH97LulRW0A&usqp=CAU",
//   },
// ];

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  let expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}`;
}

signup.addEventListener("click", () => {
  if (signup.textContent === "Logout") {
    setCookie("user_id", null, null);

    window.location.href = "/";
  } else if (signup.textContent === "Login") {
    window.location.href = "/login";
  }
});

removeContainer.classList.add("no-display");

let removeId;
function removeEvent(event, id) {
  removeContainer.classList.remove("no-display");
  removeId = id;
}

async function removeYes(event) {
  let url = `http://localhost:3000/api/v1/events/${removeId}`;
  let options = {
    method: "DELETE",
  };

  try {
    const response = await fetch(url, options);
    // const result = await response.json();

    if (response.ok) {
      removeContainer.classList.add("no-display");
      location.reload();
    }
  } catch (error) {
    console.log("error", error);
  }
}

function removeNo(event) {
  removeContainer.classList.add("no-display");
}

sortContainer.classList.add("no-display");
filterContainer.classList.add("no-display");

sortButton.addEventListener("click", () => {
  sortContainer.classList.remove("no-display");
});

filtersButton.addEventListener("click", () => {
  filterContainer.classList.remove("no-display");
});

cancelMark.addEventListener("click", () => {
  sortContainer.classList.add("no-display");
});

cancelFilter.addEventListener("click", () => {
  filterContainer.classList.add("no-display");
});
async function fetchUrl(sort, filter, search) {
  let url = `http://localhost:3000/sort?sort=${sort}&filter=${filter}&search=${search}`;
  try {
    let response = await fetch(url);
    let result = await response.json();
    console.log("reult", result);

    eventsContainer.innerHTML = "";
    eventsContainer.innerHTML = result.events;

    if (result.params.sort !== "undefined") {
      filtersActive.innerHTML = `
      <button class="active-filter-button">  ${result.params.sort}  <i class="fa-solid fa-xmark fa-lg" onclick="cancelSortActive(event)"></i></button>
      `;
    }
    if (result.params.filter !== "undefined") {
      sortActive.innerHTML = `
      <button class="active-filter-button">  ${result.params.filter.split(
        "|"
      )} <i class="fa-solid fa-xmark fa-lg" onclick="cancelFilterActive(event)"></i></button>
      `;
    }
  } catch (error) {
    console.log(error);
  }
}

let sort;
let filter;
let search;

function cancelSortActive(event) {
  sort = undefined;

  fetchUrl(sort, filter, search);
  filtersActive.innerHTML = "";
}

function cancelFilterActive(event) {
  filter = undefined;

  fetchUrl(sort, filter, search);
  sortActive.innerHTML = "";
}

function debounced(cb, delay) {
  let timeout;
  return function () {
    console.log("args");
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      cb();
    }, delay);
  };
}

const updatedDebounceText = debounced(() => {
  fetchUrl(sort, filter, search);
}, 1500);

searchInput.addEventListener("input", (event) => {
  search = event.target.value;
  updatedDebounceText();
});

sortPopupButton.addEventListener("click", async () => {
  sortContainer.classList.add("no-display");
  if (sortFee.checked) {
    sort = "Entry-fee";

    fetchUrl(sort, filter, search);
  } else if (sortDate.checked) {
    sort = "Date";

    fetchUrl(sort, filter, search);
  }
});

filterPopupButton.addEventListener("click", async () => {
  filterContainer.classList.add("no-display");

  if (thisWeek.checked) {
    filter = "This-week";

    fetchUrl(sort, filter, search);
  } else if (today.checked && tomorrow.checked && thisWeek.checked) {
    filter = "Today|Tomorrow|This-week";

    fetchUrl(sort, filter, search);
  } else if (today.checked && tomorrow.checked) {
    filter = "Today|Tomorrow";

    fetchUrl(sort, filter, search);
  } else if (today.checked) {
    filter = "Today";

    fetchUrl(sort, filter, search);
  } else if (tomorrow.checked) {
    filter = "Tomorrow";

    fetchUrl(sort, filter, search);
  } else {
    filter = undefined;

    fetchUrl(sort, filter, search);
  }
});
console.count("outside");
