import StarRating from "react-star-ratings";

export const showAverageRatingFunction = (product) => {
    if(product && product.ratings){
        let allRatings = product.ratings
        let total = []
        let length = allRatings.length
        allRatings.map((ratting)=>total.push(ratting.star))
        let total_ratting = total.reduce((p,n)=>p+n,0)        
        let averageRatting = total_ratting/length
        return (
            <div className="text-center pb-3">
                <StarRating 
                    starDimension = "20px"
                    starSpacing = '2px'
                    rating ={averageRatting}
                    numberOfStars = {5}
                    starRatedColor = "red"
                />
                ({length})
            </div>
        )
    }
};
