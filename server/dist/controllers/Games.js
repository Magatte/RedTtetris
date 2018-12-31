"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Games = function () {
    function Games() {
        _classCallCheck(this, Games);

        this.list = [];
    }

    _createClass(Games, [{
        key: "getAllDataList",
        value: function getAllDataList() {
            return this.list;
        }
    }, {
        key: "getGameData",
        value: function getGameData(name) {
            return this.list.find(function (game) {
                return game.getName() === name;
            });
        }
    }, {
        key: "getNameList",
        value: function getNameList() {
            return this.list.map(function (game) {
                return {
                    name: game.getName(),
                    piecesStock: game.getPiece()
                };
            });
        }
    }, {
        key: "addGame",
        value: function addGame(name) {
            this.list.push(name);
        }
    }, {
        key: "removeGame",
        value: function removeGame(name) {
            var index = this.list.findIndex(function (game) {
                return game.getName() === name;
            });
            this.list.slice(index, 1);
        }
    }]);

    return Games;
}();

exports.default = Games;