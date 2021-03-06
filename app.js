class App extends React.Component {
    state = {
        posts:[]
    }

    componentDidMount = () => {
        axios.get('/posts').then(
            (response) => {
                this.setState({
                    posts:response.data
                })
            }
        )
    }

    createPost = (event) => {
        event.preventDefault()
        console.log(this.state)
        axios.post(
            '/posts',
            {
                name:this.state.newPostName,
                image:this.state.newPostImage,
                body:this.state.newPostPost,
            }
        ).then(
            (response) => {
                this.setState({
                    posts:response.data
                })
            }
        )
    }
    deletePost = (event) => {
        axios.delete('/posts/' + event.target.value).then(
            (response) => {
                this.setState(
                    {
                        posts:response.data
                    }
                )
            }
        )
    }

    changeNewPostImage = (event) => {
        this.setState({
            newPostImage:event.target.value
        })
    }

    changeNewPostName = (event) => {
        this.setState({
            newPostName:event.target.value
        })
    }

    changeNewPostPost = (event) => {
        this.setState({
            newPostPost:event.target.value
        })
    }

    changeUpdatePostName = (event) => {
        this.setState({
            updatePostName:event.target.value
        })
    }

    changeUpdatePostBody = (event) => {
        this.setState({
            updatePostBody:event.target.value
        })
    }
    changeUpdatePostImage = (event) => {
        this.setState({
            updatePostImage:event.target.value
        })
    }


    updateQuote = (event) => {
        console.log(this.state.updatePostName)
        console.log(event)
        event.preventDefault();
        const id = event.target.getAttribute('id');
        axios.put(
            '/posts/' + id,
            {
                name: this.state.updatePostName,
                body: this.state.updatePostBody,
                image: this.state.updatePostImage,
            }
        )
            .then((response) => {
                this.setState({
                    posts:response.data
                })
            })
    }

    render = () => {
        return <div>
            <div className="header mt-4">
          <img src='https://i.postimg.cc/50FtCWhS/photo-of-daisy-flowers-1477166.jpg' className="img-fluid mt-4 headimg" alt="Responsive image"/>
        </div>
        <h1 className="mt-5">Inspirational Quote Generator</h1>
        <div className="card mt-4">
            <h2 className= "ml-4 mr-4 mt-4 mb-4" >Create a quote</h2>
            <form onSubmit={this.createPost}>
            <div className="form-group ml-4 mr-4">
                <input className="form-control" onKeyUp={this.changeNewPostName} type="text" placeholder="name" /><br/>
                <input className="form-control" onKeyUp={this.changeNewPostPost} type="text" placeholder="text.." /><br/>
                <input className="form-control" onKeyUp={this.changeNewPostImage} type="url" placeholder="http://" /><br/>
                <input type="submit" value="Create post" />
            </div>
            </form>
        </div>
        <h1 className="mt-4"> Quotes: </h1>
        <ul>
        {
            this.state.posts.map(
                (person) => {
                    return <div className="col mb-4 ">
                        <div className="card text-white bg-dark text-center h-100">
                            <img className="card-img-top h-50" src={person.image} />
                            <div className="card-body">
                                <h5 className="card-title">{person.name}</h5>
                                <p className="card-text">{person.body}</p>
                                <form id={person.id} onSubmit={this.updateQuote}>
                                    <input onKeyUp={this.changeUpdatePostName} type="text" placeholder="title"/><br/>
                                    <input onKeyUp={this.changeUpdatePostBody} type="text" placeholder="body"/><br/>
                                    <input onKeyUp={this.changeUpdatePostImage} type="text" placeholder={person.image}/><br/>
                                    <input className="btn btn-primary mb-4 mt-5 bg-info" type="submit" value="Update Quote"/>
                                    <button value={person.id} onClick={this.deletePost} className="btn btn-primary mb-4 mt-5 bg-info">
                                        DELETE
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            )
        }
        </ul>
        </div>
    }
}

ReactDOM.render(
<App></App>,
document.getElementById('main-body')
)
