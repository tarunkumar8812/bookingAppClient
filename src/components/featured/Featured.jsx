import React from 'react'
import useFetch from '../../hooks/useFetch'
import './featured.css'


const Featured = () => {


    // this is for fetching number of hotels and it's images in every city

    const { data, loading } = useFetch("http://localhost:5000/api/hotels/ab/countByCity")

    // console.log("data");
    // console.log(data);



    // cities images to show dynamically

    const cityImg = {
        mumbai: "https://s3.india.com/travel/wp-content/uploads/2014/09/Taj-Mahal-Palace-625x470.jpg",
        gurugram: "https://yometro.com/images/places/gurgaon.jpg",
        ayodhya: "https://images.news18.com/ibnlive/uploads/2020/12/1607490182_untitled-design-24.png?im=FitAndFill,width=1200,height=1200",
        Thane: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq4JrTH8tn40cblZ5uOWu-7hPEVLzKIvkesvjZI_2zp7cU-2jwzLAgMHayorYhkglKnpI&usqp=CAU",
        noida: "https://static.squareyards.com/resources/images/noida/tn-projectflagship/tn-bhutani-cyber-central-project-flagship1.jpg",
        goa: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/10/18/16/goa-overview.jpg?width=1200",
        delhi: "https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/India-Gate-Delhi.jpg"

    }

    return (
        <div className='featured'>
            {loading ? "loaging please wait" : <>{data.map(item => {
                return (<>
                    <div className='featutredItem'>
                        <img className='featuredImg' src={cityImg[item?._id]} alt='img'></img>
                        <div className='featuredTitles'>
                            <h1>{item?._id}</h1>
                            <h2>{item?.count} Properties </h2>
                        </div>
                    </div>
                </>
                )
            })}
            </>}
        </div>
    )
}

export default Featured