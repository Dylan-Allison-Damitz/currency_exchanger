import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ConvertCurrency from './currencyConvert.js';

function clearFields() {
  $('#showConversion').text("");
  $('.showErrors').text("");
}

function getElements(response) {
  if (response.conversion_rates) {
    let pullCurrency = response.conversion_rates[0];
    $('#showConversion').text(pullCurrency);
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}

async function makeApiCall(convertedAmount) {
  const response = await ConvertCurrency.getConversion(convertedAmount);
  getElements(response);
}

$(document).ready(function () {
  $('#convertCurrency').click(function () {
    event.preventDefault();
    let totalUSD = parseInt($('#amountUS').val());
    let foreignCurrency = $('#chooseCurrency').val();
    const convertedAmount = (totalUSD * foreignCurrency);
    clearFields();
    makeApiCall(convertedAmount);
  });
});