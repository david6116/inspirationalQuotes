console.log('hello')


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
                console.log(response);

                this.setState({
                    posts:response.data
                })
                console.log(this.state.posts)
            }
        )
    }

    changeNewPostImage = (event) => {
        this.setState({
            newPostImage:event.target.value
        })
        console.log(this)
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

    render = () => {
        return <div>
        <h2>Create a quote</h2>
        <form onSubmit={this.createPost}>
            <input onKeyUp={this.changeNewPostName} type="text" placeholder="name" /><br/>
            <input onKeyUp={this.changeNewPostPost} type="text" placeholder="text.." /><br/>
            <input onKeyUp={this.changeNewPostImage} type="url" placeholder="http://" /><br/>
            <input type="submit" value="Create post" />
            </form>
            <h2> Quotes: </h2>
        <ul>
        {
            this.state.posts.map(
                (person) => {
                    return <div class="post">
                        <div class="post_header">
                        <img src={person.image} />
                    <h3>{person.name}</h3>
                    </div>
                    <p>{person.body}</p>
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