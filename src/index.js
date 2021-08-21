import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ConvertCurrency from './currencyConvert.js';

function clearFields() {
  $('.showConversion').text("");
  $('.showErrors').text("");
}

function getElements(response, totalUSD, foreignCurrency) {
  if (response.result === "success") {
    $('.showConversion').text(`Your USD is worth: $${(response["conversion_rates"][foreignCurrency]*[totalUSD]).toFixed(2)}`);
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}

async function makeApiCall(totalUSD, foreignCurrency) {
  const response = await ConvertCurrency.getConversion();
  getElements(response, totalUSD, foreignCurrency);
}

$(document).ready(function () {
  $('#convertCurrency').click(function () {
    event.preventDefault();
    let totalUSD = $('#usdTotal').val();
    const foreignCurrency = $('#chooseCurrency').val();
    clearFields();
    makeApiCall(totalUSD, foreignCurrency);
  });
});