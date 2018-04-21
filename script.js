
const $body = $('body');
const $grid = $('.grid');
const $employee = $('.employee');

const sucFunc = (data) => {
  let results = data.results
  let person = data.results.map(person => `
  <div class="box">
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
        <span class="street">${person.location.street}, </span>
        <span class="state">${person.location.state}, </span>
        <span class="postcode">${person.location.postcode}</span>
      </div>
      <div class="dob">Birthday: <span class="output"></span><span class="input">${person.dob}</span></div>
    </div>
    <div class="exit">x</div>
  </div>`);
  $grid.html(person);
}

const ajxFunc = () => {
  $.ajax({
    url: 'https://randomuser.me/api/?results=12&inc=name,email,location,dob,cell,picture',
    dataType: 'json',
    success: sucFunc
  });
}

const resetFunc = () => {
  $body.removeClass('lightbox');
  let store = '';
  $('.employee').html('');
  let dob = '';
  $('.output','.employee').html('');
}

function overlayFunc() {
  $body.addClass('lightbox');
  let store = $(this).html();
  $('.employee').html(store);
  let dob = $('.input','.employee').html().slice(0,10);
  $('.output','.employee').html(dob);
}

ajxFunc();

$(document).ready(function() {
  $grid.on('click','.box',overlayFunc);
  $employee.on('click','.exit',resetFunc);
});
