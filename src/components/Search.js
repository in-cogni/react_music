import React from "react";
import './Search.css';

class Search extends React.Component {
    state=
    {
        search: "",
        type: "all",
        page: 1
    }
    prevPage = () => {
        this.setState
        (
            ()=>(this.state.page >1 ? {page: this.state.page - 1} : {page: 1}),
            () => {this.props.searchMusic(this.state.search, this.state.type, this.state.page)}
        )
    }
    nextPage = () => {
        this.setState
        (
            () => ({page: this.state.page + 1}),
            () => {this.props.searchMusic(this.state.search, this.state.type, this.state.page)}
        )
    }
    handleKey = (event) => {
        if(event.key === 'Enter') this.props.searchMusic(this.state.search, this.state.type);
    }
    tileSort = () => {
        if(this.props.onDisplayChange)
        {
            this.props.onDisplayChange('tile');
        }
    }
    listSort = () => {
        if(this.props.onDisplayChange)
        {
            this.props.onDisplayChange('list');
        }
    }
    setPage = (num) =>
    {
        this.setState 
        (
            () => ({page: num}),
            () => {this.props.searchMusic(this.state.search, this.state.type, this.state.page);}
        );
    }
    render() {
        let limit=10;
        let totalPages = Math.ceil(this.props.totalCount / limit);
        const lastIndex = totalPages <=10 ? totalPages + 1:
        this.state.page + limit;
        const firstIndex = totalPages <= 10 ? lastIndex - limit + lastIndex + 1 : lastIndex - limit;

        let num = [];
        for(let i=0; i<totalPages + 1; i++) num.push(i);

        return (
            <>
                <div className='search'>
                    <input 
                    type="search"
                    placeholder='Введите трек' 
                    value={this.state.search}
                    onChange={(e) => this.setState({search:e.target.value})}
                    onKeyDown={this.handleKey}
                    />
                    <button className='btn' onClick={() => this.props.searchMusic(this.state.search, this.state.type)}>
                        Поиск
                    </button>
                </div>
                <div className='navigation'>
                    <button className='btn' onClick={this.prevPage}>Previos</button>
                    <div>
                        {
                            num.slice(firstIndex, lastIndex).map(
                                (el, index) =>
                                (
                                    <button className='btn' key={index} onClick={()=>(this.setPage(el))} style={{background: this.state.page !== el ? "grey" : ""}}>
                                        {el}
                                    </button>
                                )
                            )
                        }
                    </div>
                    <button className='btn' onClick={this.nextPage}>Next</button>
                </div>
                <div className="sort">
                    <button onClick={this.listSort} className='listile'>Список</button>
                    <button onClick={this.tileSort} className='listile'>Плитка</button>
                </div>
            </>
        )
    }
}
export default Search;