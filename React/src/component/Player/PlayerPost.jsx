function PlayerPost(postdata){
    console.log(postdata)
    console.log(postdata.postdata.OfferId)

    return(
        <div className="Box">
            <img id="img" src={postdata.postdata.OfferImage} alt="img" width={"50"} height={"50"}></img>
            <br></br>
            <h2>{postdata.postdata.OfferTitle}</h2>
            <br></br>
            <h3>{postdata.postdata.OfferId}</h3>
            <br></br>
            <p>{postdata.postdata.OfferDescription}</p>
            <p>Offer-sort:{postdata.postdata.OfferSort}</p>
            <p>Content:{postdata.postdata.Content}</p>
            <h4>Schedule</h4>
            <p>Days of Week: {postdata.postdata.Schedule.DaysOfWeek}</p>
            <p>Days of Month: {postdata.postdata.Schedule.DaysOfMonth}</p>
            <p>Days of Year: {postdata.postdata.Schedule.DaysOfYear}</p>
            <h4>Pricing</h4>
            <p>{postdata.postdata.pricing.map((value,index)=>{
               return(
                
                    <p key={index}>Currency: Coins, Coins:{value.coins}</p>
               
               ) 
            })}</p>
            <h4>Target</h4>
            <p>Age:{postdata.postdata.target.age}</p>
            <p>Installed Days:{postdata.postdata.target.installedDays}</p>
            </div>
    )
        }
    
export default PlayerPost;