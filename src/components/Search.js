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
    console.log("\n------------------------------------\n")
    let limit = 10; // Должно совпадать с limit в Main.js (20)
    let totalPages = Math.ceil(this.props.totalCount / limit);
    
    const lastIndex = Math.min(totalPages, this.state.page + 4);
    const firstIndex = Math.max(1, lastIndex - 9);
    
    console.log(`limit: ${limit}`);
    console.log(`totalPages: ${totalPages}`);
    console.log(`totalCount: ${this.props.totalCount}`);
    console.log(`lastIndex: ${lastIndex}`);
    console.log(`firstIndex: ${firstIndex}`);

    let num = [];
    for (let i = firstIndex; i <= lastIndex; i++) num.push(i);
    console.log(num);

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
                <button className='btn' onClick={() => {
                    this.setState({ page: 1 });
                    this.props.searchMusic(this.state.search, this.state.type, 1);
                }}>
                    Поиск
                </button>
            </div>
            
            {totalPages > 0 && (
                <div className='navigation'>
                    <button className='btn' onClick={this.prevPage}>Previous</button>
                    <div>
                        {num.map((el, index) => (
                            <button className='btn' key={index} onClick={()=>(this.setPage(el))} 
                                style={{background: this.state.page !== el ? "grey" : ""}}>
                                {el}
                            </button>
                        ))}
                    </div>
                    <button className='btn' onClick={this.nextPage}>Next</button>
                </div>
            )}
            
            <div className="sort">
                <button onClick={this.listSort} className='listile'>Список</button>
                <button onClick={this.tileSort} className='listile'>Плитка</button>
            </div>
        </>
    )
}
}
export default Search;