import React from "react"
import {Card,Skeleton} from 'antd'

const LoadingCard = ({count}) =>{
    const cards = ()=>{
        let totalCards = []
        for (let i = 0 ;i<count;i++ ){
            totalCards.push(
                <Card className="col-md-3" key={i}>
                    <Skeleton active></Skeleton>
                </Card>
            )
        }
        return totalCards
    }
    return <div className="row">{cards()}</div>
}

export default LoadingCard;