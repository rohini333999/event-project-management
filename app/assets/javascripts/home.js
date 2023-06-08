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

localStorage.getItem("loginUser")
  ? (signup.textContent = "Logout")
  : (signup.textContent = "Login");

localStorage.getItem("loginUser")
  ? (myevents.textContent = "My Events")
  : (myevents.textContent = "");

signup.addEventListener("click", () => {
  console.log("signup", signup.textContent);
  if (signup.textContent === "Logout") {
    signup.textContent = "Login";

    localStorage.removeItem("loginUser");
    window.location.href = "/";
  } else if (signup.textContent === "Login") {
    window.location.href = "/login";
  }
});

function renderEvents(data) {
  eventsContainer.innerHTML = "";
  let allEvents = data.map((each) => {
    const eventCardContainer = document.createElement("div");

    eventCardContainer.classList.add("event-card-container");

    eventCardContainer.innerHTML += `
      <img src=${each.location_url} class="event-image"/>
      <div class="event-header" id="event-header">
          <h2 class="event-name">${each.event_name}</h2>
          <p>${each.location}</p>
          <p id="event-fee">Entry Fee $${each.entry_fee}</p> 
          <p>Event Date ${each.start_date}</p>
          <a href= "events/${each.id}">View Details</a>   
      </div>
  `;

    eventCardContainer.addEventListener("click", () => {});

    eventsContainer.appendChild(eventCardContainer);
    return eventCardContainer;
  });
}
let eventsData;

async function getEvents() {
  let url = "http://localhost:3000/api/v1/events";
  try {
    const response = await fetch(url);
    const eventsResult = await response.json();

    if (!response.ok) {
      throw new Error("Error:", response.status);
    } else {
      console.log("eventsResult", eventsResult);
      eventsData = eventsResult;

      // renderEvents(eventsResult);
    }
  } catch (error) {
    console.log("error", error);
  }
}
getEvents();

// let renderEventsData = eventsData;
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

sortPopupButton.addEventListener("click", () => {
  let sortedData = eventsData;

  if (sortFee.checked) {
    sortedData.sort((value1, value2) => {
      const fee1 = value1.entry_fee;
      const fee2 = value2.entry_fee;
      if (fee1 < fee2) {
        return 1;
      } else if (fee1 > fee2) {
        return -1;
      } else {
        return 0;
      }
    });

    renderEvents(sortedData);
  } else if (sortDate.checked) {
    let sortedData = eventsData;
    sortedData.sort((value1, value2) => {
      const date1 = new Date(value1.date);
      const date2 = new Date(value2.date);
      if (date1 > date2) {
        return 1;
      } else if (date1 < date2) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  renderEvents(renderEventsData);
  sortContainer.classList.add("no-display");
});

function thisWeekEvents() {
  const currentDate = new Date();
  const currentWeekStart = new Date(currentDate);

  currentWeekStart.setHours(0, 0, 0, 0);
  currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay());

  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 7);

  const eventsThisWeek = eventsData.filter((each) => {
    const eventDate = new Date(each.date);

    return eventDate >= currentWeekStart && eventDate < currentWeekEnd;
  });
  return eventsThisWeek;
}

function todayEvents() {
  const currentDate = new Date();
  const filteredEvents = eventsData.filter((each) => {
    const eventDate = new Date(each.date);

    return (
      eventDate.getDate() === currentDate.getDate() &&
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear()
    );
  });
  return filteredEvents;
}

function tomorrowEvents() {
  const currentDate = new Date();
  const nextDay = new Date(currentDate);

  nextDay.setDate(currentDate.getDate() + 1);

  const filteredEventsTomorrow = eventsData.filter((each) => {
    const eventDate = new Date(each.date);

    return (
      eventDate.getDate() === nextDay.getDate() &&
      eventDate.getMonth() === nextDay.getMonth() &&
      eventDate.getFullYear() === nextDay.getFullYear()
    );
  });
  return filteredEventsTomorrow;
}

filterPopupButton.addEventListener("click", () => {
  filterContainer.classList.add("no-display");

  if (thisWeek.checked) {
    let eventsThisWeek = thisWeekEvents();

    renderEvents(eventsThisWeek);
  } else if (today.checked && tomorrow.checked) {
    let filteredEvents = todayEvents();
    let filteredEventsTomorrow = tomorrowEvents();

    renderEvents([...filteredEvents, ...filteredEventsTomorrow]);
  } else if (today.checked) {
    let filteredEvents = todayEvents();

    renderEvents(filteredEvents);
  } else if (tomorrow.checked) {
    let filteredEventsTomorrow = tomorrowEvents();
    renderEvents(filteredEventsTomorrow);
  } else {
    console.log("ff");
    renderEvents(renderEventsData);
  }
});
console.count("outside");
