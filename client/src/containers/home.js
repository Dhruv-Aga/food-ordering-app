import './../App.css';
import {useEffect, useState} from "react";
import Tile from "../components/tile";
import AxiosInstanceCreator from "../utils/http";

const getSearchResult = (search) => {
    const params = {}
    if (search) {
        params.search = search
    }

    return AxiosInstanceCreator().get("/restaurants/", {
        params: params
    })
}

const getData = (filters, sort) => {
    const params = {}
    if (filters) {
        params.filters = filters
    }
    if (sort) {
        params.sort = sort
    }

    return AxiosInstanceCreator().get("/restaurants/", {
        params: params
    })
}
const sortList = {name: "Name", avg_price: "Price"}

function Home() {
    const [data, changeData] = useState({
        search: null,
        filter: {},
        sort: null,
    })
    const [dataList, changeDataList] = useState([])
    const [searchResult, changeSearchResult] = useState([])

    const handleChange = (event) => {
        changeData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    useEffect(async () => {
        const newDataList = await getData(data.filter, data.sort);
        if (newDataList.status === 200)
            changeDataList([...newDataList.data])
    }, [data.filter, data.sort])

    useEffect(async () => {
        if (data.search && data.search.length >= 3) {
            const newDataList = await getSearchResult(data.search);
            if (newDataList.status === 200)
                changeSearchResult([...newDataList.data])
        }
    }, [data.search])

    return (
        <div className={"container"}>
            <div className={"toolbar"}>
                <div>
                    <div className={"form-field"}>
                        <input id="search" name="search" list="search-result" type="text" onChange={handleChange}/>
                        <datalist id="search-result">
                            {searchResult.map((ele, index) => <option key={ele.name + index} value={ele.name}/>)}
                        </datalist>
                        <button id="search-btn" name="search" type="text" onClick={() => {
                            changeDataList([...searchResult])
                        }}>Search
                        </button>

                    </div>
                </div>
                <div>
                    <button id="filter" onClick={() => {
                    }}>Filter
                    </button>
                    <select id="sort" name="sort" onChange={handleChange}>
                        {Object.keys(sortList).map((key) => <option key={key} value={key}>{sortList[key]}</option>)}
                    </select>
                </div>
            </div>
            <div className={"list-container"}>
                {dataList.map((ele, index) =>
                    <Tile key={ele.name + index} data={ele}/>
                )}
            </div>
        </div>
    );
}

export default Home;
