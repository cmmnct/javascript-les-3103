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
let editPatch;
const myUrl = 'https://my-json-server.typicode.com/cmmnct/patchDemo/patches';
let colorPatches = [];
let key = 'colorpatches';
//btnSaveColor.setAttribute('disabled', true);

if (!window.localStorage.getItem(key)) {
  fetchColorPatches(myUrl, colorPatches, thumbBox);
}
else {
  getColorPatches(key, colorPatches, thumbBox);
}

async function fetchColorPatches(url, dataArray, domElement) { //pure function: geen side effects!!
  if (url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    await jsonData.forEach(item => dataArray.push(new ColorPatch(item.r, item.g, item.b, item.a, item.name, item.id,)))
    await dataArray.forEach((item) => addPatchToDom(item, domElement));
    let add = new ColorPatch(0, 0, 0, 1, "black", 1000);
    addPatchToDom(add, domElement);
  }
}

async function getColorPatches(key, dataArray, domElement) {
  const colorPatchesJSON = await JSON.parse(window.localStorage.getItem(key));
  await colorPatchesJSON.forEach(item => dataArray.push(new ColorPatch(item.r, item.g, item.b, item.a, item.name, item.id,)))
  await dataArray.forEach((item) => addPatchToDom(item, domElement));
  let add = new ColorPatch(0, 0, 0, 0, "new", 1000);
  addPatchToDom(add, domElement);
}

function onClickColorpatch(evt) {
  if (evt.target.className == "patch" && evt.target.name !== "new") {
    let clickedPatch = colorPatches[evt.target.id]; // by reference
    console.log(clickedPatch);
    currentPatchId = evt.target.name;
    editBox.style.backgroundColor = evt.target.style.backgroundColor;
    currentPatchIndex = colorPatches.findIndex(findItemByName);
    editPatch = new ColorPatch(clickedPatch.r, clickedPatch.g, clickedPatch.b, clickedPatch.a, clickedPatch.name, clickedPatch.id);
  }
  else {
    console.log("new patch maken")
    editPatch = new ColorPatch(0, 0, 0, 0, "", 100);
  }
  editBox.style.visibility = 'visible';
  console.log(currentPatchIndex);
  sliderR.value = editPatch.r;
  sliderG.value = editPatch.g;
  sliderB.value = editPatch.b;
  sliderA.value = editPatch.a;
  outputR.value = editPatch.r;
  outputG.value = editPatch.g;
  outputB.value = editPatch.b;
  outputA.value = editPatch.a;
  inputName.value = editPatch.name;
}
function onInputColorSliders() {
  editPatch.r = sliderR.value;
  editPatch.g = sliderG.value;
  editPatch.b = sliderB.value;
  editPatch.a = sliderA.value;
  editPatch.name = inputName.value;
  console.log(editPatch);
  editBox.style.backgroundColor = editPatch.rgba;
  btnSaveColor.style.visibility = 'visible';
  //btnSaveColor.setAttribute('disabled', false);

}


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
  if (!editPatch) {
    colorPatches.splice(currentPatchIndex, 1, editPatch);
  }
  else {
    colorPatches.push(editPatch);
  }

  thumbBox.innerHTML = ""; // let op: geen pure function!
  colorPatches.forEach((item) => addPatchToDom(item, thumbBox));
  btnSaveColor.style.visibility = 'hidden';
  console.log(JSON.stringify(colorPatches));

  const colorPatchJSON = colorPatches.map(item => {
    return {
      "r": item.r,
      "g": item.g,
      "b": item.b,
      "a": item.a,
      "name": item.name,
      "id": item.id,
    }
  })

  window.localStorage.setItem("colorpatches", JSON.stringify(colorPatchJSON));

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


