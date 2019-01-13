"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(name, master) {
        _classCallCheck(this, Game);

        this.name = name;
        this.master = master;
        this.players = [];
        this.pieces = [];
        this.status = 0;
    }

    _createClass(Game, [{
        key: "setStatus",
        value: function setStatus(status) {
            switch (status) {
                case "ready":
                    this.status = 0;
                    break;
                case "START_GAME":
                    this.status = 1;
                    break;
                case "paused":
                    this.status = 2;
                    break;
                case "finish":
                    this.status = 3;
                    break;
                default:
                    break;

            }
        }
    }, {
        key: "addPlayer",
        value: function addPlayer(player) {
            this.players.push(player);
            return this.players;
        }
    }, {
        key: "setTetriminos",
        value: function setTetriminos() {
            this.tetriminos.push();
        }
    }, {
        key: "getName",
        value: function getName() {
            return this.name;
        }
    }, {
        key: "createNewPieces",
        value: function createNewPieces(nb) {
            this.pieces = this.pieces.splice(0, 0);
            for (var i = 0; i < nb; i++) {
                this.pieces.push(Math.floor(Math.random() * (7 - 0)) + 0);
            }
        }
    }, {
        key: "getPiece",
        value: function getPiece() {
            return this.pieces;
        }
    }, {
        key: "addNewPiece",
        value: function addNewPiece(piece) {
            this.pieces.push(piece);
        }
    }, {
        key: "removePiece",
        value: function removePiece(index) {
            var nb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            this.pieces.slice(index, nb);
        }
    }, {
        key: "getGameInfo",
        value: function getGameInfo() {
            return {
                name: this.name,
                master: this.master,
                players: this.players,
                pieces: this.pieces
            };
        }
    }]);

    return Game;
}();

exports.default = Game;