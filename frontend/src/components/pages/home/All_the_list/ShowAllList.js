import React from 'react';
import UserHome from '../User_Home/User_Home.js';
/**
 *
 */
export default function ShowAll(params){

    const data = [
        { BoardsName: 'Cooking' ,Comment:"Δεν μαγειρεύω καλά",rating:4 },
        { BoardsName: 'Pc' ,Comment:"Θέλω να φτιάξω PC",rating:4.5 },
        { BoardsName: 'Rock Songs' ,Comment:"Ωραίες plalist για rock",rating:1 },
        { BoardsName: 'Java basic' ,Comment:"Για να μάθω java",rating:4 },
        { BoardsName: 'Cooking' ,Comment:"Δεν μαγειρεύω καλά",rating:4 },
        { BoardsName: 'Pc' ,Comment:"Θέλω να φτιάξω PC",rating:4.5 },
        { BoardsName: 'Rock Songs' ,Comment:"Ωραίες plalist για rock",rating:1 },
        { BoardsName: 'Java basic' ,Comment:"Για να μάθω java",rating:4 },
    ];

    return (
        <div className="text-whit">
            <UserHome boards={data} private={params.location.state.private} ></UserHome>
        </div>
        
    );
    
};
