import React from 'react';
//import BarChartRace from "../../components/Leaderboard/BarChartRace";
import loadable from '@loadable/component'

const BarChartRace1 = loadable(() => import('../../components/Leaderboard/LeaderBoard'))

    // browser code
    const leaderboard = () => {
            
        return(
           <>
                <div className="lb-box-container">
                    <BarChartRace1/>
                </div>
                
           </>
         )
    }



export default leaderboard






