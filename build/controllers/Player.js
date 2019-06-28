"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player =
/*#__PURE__*/
function () {
  function Player(login, room) {
    _classCallCheck(this, Player);

    this.login = login;
    this.rooms = room;
  }

  _createClass(Player, [{
    key: "addRoom",
    value: function addRoom(room) {
      return this.rooms.push(room);
    }
  }, {
    key: "getRooms",
    value: function getRooms() {
      return this.rooms;
    }
  }]);

  return Player;
}();

exports["default"] = Player;