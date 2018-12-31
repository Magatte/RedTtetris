import React from 'react';
import  gameConstants  from '../redux/constants/gameConstants'
const { tetriminos, shapeTypes } = gameConstants;

const PreviewNextTetriminos = (props) =>{

    if(props.piecesStock === undefined) return null

    return(
        <div>
            {
                props.piecesStock.map(( tetriNumber, index ) =>{
                    if(index < 3){

                        return <p key={index}>{ shapeTypes[tetriNumber] }</p>
                    }
                    return null
                })
            }
        </div>
    )
}

const DisplaySpectre = (props) =>{
    if(props.spectres.length === -1)
        return null

    const displaySpectres = props.spectres.map((data, key) =>{
        return(
            <div key={key} style={{ marginLeft:'40%', marginTop:'5%'}}>
                {data.name}<br/>
                <div style={{display:'flex', flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-start', height:'100px', width:'100px', border:'1px solid red'}}>
                    {data.spectre.map((col, key) =>{
                        const height = (col/20) * 100
                        return(
                            <div key={key} style={{backgroundColor:'red', width:'10px', height: height +'%'}}></div>
                        )
                    })
                    }
                </div>
            </div>
        )
    })
    return(
        <div>
            {displaySpectres}
        </div>
    )
}
const Menu = (props) => {

    return (
        <div className='start'>
            {props.user.status === 'master'
                ?     <button
                    onClick={() => props.loadGame(props.user.room, props.piecesStock)}
                >
                    START
                </button>
                :null}

            <button
                onClick={() => props.pauseGame()}
            >
                {props.pauseTitle}
            </button>
            <button onClick={props.goToHome}>HOME</button>

            {
                props.gameStatus === 'PLAYING'
                ?   <PreviewNextTetriminos
                        piecesStock={props.user.piecesStock}
                    />
                : null
            }
            {
                props.gameData && props.gameData.spectres
                    ?   <DisplaySpectre
                            spectres={props.gameData.spectres}
                            userName={props.user.name}
                        />
                    : null
            }




        </div>
    );
}

export default Menu;
