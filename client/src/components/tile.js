import './../App.css';


function Tile({data}) {
    return (
        <div className={"tile-container"}>
            <div className={"tile-img"}></div>
            <div className={"tile-body"}>
                <h2 className={"tile-title"}>{data.name}</h2>
                <div className={"tile-text"}>
                    <span> <i/> {data.location}</span>
                    <span> <i/> {data.avg_price}</span>
                </div>
            </div>
        </div>
    );
}

export default Tile;
