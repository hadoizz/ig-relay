module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api/bots/dev/getId.ts":
/*!*******************************!*\
  !*** ./api/bots/dev/getId.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../fetch */ "./api/fetch.ts");

/* harmony default export */ __webpack_exports__["default"] = (async () => {
  const body = await Object(_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/bots/dev`);
  const {
    id
  } = await body.json();
  return id;
});

/***/ }),

/***/ "./api/bots/executeSupervisor.ts":
/*!***************************************!*\
  !*** ./api/bots/executeSupervisor.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fetch */ "./api/fetch.ts");


/* harmony default export */ __webpack_exports__["default"] = (async (id, name, payload) => {
  const body = await Object(_fetch__WEBPACK_IMPORTED_MODULE_1__["default"])(`/bots/${id}/executeSupervisor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()({
      name,
      payload
    })
  });
  const {
    result
  } = await body.json();
  return result;
});

/***/ }),

/***/ "./api/bots/getSupervisors.ts":
/*!************************************!*\
  !*** ./api/bots/getSupervisors.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../fetch */ "./api/fetch.ts");

/* harmony default export */ __webpack_exports__["default"] = (async id => {
  const body = await Object(_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/bots/${id}/getSupervisors`);
  const supervisors = await body.json();
  return supervisors;
});

/***/ }),

/***/ "./api/fetch.ts":
/*!**********************!*\
  !*** ./api/fetch.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((path, props) => {
  path = `http://localhost:8080${path}`;
  return fetch(path, props);
});

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/json/stringify */ "core-js/library/fn/json/stringify");

/***/ }),

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/styles */ "@material-ui/styles");
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api_bots_dev_getId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/bots/dev/getId */ "./api/bots/dev/getId.ts");
/* harmony import */ var _api_bots_getSupervisors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api/bots/getSupervisors */ "./api/bots/getSupervisors.ts");
/* harmony import */ var _api_bots_executeSupervisor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api/bots/executeSupervisor */ "./api/bots/executeSupervisor.ts");
var _jsxFileName = "C:\\Users\\Artur\\Documents\\Node\\Insta\\www\\client\\pages\\index.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






const useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_2__["makeStyles"])(theme => ({
  button: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const createSupervisionExecutor = id => ({
  name,
  arity
}) => () => Object(_api_bots_executeSupervisor__WEBPACK_IMPORTED_MODULE_5__["default"])(id, name, arity === 0 ? undefined : prompt('Podaj wartość'));

/* harmony default export */ __webpack_exports__["default"] = (() => {
  const {
    0: id,
    1: setId
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: supervisors,
    1: setSupervisors
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => void (id && Object(_api_bots_getSupervisors__WEBPACK_IMPORTED_MODULE_4__["default"])(id).then(setSupervisors)), [id]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => void Object(_api_bots_dev_getId__WEBPACK_IMPORTED_MODULE_3__["default"])().then(setId), []);
  const supervisionExecutor = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => createSupervisionExecutor(id), [id]);
  const classes = useStyles({});
  return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: undefined
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["CssBaseline"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: undefined
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: undefined
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["CardContent"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: undefined
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
    variant: "h3",
    gutterBottom: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: undefined
  }, "Bociak"), supervisors.map(({
    name,
    title,
    arity
  }) => __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "contained",
    key: name,
    onClick: supervisionExecutor({
      name,
      arity
    }),
    className: classes.button,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: undefined
  }, title)))));
});
/*
export default () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [botStatus, setBotStatus] = useState(BotStatus.NotChecked)
  const [supervisors, setSupervisors] = useState([])
  const classes = useStyles({})

  useEffect(() => {
    const checkBotStatus = async () => {
      const isRunning = await (await fetch(`${getServerUrl()}/dev/isRunning`)).json()
      setBotStatus(isRunning
        ? BotStatus.Running
        : BotStatus.Stopped
      )
    }

    checkBotStatus()
  }, [])

  useEffect(() => {
    if(botStatus !== BotStatus.Running)
      return

    const updateSupervisors = async () => {
      try {
        setSupervisors(
          await (await fetch(`${getServerUrl()}/dev/supervisors`)).json()
        )
      } catch(error){
        return
      }
    }

    updateSupervisors()
  }, [botStatus])

  const startBot = async () => {
    setBotStatus(BotStatus.Starting)
    await fetch(`${getServerUrl()}/dev/start`, {
      method: 'POST',
      body: JSON.stringify({ login, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    setBotStatus(BotStatus.Running)
  }

  const exitBot = () => {
    fetch(`${getServerUrl()}/dev/exit`, { method: 'POST' })
    setBotStatus(BotStatus.Stopped)
  }

  const execute = ({ name, arity }: { name: string, arity: number }) => async () => {
    const payload = (() => {
      if(arity === 0)
        return undefined

      const arg = prompt('Podaj argument')
      if(Number.isNaN(Number(arg)))
        return arg 

      return parseInt(arg)
    })()

    const response = await fetch(`${getServerUrl()}/dev/executeSupervisor`, {
      method: 'POST',
      body: JSON.stringify({ name, payload } as BotCommandDto),
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.text()
    if(result)
      alert(result)
  }

  return ( 
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SettingsIcon />
          </Avatar>
          <Typography variant="h5" component="h1">
            Panel sterowania
          </Typography>
          {
            botStatus === BotStatus.NotChecked || botStatus === BotStatus.Starting
              ? (
                <Button variant="contained" color="primary" className={classes.runButton} disabled>
                  Uruchom bota
                </Button>
              ) : botStatus === BotStatus.Running
                ? (
                  <Button variant="contained" color="primary" className={classes.runButton} onClick={exitBot}>
                    Wyłącz bota
                  </Button>
                ) : (
                  <>
                    <p>
                      <TextField
                        label="Login"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                      />
                      <TextField
                        type="password"
                        label="Hasło"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </p>
                    <Button variant="contained" color="primary" className={classes.runButton} onClick={startBot}>
                      Uruchom bota
                    </Button>
                  </>
                )
          }
          {
            supervisors.length !== 0 && botStatus === BotStatus.Running && (
              <Grid container>
                <Grid item xs className={classes.list}>
                  <Typography variant="caption" gutterBottom>Opcje</Typography>
                  {
                    supervisors.map(({ name, title, arity }) =>
                      <Button 
                        variant="contained" 
                        className={classes.listButton} 
                        key={name} 
                        onClick={execute({ name, arity })}
                        {...arity !== 0 && { endIcon: <MessageIcon /> }}
                      >
                      {
                        title
                      }
                      </Button>
                    )
                  }
                </Grid>
              </Grid>
            )
          }
        </Paper>
      </Container>
    </>
  )
}*/

/***/ }),

/***/ 3:
/*!*******************************!*\
  !*** multi ./pages/index.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Artur\Documents\Node\Insta\www\client\pages\index.tsx */"./pages/index.tsx");


/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "@material-ui/styles":
/*!**************************************!*\
  !*** external "@material-ui/styles" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/styles");

/***/ }),

/***/ "core-js/library/fn/json/stringify":
/*!****************************************************!*\
  !*** external "core-js/library/fn/json/stringify" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/json/stringify");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map