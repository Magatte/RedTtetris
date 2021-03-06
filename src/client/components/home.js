import React from "react"
import { connect } from 'react-redux';
import lifecycle from "react-pure-lifecycle";
import {bindActionCreators} from "redux";
import history from "../history";
import {getGamesList, sendLoginRoom, STOP_GAME} from "../redux/actions";

const methods = {
    componentDidMount(props){
        props.getGamesList()
    }
};

const Form = (props) => {

    const onSubmit = (event) => {
        event.preventDefault();
        if (event.target[0].value && event.target[1].value) {
            const url = '/' + event.target[1].value + '[' + event.target[0].value + ']';
            props.sendLoginRoom(event.target[0].value, event.target[1].value);
            history.push(url);
        }
    }

    return (
        <div>
            Put a login and a room name to start a new tetris game
            <fieldset>
                <form onSubmit={onSubmit}>
                    <legend>Information joueur</legend>
                    <label>Login
                        <input
                            name='login'
                            type='text'
                        />
                    </label>
                    <br/>
                    <label>Room
                        <input
                            name='room'
                            type='text'
                        />
                    </label>
                    <br/>
                    <input
                        type='submit'
                    />
                </form>
            </fieldset>
        </div>
    );
}

const Games = (props) =>{

    const list = props.gamesList.map((game, key)=>{

        return <ul key={key}>{game.name} <span>{game.status === 0 ? 'EN ATTENTE': 'EN COURS'}</span></ul>
    })

    return(
        <div>
            <h1>Available rooms list</h1>
            Choose the room you want to join
            <li>{list}</li>
        </div>
    );
}

const Home =(props)=> {
    return(
        <div style={{   display: "flex",
            flexDirection: "row"}}>
            <Form sendLoginRoom={props.sendLoginRoom}/>
            <Games gamesList={props.gamesList}/>
        </div>
    )
}

const mapStateToProps = state => {

    return {
        gameStatus: state.gameStatus,
        emptyGrid: state.activeTetriminos,
        currentTetriminos: state.currentTetriminos,
        currentColor: state.currentTetriminos.color,
        nextTetriminos: state.nextTetriminos,
        gamesList: state.games.rooms
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendLoginRoom: bindActionCreators(sendLoginRoom, dispatch),
        getGamesList:bindActionCreators(getGamesList, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(methods)(Home));
