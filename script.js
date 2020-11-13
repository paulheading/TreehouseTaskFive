const $body = $("body");
const $grid = $(".grid");
const $employee = $(".employee");
const $employeeOutput = $(".output", ".employee");

// combine html/json for each user and print to DOM
function printUser(data) {
  const person = data.results.map((person) => {
    const bday = person.dob.date.slice(0, 10);

    return `<div class="box">
    <div class="col1">
      <div class="avatar" style="background-image:url('${person.picture.large}');"></div>
    </div>
    <div class="col2">
      <div class="name">
        <span class="first"><strong>${person.name.first}</strong></span>
        <span class="last"><strong>${person.name.last}</strong></span>
      </div>
      <div class="email">${person.email}</div>
      <div class="city">${person.location.city}</div>
    </div>
    <div class="col3">
      <div class="cell">${person.cell}</div>
      <div class="address">
        <span class="street">${person.location.street.name}, </span>
        <span class="state">${person.location.state}, </span>
        <span class="postcode">${person.location.postcode}</span>
      </div>
      <div class="dob">Birthday: <span class="output">${bday}</span></div>
    </div>
    <div class="exit">x</div>
  </div>`;
  });
  $grid.html(person);
}

// request data from randomuser.me using jquery ajax
function apiCall() {
  $.ajax({
    url:
      "https://randomuser.me/api/?results=12&inc=name,email,location,dob,cell,picture",
    dataType: "json",
    success: printUser,
  });
}

function closeOverlay() {
  $body.removeClass("lightbox");
  $employee.html("");
  $employeeOutput.html("");
}

function openOverlay() {
  $body.addClass("lightbox");
  let store = $(this).html();
  $employee.html(store);
}

apiCall();

$(document).ready(function () {
  $grid.on("click", ".box", openOverlay);
  $employee.on("click", ".exit", closeOverlay);
});
