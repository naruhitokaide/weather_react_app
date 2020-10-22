import React from 'react'
import "./Search.css"


function Search({value, data, change, submit}) {
    return (
        <>
            <form className="search__container" onSubmit={submit}>
                <input type="text" value={value} onChange={change} placeholder="e.g. London,England" className="search__input" />
            </form>
        </>
    )
}

export default Search
