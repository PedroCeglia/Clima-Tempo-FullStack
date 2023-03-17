import './style.css'

export default function ForecastWithout(){
    return(
        <section className="without-forecasts-container">
            <h1>Getting Started</h1>
            <div className="infos">
                <article>
                    <h3>How do you search a place?</h3>
                    <p>
                        In this app, the user can search the weather forecast by the place name!
                    </p>                    
                    <img src="images/image-search-view.png" alt="Image Serch View"/>       
                </article>
                <article>
                    <h3>How do we search the places choosed by user?</h3>
                    <p>
                        You can choose anywhere in the Wolrd!
                        We use the Google Place API to help you find the right place.  
                    </p>                   
                    <img src="images/image-google-place-api.png" alt="Image Serch View"/>       
                </article>
                <article>
                    <h3>Current Weather Forecast</h3>
                    <p>
                        In this app, the user can get the All Day Weather Forecast.
                        you will get the forecast of all hours in the day,
                    </p>                           
                    <img src="images/image-forecast-weather.png" alt="Image Serch View"/>       
                </article>

            </div>
        </section>
    )
}