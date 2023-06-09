// const myeventsContainer = document.getElementById("myevents-container");

// let eventsData;
// function renderMyEvents(data) {
//   eventsData = data;
//   console.log("data", data[0].location);

//   let allEvents = data.map((each) => {
//     console.log("ecf", each.location);
//     const eventCardContainer = document.createElement("div");

//     eventCardContainer.classList.add("myevent-card-container");

//     eventCardContainer.innerHTML += `
//     <img src=${each.location_url} class="myevent-image"/>
//     <div class="event-header" id="event-header">
//         <h2 class="event-name">${each.event_name}</h2>
//          <div>
//                 <p>Event Category</p>
//                 <p class="category">${each.category}</p>
//             </div>
//             <div class="icon-container">
//                 <i class="fa-solid fa-calendar fa-lg"></i>
//                 <p>${each.start_date} to ${each.end_date}</p>
//             </div>
//             <div class="icon-container">
//                 <i class="fa-solid fa-location-dot fa-lg"></i>
//                 <p>${each.location}</p>
//             </div>
//             <div class="icon-container">
//                 <i class="fa-solid fa-wallet fa-lg"></i>
//                 <p>$${each.entry_fee}</p>
//             </div>
//         </div>
//     `;

//     eventCardContainer.addEventListener("click", () => {});

//     myeventsContainer.appendChild(eventCardContainer);
//     return eventCardContainer;
//   });
// }
// async function getRegisterEvents() {
//   try {
//     let url = "http://localhost:3000/api/v1/register";

//     const response = await fetch(url);
//     const result = await response.json();

//     console.log(result);
//     let user = JSON.parse(localStorage.getItem("loginUser"));
//     let user_id = user.id;

//     let registerEvents = result.filter((each) => {
//       return each.users_id === user_id;
//     });

//     let eventIds = [];
//     registerEvents.forEach((each) => {
//       eventIds.push(each.events_id);
//     });

//     let jsonData = JSON.stringify(eventIds);
//     console.log("jsonj", jsonData);

//     // xhr = new XMLHttpRequest();
//     // xhr.open("POST", "/api/v1/events");
//     // xhr.setRequestHeader("Content-Type", "application/json");
//     // xhr.send(encodeURI("data=" + jsonData));

//     // $.ajax({
//     //   url: '@Url.Action("myevents")',
//     //   type: "POST",
//     //   data: { arrayData: jsonData },
//     //   success: function (response) {
//     //     console.log("Array sent successfully!");
//     //     // Handle the response from the controller if needed
//     //   },
//     //   error: function (xhr, status, error) {
//     //     console.error("Error sending array: " + error);
//     //   },
//     // });

//     //   let eventsUrl = "http://localhost:3000/api/v1/events";
//     //   const eventResponse = await fetch(eventsUrl);
//     //   const eventsResult = await eventResponse.json();

//     //   if (eventResponse.ok) {
//     //     console.log("evntid", eventsResult);
//     //     let allEvents = [];

//     //     eventIds.forEach((id) => {
//     //       let event = eventsResult.filter((each) => {
//     //         return each.id === id;
//     //       });
//     //       allEvents.push(...event);
//     //     });
//     //     console.log("allevents", allEvents);

//     //     renderMyEvents(allEvents);
//     //   }
//   } catch (error) {
//     console.log("Error", error);
//   }
// }
// //getRegisterEvents();
