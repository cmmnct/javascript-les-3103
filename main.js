/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
'use strict';
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

// list with eventlisteners
sliderbox.addEventListener('input', onInputSliders);
thumbBox.addEventListener('click', onClickColorpatch);
editBox.addEventListener('input', onInputColorSliders);


const tiptext = [
  'U heeft ondergewicht. Dit kan gevolgen hebben voor uw gezondheid. Bezoek een di&euml;tist',
  'Uw gewicht is prima! Houd dit vol, beweeg voldoende en blijf gezond eten!',
  'Uw gewicht is aan de hoge kant. Porbeer iets meer te bewegen en iets minder te snoepen',
  'Uw gewicht is te hoog. U loopt kans op obesitas en daaraan gerelateerde lichaamsklachten. Bezoek een di&euml;tist',
  'Uw gewicht is alarmerend hoog!!! Bezoek onmiddelijk een arts. U loopt acuut levensgevaar!',
];
let currentPatchName;
let currentPatch;
const patches = [
  {
    'r': 255,
    'g': 0,
    'b': 0,
    'a': 1,
    'name': 'red',
  },
  {
    'r': 0,
    'g': 255,
    'b': 0,
    'a': 1,
    'name': 'green',
  }, {
    'r': 0,
    'g': 0,
    'b': 255,
    'a': 1,
    'name': 'blue',
  },
  {
    'r': 255,
    'g': 255,
    'b': 0,
    'a': 1,
    'name': 'yellow',
  }, {
    'r': 0,
    'g': 255,
    'b': 255,
    'a': 1,
    'name': 'cyan',
  }, {
    'r': 255,
    'g': 0,
    'b': 255,
    'a': 1,
    'name': 'magenta',
  }, {
    'r': 255,
    'g': 255,
    'b': 255,
    'a': 1,
    'name': 'white',
  }, {
    'r': 0,
    'g': 0,
    'b': 0,
    'a': 1,
    'name': 'black',
  }, {
    'r': 128,
    'g': 128,
    'b': 128,
    'a': 1,
    'name': 'grey',
  },
];

function onClickColorpatch(evt) {
  // console.log(evt.target.name);
  currentPatchName = evt.target.name;
  editBox.style.visibility = 'visible';
  editBox.style.backgroundColor = evt.target.style.backgroundColor;
  currentPatch = patches.findIndex(findItemByColor);
  console.log(currentPatch);
  sliderR.value = patches[currentPatch].r;
  sliderG.value = patches[currentPatch].g;
  sliderB.value = patches[currentPatch].b;
  sliderA.value = patches[currentPatch].a;
  outputR.value = patches[currentPatch].r;
  outputG.value = patches[currentPatch].g;
  outputB.value = patches[currentPatch].b;
  outputA.value = patches[currentPatch].a;
}

function findItemByColor(value, index, array) {
  return array[index].name === currentPatchName;
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

function onInputColorSliders() {
  patches[currentPatch].r = sliderR.value;
  patches[currentPatch].g = sliderG.value;
  patches[currentPatch].b = sliderB.value;
  patches[currentPatch].a = sliderA.value;
  console.log(patches[currentPatch]);
  editBox.style.backgroundColor = `rgba(${sliderR.value},${sliderG.value},${sliderB.value},${sliderA.value})`;
}

const someObject = {
  age: 39,
  sex: 'm',
  firstName: 'Mark',
  lastName: 'Nijenhuis',
  fullName: function() {
    return this.firstName + this.lastName;
  },


};

// eslint-disable-next-line prefer-const, no-unused-vars
let myAge = someObject.fullName(); // mutable
// eslint-disable-next-line no-unused-vars
const myName = 'Mark Nijenhuis'; // immutable

patches.forEach((item) => addPatchToDom(item, thumbBox));

function addPatchToDom(item, domContainer) {
  const newElement = document.createElement('div');
  newElement.className = 'patch';
  // newElement.style.backgroundColor = 'rgba(' + item.r + ', ' + item.g + ', ' + item.b + ', ' + item.a + ')';
  newElement.style.backgroundColor = `rgba(${item.r},${item.g},${item.b},${item.a})`;
  newElement.title = item.name;
  newElement.name = item.name;
  // return newElement;
  domContainer.appendChild(newElement);
}
