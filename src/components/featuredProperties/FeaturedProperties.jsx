import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {

    const { data, loading } = useFetch("http://localhost:5000/api/hotels?featured=true&limit=10&min=1&max=999")
    // console.log("this is from featuredProperties");
    // console.log(data);

    return (
        <div className="fp">
            {loading ? "loading" :
                <>{data.map((item, index) => {
                    return <>
                        <div className="fpItem" key={index} id={item._id}>
                            <img
                                // src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
                                src={item?.photos[index] || "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"}
                                alt="HotelIMG"
                                className="fpImg"
                            />
                            <span className="fpName">{item?.name}</span>
                            <span className="fpCity">{item?.city}</span>
                            <span className="fpPrice">Starting from ${item?.cheapestPrice}</span>
                            {!item.rating && <div className="fpRating">
                                <button>{item?.rating || "rating"}</button>
                                <span>Excellent</span>
                            </div>
                            }
                        </div>
                    </>
                })}
                </>
            }

        </div>
    );
};

export default FeaturedProperties;