import React from 'react';


const DisplaySpectre = (props) => {
    if (props.spectres.length === -1)
        return null

    const displayAllSpectres = props.spectres.map((data, key) => {
        return (
            <div key={key} style={{ marginLeft: 'auto', marginRight: 'auto', width: '100px', marginTop: '5%' }}>
                {data.name}<br />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start', height: '120px', width: '100px', border: '1px solid red' }}>
                    {data.spectre.map((col, key) => {
                        const height = (col / 20) * 100
                        return (
                            <div key={key} style={{ backgroundColor: 'red', width: '10px', height: height + '%' }}></div>
                        )
                    })
                    }
                </div>
            </div>
        )
    });

    return (
        <div>
            {displayAllSpectres}
        </div>
    );
}

const Spectres = (props) => {
    return (
        <div className='start'>
            {
                props.gameData && props.gameData.spectres
                && <DisplaySpectre
                    spectres={props.gameData.spectres}
                    userName={props.user.name}
                />
            }
        </div>
    );
}

export default Spectres;