"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var number = _propTypes.default.number,
    object = _propTypes.default.object,
    string = _propTypes.default.string;

var padZero = function padZero(digit) {
  return "".concat(digit < 10 ? '0' : '').concat(digit);
};
/**
 * Time formatter that turns seconds into h:mm:ss
 */


var FormattedTime =
/*#__PURE__*/
function (_Component) {
  _inherits(FormattedTime, _Component);

  function FormattedTime() {
    _classCallCheck(this, FormattedTime);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormattedTime).apply(this, arguments));
  }

  _createClass(FormattedTime, [{
    key: "getFormattedTime",
    value: function getFormattedTime() {
      var numSeconds = this.props.numSeconds;
      var prefix = numSeconds < 0 ? '-' : '';
      var absNumSeconds = Math.abs(numSeconds);
      var hours = Math.floor(absNumSeconds / 3600);
      var minutes = Math.floor(absNumSeconds % 3600 / 60);
      var seconds = Math.floor(absNumSeconds) % 60;
      return hours > 0 ? "".concat(prefix).concat(hours, ":").concat(padZero(minutes), ":").concat(padZero(seconds)) : "".concat(prefix).concat(minutes, ":").concat(padZero(seconds));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          style = _this$props.style,
          className = _this$props.className;
      return _react.default.createElement("span", {
        className: className,
        style: style
      }, this.getFormattedTime());
    }
  }]);

  return FormattedTime;
}(_react.Component);

FormattedTime.propTypes = {
  numSeconds: number,
  className: string,
  style: object
};
FormattedTime.defaultProps = {
  numSeconds: 0,
  className: null,
  style: {}
};
var _default = FormattedTime;
exports.default = _default;