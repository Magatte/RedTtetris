'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _Game = require('../../controllers/Game');

var _Game2 = _interopRequireDefault(_Game);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = new _Game2.default('Graziella', false); //const Game = require('../controllers/Game.js')


describe('test Game controllers', function () {
    it('should create Game basique info', function () {

        var testBasicInstance = instance.getGameInfo();

        (0, _chai.expect)(testBasicInstance).to.deep.equal({
            name: 'Graziella',
            master: false,
            players: [],
            pieces: [],
            spectres: [],
            status: 0
        });
    });
    describe('test set status method', function () {
        it('should set status to 1', function () {

            instance.setStatus('START_GAME');
            var testSetStatus = instance.getGameInfo();

            (0, _chai.expect)(testSetStatus).to.deep.equal({
                name: 'Graziella',
                master: false,
                players: [],
                pieces: [],
                spectres: [],
                status: 1
            });
        });
        it('should set status to 2', function () {

            instance.setStatus('paused');
            var testSetStatus = instance.getGameInfo();

            (0, _chai.expect)(testSetStatus).to.deep.equal({
                name: 'Graziella',
                master: false,
                players: [],
                pieces: [],
                spectres: [],
                status: 2
            });
        });
        it('should set status to 3', function () {

            instance.setStatus('STOP_GAME');
            var testSetStatus = instance.getGameInfo();

            (0, _chai.expect)(testSetStatus).to.deep.equal({
                name: 'Graziella',
                master: false,
                players: [],
                pieces: [],
                spectres: [],
                status: 3
            });
        });
        it('should set status to 0', function () {
            instance.setStatus('ready');
            var testSetStatus = instance.getGameInfo();
            (0, _chai.expect)(testSetStatus).to.deep.equal({
                name: 'Graziella',
                master: false,
                players: [],
                pieces: [],
                spectres: [],
                status: 0
            });
        });
    });
    describe('get player Game', function () {
        it('should return player name', function () {
            var playerName = instance.getName();
            (0, _chai.expect)(playerName).to.equal('Graziella');
        });
    });
});