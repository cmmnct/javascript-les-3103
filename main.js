/* eslint-disable max-len */
'use strict';
import { ColorPatch } from "./lib.js";

// list with DOM elements
const sliderbox = document.getElementById('sliderbox');
const inputL = document.getElementById('input_l');
const inputW = document.getElementById('input_w');
const outputBMI = document.getElementById('output_bmi');
const outputL = document.getElementById('output_l');
const outputW = document.getElementById('output_w');
const tipsBox = document.getElementById('tipsbox');
const dieetLink = document.getElementById('dieetlink');
const thumbBox = document.getElementById('thumb_box');
const editBox = document.getElementById('edit_box');
const sliderR = document.getElementById('slider_r');
const outputR = document.getElementById('output_r');
const sliderG = document.getElementById('slider_g');
const outputG = document.getElementById('output_g');
const sliderB = document.getElementById('slider_b');
const outputB = document.getElementById('output_b');
const sliderA = document.getElementById('slider_a');
const outputA = document.getElementById('output_a');
const inputName = document.getElementById('input_name');
const btnSaveColor = document.getElementById('btn_save_color');

// list with eventlisteners
sliderbox.addEventListener('input', onInputSliders);
thumbBox.addEventListener('click', onClickColorpatch);
editBox.addEventListener('input', onInputColorSliders);
btnSaveColor.addEventListener('click', onClickSaveColor);


const tiptext = [
  'U heeft ondergewicht. Dit kan gevolgen hebben voor uw gezondheid. Bezoek een di&euml;tist',
  'Uw gewicht is prima! Houd dit vol, beweeg voldoende en blijf gezond eten!',
  'Uw gewicht is aan de hoge kant. Porbeer iets meer te bewegen en iets minder te snoepen',
  'Uw gewicht is te hoog. U loopt kans op obesitas en daaraan gerelateerde lichaamsklachten. Bezoek een di&euml;tist',
  'Uw gewicht is alarmerend hoog!!! Bezoek onmiddelijk een arts. U loopt acuut levensgevaar!',
];
let currentPatchId;
let currentPatchIndex;
let currentPatch;

const colorPatches = [
  new ColorPatch(0, 0, 0, 1, "black", 0),
  new ColorPatch(255, 255, 255, 1, "white", 1),
  new ColorPatch(255, 0, 0, 1, "red", 2),
  new ColorPatch(0, 255, 0, 1, "green", 3),
  new ColorPatch(0, 0, 255, 1, "blue", 4),
  new ColorPatch(0, 255, 255, 1, "cyan", 5),
  new ColorPatch(255, 0, 255, 1, "magenta", 6),
  new ColorPatch(255, 255, 0, 1, "yellow", 7),
]

function onClickColorpatch(evt) {
  if (evt.target.className == "patch") {
    let clickedPatch = colorPatches[evt.target.id]; // by reference
    console.log(clickedPatch);
    currentPatchId = evt.target.name;
    editBox.style.visibility = 'visible';
    editBox.style.backgroundColor = evt.target.style.backgroundColor;
    currentPatchIndex = colorPatches.findIndex(findItemByName);
    currentPatch = new ColorPatch(clickedPatch.r, clickedPatch.g, clickedPatch.b, clickedPatch.a, clickedPatch.name, clickedPatch.id);
    console.log(currentPatchIndex);
    sliderR.value = currentPatch.r;
    sliderG.value = currentPatch.g;
    sliderB.value = currentPatch.b;
    sliderA.value = currentPatch.a;
    outputR.value = currentPatch.r;
    outputG.value = currentPatch.g;
    outputB.value = currentPatch.b;
    outputA.value = currentPatch.a;
    inputName.value = currentPatch.name;
  }
}
function onInputColorSliders() {
  currentPatch.r = sliderR.value;
  currentPatch.g = sliderG.value;
  currentPatch.b = sliderB.value;
  currentPatch.a = sliderA.value;
  currentPatch.name = inputName.value;
  console.log(currentPatch);
  editBox.style.backgroundColor = currentPatch.rgba;
  btnSaveColor.style.visibility = 'visible';
}

colorPatches.forEach((item) => addPatchToDom(item, thumbBox));

function addPatchToDom(item, domContainer) {
  const newElement = document.createElement('div');
  newElement.className = 'patch';
  // newElement.style.backgroundColor = 'rgba(' + item.r + ', ' + item.g + ', ' + item.b + ', ' + item.a + ')';
  newElement.style.backgroundColor = item.rgba;
  newElement.title = item.name;
  newElement.name = item.name;
  newElement.id = item.id;
  // return newElement;
  domContainer.appendChild(newElement);
}

function onClickSaveColor() {
  editBox.style.visibility = 'hidden';
  colorPatches.splice(currentPatchIndex, 1, currentPatch);
  thumbBox.innerHTML = ""; // let op: geen pure function!
  colorPatches.forEach((item) => addPatchToDom(item, thumbBox));
  btnSaveColor.style.visibility = 'hidden';
  
}

function findItemByName(value, index, array) {
  return array[index].name === currentPatchId;
}

function onInputSliders(evt) {
  console.log(inputL.value, inputW.value);
  outputL.value = inputL.value;
  outputW.value = inputW.value;

  const QI = Math.round(inputW.value / Math.pow((inputL.value / 100), 2));
  outputBMI.value = QI;
  let bgColor;
  if (QI < 18) {
    bgColor = 'cyan';
    tipsBox.innerHTML = tiptext[0];
    dieetLink.style.visibility = 'visible';
  } else if (QI >= 18 && QI <= 25) {
    bgColor = 'green';
    tipsBox.innerHTML = tiptext[1];
    dieetLink.style.visibility = 'hidden';
  } else if (QI > 25 && QI <= 30) {
    bgColor = 'greenyellow';
    tipsBox.innerHTML = tiptext[2];
    dieetLink.style.visibility = 'hidden';
  } else if (QI > 30 && QI < 40) {
    bgColor = 'coral';
    tipsBox.innerHTML = tiptext[3];
    dieetLink.style.visibility = 'visible';
  } else {
    bgColor = 'red';
    tipsBox.innerHTML = tiptext[4];
  }
  outputBMI.style.backgroundColor = bgColor;
}



const someObject = {
  age: 39,
  sex: 'm',
  firstName: 'Mark',
  lastName: 'Nijenhuis',
  fullName: function () {
    return this.firstName + this.lastName;
  },


};

// eslint-disable-next-line prefer-const, no-unused-vars
let myAge = someObject.fullName(); // mutable
// eslint-disable-next-line no-unused-vars
const myName = 'Mark Nijenhuis'; // immutable


