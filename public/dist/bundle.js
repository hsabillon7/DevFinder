/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/app.js":
/*!**************************!*\
  !*** ./public/js/app.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  var skills = document.querySelector(\".lista-conocimientos\");\n\n  if (skills) {\n    skills.addEventListener(\"click\", agregarSkill); // Skills seleccionados para el formulario de editar\n\n    skillsSeleccionados();\n  } // Limpiar las alertas\n\n\n  var alertas = document.querySelector(\".alertas\");\n\n  if (alertas) {\n    limpiarAlertas(alertas);\n  }\n}); // Utilizar Set en un lugar de arreglos\n\nvar skills = new Set();\n\nvar agregarSkill = function agregarSkill(e) {\n  if (e.target.classList.contains(\"activo\")) {\n    //   eliminar del Set\n    skills[\"delete\"](e.target.textContent); // Remover el estilo\n\n    e.target.classList.remove(\"activo\");\n  } else {\n    //   Agregar al Set\n    skills.add(e.target.textContent); // Agregar el estilo activo\n\n    e.target.classList.add(\"activo\");\n  } //   Crear un arreglo de un literal\n\n\n  var skillsArray = _toConsumableArray(skills);\n\n  document.querySelector(\"#skills\").value = skillsArray;\n};\n\nvar skillsSeleccionados = function skillsSeleccionados() {\n  var seleccionados = Array.from(document.querySelectorAll(\".lista-conocimientos .activo\"));\n  seleccionados.forEach(function (seleccionado) {\n    skills.add(seleccionado.textContent);\n  }); //  Inyectar al input hidden\n\n  var skillsArray = _toConsumableArray(skills);\n\n  document.querySelector(\"#skills\").value = skillsArray;\n};\n\nvar limpiarAlertas = function limpiarAlertas(alertas) {\n  // Verificar si el div alertas tiene hijos\n  var interval = setInterval(function () {\n    if (alertas.children.length > 0) {\n      alertas.removeChild(alertas.children[0]);\n    } else {\n      alertas.parentElement.removeChild(alertas);\n      clearInterval(interval);\n    }\n  }, 3000);\n};\n\n//# sourceURL=webpack:///./public/js/app.js?");

/***/ })

/******/ });