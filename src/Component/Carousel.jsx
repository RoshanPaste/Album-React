import React, { useState } from "react";
import Radium from "radium";

export default Radium(function Carousel({ album }) {

    const style = {
        carousel: {
            "margin": "20px 5px",
            "borderRadius": "0.5rem",
            "minWidth": "300px",
            "boxShadow": "0 0 10px 2.5px gray",
            "transition": "all 0.25s ease-in-out",
            ':hover': {
                "boxShadow": "0 0 20px 5px #0d0d0d58",
                "transform": "scale(1.01)"
            }
        },

        H5: {
            "textDecoration": "line-through",
        },

        P: {
            "textDecoration": "line-through",
        }
    }

    const [albumData, setAlbumData] = useState(album);
    const [deleteAlbum, setDeleteAlbum] = useState([]);
    const [albumBody, setAlbumBody] = useState("");

    async function onDeleteHandler(deleteId) {
        console.log(deleteId);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/1${deleteId}`, {
            method: 'DELETE',
        });
        const responseJSON = await response.json();
        if (responseJSON) {
            console.log("Dummy Deleted ");
            console.log(responseJSON);
            const tempArray = [...deleteAlbum, deleteId]
            setDeleteAlbum(tempArray);
        }
    }

    async function onSubmitHandler(event) {
        event.preventDefault();
        const albumId = event.target[0].value;
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${albumId}`, {
            method: 'PUT',
            body: JSON.stringify({
                body: albumBody,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const responseJSON = await response.json();
        console.log(responseJSON);
        const modifiedData = albumData.map(element => {
            if (element.id === responseJSON.id) {
                return ({ ...element, title: albumBody })
            }
            else {
                return element;
            }
        });
        setAlbumData(modifiedData);
        setAlbumBody('')
    }

    return (
        <React.Fragment>
            <div
                id={`carouselExampleDark_${albumData[0].userId}`}
                className="carousel carousel-dark slide w-25"
                data-bs-ride="carousel"
                style={style.carousel}
            >


                <div className="carousel-inner" style={{ "borderRadius": "0.75rem" }}>
                    {
                        albumData.map((item) => {
                            return (
                                <React.Fragment>
                                    {
                                        (
                                            (item.id === 1) || (item.id === 11) || (item.id === 21) || (item.id === 31) || (item.id === 41) ||
                                            (item.id === 51) || (item.id === 61) || (item.id === 71) || (item.id === 81) || (item.id === 91)
                                        ) ?
                                            <div key={item.id} className="carousel-item active" data-bs-interval="5000" >
                                                <img style={{backgroundSize: "contain"}} height={"350px"} width={"500px"} src="https://i.pinimg.com/564x/0c/5e/0e/0c5e0e1c28bdff7e0f1be89328b80a51.jpg" alt="..." />

                                                <div className="carousel-caption d-md-block" style={{ "backgroundColor": "rgba(240,248,255,0.9)", "borderRadius": "0.5rem", "padding": "10px" }}>
                                                    <h5 className="display-6">Album {item.userId}</h5>

                                                    {
                                                        deleteAlbum.includes(item.id) &&
                                                        <React.Fragment>
                                                            <h5 style={style.H5}>Title {item.id}</h5>
                                                            <p style={style.P}>{item.title}</p>
                                                        </React.Fragment>
                                                    }
                                                    {
                                                        !deleteAlbum.includes(item.id) &&
                                                        <React.Fragment>
                                                            <h5>Title {item.id}</h5>
                                                            <p>{item.title}</p>
                                                        </React.Fragment>
                                                    }

                                                    <div className="d-flex flex-row justify-content-evenly w-100 py-3" style={{ "position": "relative" }}>
                                                        <button onClick={() => { onDeleteHandler(item.id) }} type="button" className="btn btn-outline-danger"><i className="fa-solid fa-trash"></i></button>
                                                        <button type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample_${item.id}`} className="btn btn-outline-dark"><i className="fa-solid fa-music"></i> &nbsp;Modify</button>

                                                        <div className="collapse" id={`collapseExample_${item.id}`} style={{ "position": "absolute", "top": "-175%", "zIndex": "5" }}>
                                                            <div className="card card-body" style={{ "width": "100%" }}>
                                                                <form onSubmit={onSubmitHandler}>
                                                                    <input type="text" value={item.id} hidden />
                                                                    <div className="mb-3">
                                                                        <label htmlFor="formGroupExampleInput3" className="form-label">Enter Body</label>
                                                                        <input onChange={(e) => { setAlbumBody(e.target.value) }} type="text" className="form-control" id="formGroupExampleInput3" value={albumBody} placeholder="Enter Body" required></input>
                                                                    </div>
                                                                    <div className="modal-footer d-flex flex-row justify-content-evenly ">
                                                                        <button type="submit" data-bs-toggle="collapse" data-bs-target={`#collapseExample_${item.id}`} className="btn btn-success" data-bs-dismiss="modal"><i className="fa-solid fa-square-check"></i></button>
                                                                        <button type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample_${item.id}`} className="btn btn-danger" data-bs-dismiss="modal"><i className="fa-solid fa-rectangle-xmark"></i></button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div key={item.id} className="carousel-item" data-bs-interval="5000">

                                                {(item.id > 1 && item.id < 11) && < img height={"350px"} width={"500px"} src="https://th.bing.com/th/id/OIP.kig9cukVC7I_GTI47D-vZwHaFL?pid=ImgDet&rs=1" alt="..." />}
                                                {(item.id > 11 && item.id < 21) && < img height={"350px"} width={"500px"} src="https://static.vecteezy.com/system/resources/previews/000/201/504/large_2x/vector-beautiful-sunset-landscape-background.jpg" alt="..." />}
                                                {(item.id > 21 && item.id < 31) && < img height={"350px"} width={"500px"} src="https://static.vecteezy.com/system/resources/previews/000/203/124/non_2x/vector-abstract-landscape-illustration.jpg" alt="..." />}
                                                {(item.id > 31 && item.id < 41) && < img height={"350px"} width={"500px"} src="https://th.bing.com/th/id/R.964b94b2822a8d1d7a1feaea04eac6eb?rik=Zt1WlJP5QdKjzg&riu=http%3a%2f%2fwallpaperswide.com%2fdownload%2flow_poly_river_landscape_design-wallpaper-800x480.jpg&ehk=A2lg53GkgOKLlq0JQuc1wvTr8hzXA6jejyy9hakzmAY%3d&risl=&pid=ImgRaw&r=0" alt="..." />}
                                                {(item.id > 41 && item.id < 51) && < img height={"350px"} width={"500px"} src="https://i.pinimg.com/736x/4b/51/72/4b51729ce74a66c53e1be23511b1a46b.jpg" alt="..." />}
                                                {(item.id > 51 && item.id < 61) && < img height={"350px"} width={"500px"} src="https://th.bing.com/th/id/OIP.IVIFxarH16OZS9CsUdC_MAHaE7?pid=ImgDet&w=626&h=417&rs=1" alt="..." />}
                                                {(item.id > 61 && item.id < 71) && < img height={"350px"} width={"500px"} src="https://static.vecteezy.com/system/resources/previews/000/226/163/non_2x/night-time-beach-vector.jpg" alt="..." />}
                                                {(item.id > 71 && item.id < 81) && < img height={"350px"} width={"500px"} src="https://image.freepik.com/free-vector/tropical-palm-trees-birds-sunset_24640-65918.jpg" alt="..." />}
                                                {(item.id > 81 && item.id < 91) && < img height={"350px"} width={"500px"} src="https://static.vecteezy.com/system/resources/previews/000/517/088/original/vector-landscape-illustration.png" alt="..." />}
                                                {(item.id > 91 && item.id < 101) && < img height={"350px"} width={"500px"} src="https://cdn.dribbble.com/users/876373/screenshots/2595382/attachments/516955/summer_sunset.jpg?compress=1&resize=600x450" alt="..." />}

                                                <div className="carousel-caption d-md-block" style={{ "backgroundColor": "rgba(240,248,255,0.9)", "borderRadius": "0.5rem", "padding": "10px" }}>
                                                    <h5 className="display-6">Album {item.userId}</h5>

                                                    {
                                                        deleteAlbum.includes(item.id) &&
                                                        <React.Fragment>
                                                            <h5 style={style.H5}>Title {item.id}</h5>
                                                            <p style={style.P}>{item.title}</p>
                                                        </React.Fragment>
                                                    }
                                                    {
                                                        !deleteAlbum.includes(item.id) &&
                                                        <React.Fragment>
                                                            <h5>Title {item.id}</h5>
                                                            <p>{item.title}</p>
                                                        </React.Fragment>
                                                    }

                                                    <div className="d-flex flex-row justify-content-evenly w-100 py-3" style={{ "position": "relative" }}>
                                                        <button onClick={() => { onDeleteHandler(item.id) }} type="button" className="btn btn-outline-danger"><i className="fa-solid fa-trash"></i></button>
                                                        <button type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample_${item.id}`} className="btn btn-outline-dark"><i className="fa-solid fa-music"></i>&nbsp;Modify</button>

                                                        <div className="collapse" id={`collapseExample_${item.id}`} style={{ "position": "absolute", "top": "-175%", "zIndex": "5" }}>
                                                            <div className="card card-body" style={{ "width": "100%" }}>
                                                                <form onSubmit={onSubmitHandler}>
                                                                    <input type="text" value={item.id} hidden />
                                                                    <div className="mb-3">
                                                                        <label htmlFor="formGroupExampleInput3" className="form-label">Enter Body</label>
                                                                        <input onChange={(e) => { setAlbumBody(e.target.value) }} type="text" className="form-control" id="formGroupExampleInput3" value={albumBody} placeholder="Enter Body" required></input>
                                                                    </div>
                                                                    <div className="modal-footer d-flex flex-row justify-content-evenly ">
                                                                        <button type="submit" data-bs-toggle="collapse" data-bs-target={`#collapseExample_${item.id}`} className="btn btn-success" data-bs-dismiss="modal"><i className="fa-solid fa-square-check"></i></button>
                                                                        <button type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample_${item.id}`} className="btn btn-danger" data-bs-dismiss="modal"><i className="fa-solid fa-rectangle-xmark"></i></button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                    }
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>


        </React.Fragment>
    )
})